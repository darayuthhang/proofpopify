import { constants } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer p-10 lg:p-20 bg-[#F9FAFB] text-black">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <aside>
            <div className="flex items-center gap-3 mb-4 text-black">
              <img src="/logo.svg" alt="ProofPopify Logo" className="w-10 h-10 drop-shadow-md" />
              <span className="text-2xl font-extrabold tracking-tight">{constants.APP_NAME}</span>
            </div>
            <p className="max-w-xs text-black/70 leading-relaxed font-medium">
              We help founders build trust and increase sales by displaying honest, Stripe-verified social proof on their websites.
            </p>
          </aside>
          
          <nav className="grid grid-flow-row gap-4">
            <h6 className="footer-title opacity-50 uppercase font-black text-xs tracking-widest text-black">Platform</h6>
            <Link href="/login" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Sign In</Link>
            <Link href="/register" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Register</Link>
            <Link href="#pricing" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Pricing</Link>
          </nav>
          
          <nav className="grid grid-flow-row gap-4">
            <h6 className="footer-title opacity-50 uppercase font-black text-xs tracking-widest text-black">Legal & Support</h6>
            <Link href="/terms" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Privacy Policy</Link>
            <Link href="https://x.com/DarayuthH" target="_blank" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Contact on X</Link>
            <a href="mailto:darayuthhang12@gmail.com" className="link link-hover font-bold hover:text-[#72DDA4] transition-colors">Email Support</a>
          </nav>
        </div>
        
        <div className="footer footer-center p-4 pt-10 border-t-2 border-black/10 mt-10 w-full container mx-auto text-black/50">
          <aside>
            <p className="text-sm font-bold">
              © {new Date().getFullYear()} {constants.APP_NAME}. All rights reserved.
            </p>
          </aside>
        </div>
      </footer>
  );
}
