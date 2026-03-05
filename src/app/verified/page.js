import { HiCheckBadge, HiShieldCheck, HiLockClosed, HiXCircle } from "react-icons/hi2";
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
    title: "Unverified Transaction | ProofPopify",
    description: "This transaction could not be verified by ProofPopify.",
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

  // If startupName is null, the proof_id is either missing or invalid.
  if (!startupName) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] rounded-full bg-[#FFCCCB] blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="max-w-3xl w-full bg-white rounded border-2 border-black p-6 sm:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 animate-fade-in">
          
          {/* Animated Icon Header (Error) */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 sm:mb-10 flex items-center justify-center rounded-full bg-[#FF4C4C] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
            <HiXCircle className="w-14 h-14 sm:w-16 h-16" />
          </div>

          <div className="inline-block text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-6 bg-[#FFCCCB] px-3 sm:px-4 py-2 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            Verification Failed
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Unverified Transaction
          </h1>
          
          <p className="text-lg sm:text-xl text-black/70 mb-8 sm:mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            We cannot verify the authenticity of this notification. The cryptographic proof is either missing or invalid, meaning this social proof might be fake.
          </p>

          <div className="h-px w-full bg-black opacity-20 mb-8 sm:mb-12"></div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 ">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-extrabold text-black hover:-translate-y-1 transition-transform group">
              <img src="/logo.svg" alt="ProofPopify Logo" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm group-hover:scale-110 transition-transform" />
              Proof<span className="text-[#00B4D8]">Popify</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Valid proof rendering below
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden xl:py-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] rounded-full bg-[#00B4D8] blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] rounded-full bg-[#72DDA4] blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-3xl w-full bg-white rounded border-2 border-black p-6 sm:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 animate-fade-in">
        
        {/* Animated Icon Header */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 sm:mb-10 flex items-center justify-center rounded-full bg-[#72DDA4] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
          <HiCheckBadge className="w-12 h-12 sm:w-14 sm:h-14" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 sm:p-2.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-fit min-h-fit flex items-center justify-center">
            <FaStripe className="w-6 h-6 sm:w-7 sm:h-7 text-[#635BFF]" />
          </div>
        </div>

        <div className="inline-block text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-6 bg-[#FFD91A] px-3 sm:px-4 py-2 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          Cryptographically Verified
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">
          Verified Transaction for <span className="text-[#00B4D8] block sm:inline mt-1 sm:mt-0">{startupName}</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-black/70 mb-8 sm:mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          The notification you just saw is real. We partner directly with Stripe to guarantee that every sale displayed is a genuine, completed transaction. No fake social proof.
        </p>

        <div className="h-px w-full bg-black opacity-20 mb-8 sm:mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left mb-2 sm:mb-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start p-6 sm:p-8 bg-[#F9FAFB] border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-black bg-[#FFD91A] p-3 sm:p-3.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] h-fit shrink-0">
              <HiShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-black mb-2 sm:mb-3 text-lg sm:text-xl tracking-tight">Direct Integration</h3>
              <p className="text-sm sm:text-base text-black/70 font-medium leading-relaxed">
                ProofPopify connects securely to the merchant's Stripe account via a read-only API. Manual entries and fake notifications are impossible.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start p-6 sm:p-8 bg-[#F9FAFB] border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-black bg-[#72DDA4] p-3 sm:p-3.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] h-fit shrink-0">
              <HiLockClosed className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-black mb-2 sm:mb-3 text-lg sm:text-xl tracking-tight">Fraud Prevention</h3>
              <p className="text-sm sm:text-base text-black/70 font-medium leading-relaxed">
                We strictly monitor the encrypted data flow from Stripe to ensure absolute zero manipulation by the merchant or third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t-2 border-black/10">
          <p className="text-xs sm:text-sm text-black/50 uppercase tracking-widest font-extrabold mb-4 sm:mb-5">
            Secured & Protected by
          </p>
          <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-extrabold text-black hover:-translate-y-1 transition-transform group">
            <img src="/logo.svg" alt="ProofPopify Logo" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm group-hover:scale-110 transition-transform" />
            Proof<span className="text-[#00B4D8]">Popify</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
