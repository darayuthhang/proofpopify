import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature');

  let event;
  const webhookSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error(`⚠️ Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  //cancel --> new checkout ===> new sub id
  // cancel -> renew through billing portal same id
  const session = event.data.object;
  console.log(`✅ Webhook received: ${event.type}`);

  try {
    switch (event.type) {
      /**
       * Fired when a user completes checkout.
       * Creates/updates the subscription record in our database.
       */
      case 'checkout.session.completed': {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );


        await prisma.user.update({
          where: {
            stripeCustomerId: session.customer,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            isAccess: true,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
        console.log(`✅ Subscription saved for customer ${session.customer}`);
        break;
      }

      /**
       * Fired when a subscription is updated (e.g., user switches plan in Billing Portal).
       * Only writes to DB if the price actually changed — avoids unnecessary writes
       * from cancel/uncancel toggling which also fires this event.
       */
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const previousAttributes = event.data.previous_attributes;

        // Only update DB if the plan/price actually changed
        if (previousAttributes?.items) {
          try {
            const updateData = {
              stripePriceId: subscription.items.data[0].price.id,
            };

            // Only update period end if it exists
            if (subscription.current_period_end) {
              updateData.stripeCurrentPeriodEnd = new Date(
                subscription.current_period_end * 1000
              );
            }

            await prisma.user.update({
              where: {
                stripeSubscriptionId: subscription.id,
              },
              data: updateData,
            });
            console.log(`✅ Plan switched for subscription ${subscription.id}`);
          } catch (error) {
            console.error(`❌ Failed to update plan for ${subscription.id}:`, error);
          }
        }
        break;
      }

      /**
       * @DO_NOT_DELETE - IMPORTANT INFO
       *
       * When a user cancels their subscription, it remains active until the end of the billing period.
       * At that point, Stripe's webhook triggers the `customer.subscription.deleted` event to remove access.
       * If the user resubscribes before the period ends, we delete the previous subscription and create a new one.
       * As a result, when the webhook for the previous subscription fires at its original period end,
       * it won't find the old subscription in the database. This generates a friendly error,
       * which we log but don't throw, as it's an expected outcome.
       */
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        try {
          await prisma.user.update({
            where: {
              stripeSubscriptionId: subscription.id,
            },
            data: {
              stripeSubscriptionId: null,
              stripePriceId: null,
              stripeCurrentPeriodEnd: null,
              isAccess: false,
            },
          });
          console.log(`✅ Subscription ${subscription.id} removed from database`);
        } catch (error) {
          // Expected if user resubscribed — old subscription ID no longer exists in DB
          console.warn(`⚠️ Subscription ${subscription.id} not found in database (user likely resubscribed). Skipping.`);
        }
        break;
      }

      default:
        // Unhandled event type — log but don't error
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`❌ Webhook handler error for ${event.type}:`, error);
    // Return 200 to prevent Stripe from retrying — we logged the error for debugging
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}
