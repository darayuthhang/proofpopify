"use client";

import { useState, useCallback } from "react";
import { HiOutlinePlay } from "react-icons/hi2";

const YOUTUBE_VIDEO_ID = "s_Ej0nNX0og";

export default function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-white border-b-2 border-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block text-black uppercase font-bold tracking-widest text-sm mb-4">
            See It In Action
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-5 leading-[1.1]">
            Watch How It Works in{" "}
            <span className="text-[#635BFF]">60 Seconds</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 font-medium leading-relaxed max-w-xl mx-auto">
            See exactly how ProofPopify connects to your Stripe account and
            starts showing real, verified purchase popups to your visitors.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative bg-black border-2 border-black rounded-lg overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="ProofPopify Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            ) : (
              <button
                onClick={handlePlay}
                aria-label="Play demo video"
                className="group absolute inset-0 w-full h-full cursor-pointer bg-black"
              >
                {/* YouTube Thumbnail — loaded from YouTube's CDN, zero Vercel cost */}
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt="ProofPopify demo video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FFD91A] border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                    <HiOutlinePlay className="w-10 h-10 sm:w-12 sm:h-12 text-black ml-1" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="inline-block bg-black/80 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                    ▶ Watch the 60-second demo
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Trust Nudge Below Video */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-black/60 font-medium">
           
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7EE19F] rounded-full border border-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              2-minute setup
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7EE19F] rounded-full border border-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              Works on any site
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
