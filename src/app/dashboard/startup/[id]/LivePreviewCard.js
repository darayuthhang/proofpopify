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
  setIsTestModeEnabled,
  handleSaveDesign,
  isSavingDesign,
  publishMessage
}) {
  return (
    <div className="flex flex-col h-full bg-base-100 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden relative">
      
      {/* Brutalist Top Bar */}
      <div className="bg-base-200 border-b-2 border-black p-3 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-base-content/70 hidden sm:inline-block font-medium">Please remember to publish your changes 🚀</span>
          <button
            onClick={handleSaveDesign}
            className="btn btn-sm bg-[#FFD91A] hover:bg-[#e5c317] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all font-extrabold gap-1 text-xs"
            disabled={isSavingDesign}
          >
            {isSavingDesign ? (
              <span className="loading loading-spinner loading-xs text-black"></span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Publish
              </>
            )}
          </button>
        </div>
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
        className=" flex-1  flex items-center justify-center  relative"
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
