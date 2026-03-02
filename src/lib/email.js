import { Resend } from "resend";
import { constants } from "./constants";


const resend = new Resend(process.env.RESEND_API_KEY);
const APP_EMAIL = `${constants.APP_NAME} <onboarding@${constants.APP_DOMAIN}>`;


export async function sendVerificationEmail(email, token) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: APP_EMAIL,
      to: email,
      subject: "Verify your email address",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a0f; color: #f1f1f7; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; margin: 0;">🔐 ${constants.APP_NAME}</h1>
          </div>
          <h2 style="font-size: 20px; margin-bottom: 8px;">Verify your email</h2>
          <p style="color: #8b8b9e; line-height: 1.6; margin-bottom: 24px;">
            Thanks for signing up! Click the button below to verify your email address and activate your account.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Verify Email
            </a>
          </div>
          <p style="color: #5a5a6e; font-size: 13px; line-height: 1.5;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
}

export async function sendEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: APP_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
}
