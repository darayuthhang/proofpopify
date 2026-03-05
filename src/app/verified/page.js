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
        description: `This transaction has been Stripe verified by ProofPopify for ${startup.name}.`,
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
            We cannot verify the authenticity of this notification. The verification data is either missing or invalid, meaning this social proof might be fake.
          </p>

          <div className="h-px w-full bg-black opacity-20 mb-8 sm:mb-12"></div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-extrabold text-black hover:-translate-y-1 transition-transform group">
              <img src="/logo.svg" alt="ProofPopify Logo" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm group-hover:scale-110 transition-transform" />
              Proof<span className="text-[#00B4D8]">Popify</span>
            </Link>

            <Link href="/" className="h-10 sm:h-12 px-6 sm:px-8 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#FFD91A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap">
              Get ProofPopify
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

      <div className="max-w-4xl w-full bg-white rounded border-2 border-black p-6 sm:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 animate-fade-in">
        
        {/* Animated Icon Header */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 sm:mb-10 flex items-center justify-center rounded-full bg-[#72DDA4] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
          <HiCheckBadge className="w-12 h-12 sm:w-14 sm:h-14" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 sm:p-2.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-fit min-h-fit flex items-center justify-center">
            <FaStripe className="w-6 h-6 sm:w-7 sm:h-7 text-[#635BFF]" />
          </div>
        </div>

        <div className="inline-flex items-center text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-6 bg-[#FFD91A] px-3 sm:px-4 py-2 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          <FaStripe className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" /> Stripe Verified
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">
          <span className="text-[#00B4D8]">{startupName}</span> is verified
        </h1>
        
        <p className="text-xl sm:text-2xl text-black mb-8 sm:mb-10 font-bold max-w-2xl mx-auto leading-relaxed">
          You just saw a genuine, completed transaction!
        </p>

        <div className="h-px w-full bg-black opacity-20 mb-8 sm:mb-10"></div>

        <div className="mb-10 p-6 sm:p-8 bg-[#F9FAFB] border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-black mb-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                <HiCheckBadge className="w-8 h-8 text-[#72DDA4] shrink-0" /> This website only shows verified data
            </h2>
            <p className="text-black/70 font-medium text-sm sm:text-base max-w-xl mx-auto">
                Data is collected directly from the payment provider via secure API, making it impossible to fake.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 text-center mb-10 sm:mb-12">
          <div className="flex flex-col items-center p-6 bg-white border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-black bg-[#FFD91A] p-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              <span className="font-extrabold text-lg lg:text-xl w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">1</span>
            </div>
            <h3 className="font-extrabold text-black mb-2 text-lg lg:text-xl tracking-tight">Step 1</h3>
            <p className="text-sm text-black/70 font-medium leading-relaxed">
              Users connect their payment provider to our platform.
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-black bg-[#72DDA4] p-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              <span className="font-extrabold text-lg lg:text-xl w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">2</span>
            </div>
            <h3 className="font-extrabold text-black mb-2 text-lg lg:text-xl tracking-tight">Step 2</h3>
            <p className="text-sm text-black/70 font-medium leading-relaxed">
              We pull data directly from payment providers in real-time.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="text-black bg-[#00B4D8] p-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              <span className="font-extrabold text-white text-lg lg:text-xl w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">3</span>
            </div>
            <h3 className="font-extrabold text-black mb-2 text-lg lg:text-xl tracking-tight">Step 3</h3>
            <p className="text-sm text-black/70 font-medium leading-relaxed">
              We display the data securely on the website.
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-black/80 font-medium mb-4 max-w-2xl mx-auto leading-relaxed">
          In an age where many websites use fake data, <span className="font-extrabold text-black">{startupName}</span> decided to focus on trust.
        </p>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-black/50 uppercase tracking-widest font-extrabold mb-3">
              Secured & Protected by
            </p>
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-extrabold text-black hover:-translate-y-1 transition-transform group">
              <img src="/logo.svg" alt="ProofPopify Logo" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm group-hover:scale-110 transition-transform" />
              Proof<span className="text-[#00B4D8]">Popify</span>
            </Link>
          </div>

          <Link href="/" className="h-12 sm:h-14 px-6 sm:px-8 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#FFD91A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap text-lg">
            Get ProofPopify
          </Link>
        </div>
        
      </div>
    </div>
  );
}
