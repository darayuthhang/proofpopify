"use client";

import PopupPreview from "./PopupPreview";

export default function LivePreviewCard({
  themeColor,
  backgroundColor,
  actionText,
  showRealNames,
  showIcon,
  showBorder,
  isTestModeEnabled,
  setIsTestModeEnabled
}) {
  return (
    <div className="flex flex-col h-full bg-base-100 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden relative">
      
      {/* Brutalist Top Bar */}
      <div className="bg-base-200 border-b-2 border-black p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
        </div>
        <div className="text-xs font-bold text-black uppercase tracking-widest">Popup Live Canvas</div>
        <div className="w-12"></div>
      </div>

      {/* Yellow Test Bar — on top so mobile users see it immediately */}
      <div className="bg-[#FFD91A] p-4 px-6 border-b-2 border-black flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-extrabold text-sm text-black tracking-tight">Test on Dashboard</h3>
          <p className="text-xs text-black/70 font-medium mt-0.5">Toggle to see the popup on this page.</p>
        </div>
        <input 
          type="checkbox" 
  className="toggle border-indigo-600 bg-indigo-500 checked:bg-[#FFD91A]  checked:bg-orange-400 checked:text-orange-800"
          checked={isTestModeEnabled}
          onChange={() => setIsTestModeEnabled(!isTestModeEnabled)}
        />
      </div>
      
      {/* Expansive Canvas Area — min-h so it's visible on mobile */}
      <div 
        className="flex-1  flex items-center justify-center  relative"
        style={{
          backgroundColor: '#72DDA4',
          backgroundImage: 'radial-gradient(#1e293b 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }}
      >
        <div className="z-10 drop-shadow-xl transition-transform duration-300 transform scale-[0.8] sm:scale-100 lg:scale-125">
          <PopupPreview 
            color={themeColor} 
            bg={backgroundColor} 
            action={actionText} 
            realName={showRealNames} 
            showIcon={showIcon}
            showBorder={showBorder}
          />
        </div>
      </div>
    </div>
  );
}
