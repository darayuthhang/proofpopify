import { HiCheckBadge, HiShieldCheck, HiLockClosed } from "react-icons/hi2";
import { FaStripe } from "react-icons/fa6";
import Link from "next/link";
import prisma from "@/lib/prisma";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const proofId = params?.proof_id;
  
  if (proofId) {
    const startup = await prisma.startup.findFirst({
      where: { proof_id: proofId },
      select: { name: true }
    });
    if (startup) {
      return {
        title: `Verified Transaction | ${startup.name}`,
        description: `This transaction has been cryptographically verified by ProofPopify for ${startup.name}.`,
      }
    }
  }

  return {
    title: "Verified Transaction | ProofPopify",
    description: "This transaction has been cryptographically verified by ProofPopify using a secure direct Stripe integration.",
  }
}

export default async function VerifiedPage({ searchParams }) {
  const params = await searchParams;
  const proofId = params.proof_id;

  let startupName = null;
  if (proofId) {
    const startup = await prisma.startup.findFirst({
      where: { proof_id: proofId },
      select: { name: true }
    });
    if (startup) {
      startupName = startup.name;
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl bg-base-100 rounded-3xl p-10 shadow-xl border border-base-300">
        
        {/* Animated Icon Header */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full bg-green-50 text-green-500 shadow-inner">
          <HiCheckBadge className="w-14 h-14" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-base-200">
            <FaStripe className="w-6 h-6 text-[#635BFF]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-base-content mb-4 tracking-tight">
          {startupName ? `Verified Transaction for ${startupName}` : "100% Verified Transaction"}
        </h1>
        
        <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
          The notification you just saw is authentic. We partner directly with payment processors to guarantee that every sale displayed is a real, completed transaction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-base-200 pt-8 mt-2">
          <div className="flex gap-4">
            <div className="text-[#635BFF] bg-[#635BFF]/10 p-3 rounded-xl h-fit">
              <HiShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base-content mb-1">Direct Integration</h3>
              <p className="text-sm text-base-content/60 leading-snug">
                ProofPopify connects securely to the merchant's Stripe account using a read-only API. No manual entries are allowed.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="text-green-500 bg-green-50 p-3 rounded-xl h-fit">
              <HiLockClosed className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base-content mb-1">Fraud Prevention</h3>
              <p className="text-sm text-base-content/60 leading-snug">
                We strictly monitor data flowing from the payment gateway to ensure zero manipulation or fake social proof.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-base-200">
          <p className="text-xs text-base-content/50 uppercase tracking-widest font-semibold mb-3">
            Protected by
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-lg text-white">
              <HiCheckBadge className="w-5 h-5" />
            </div>
            Proof<span className="text-primary">Popify</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
