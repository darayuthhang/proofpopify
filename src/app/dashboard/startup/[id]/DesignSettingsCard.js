"use client";

import { HiPaintBrush } from "react-icons/hi2";

export default function DesignSettingsCard({
  themeColor,
  setThemeColor,
  backgroundColor,
  setBackgroundColor,
  actionText,
  setActionText,
  showRealNames,
  setShowRealNames,
  showIcon,
  setShowIcon,
  position,
  setPosition,
  handleSaveDesign,
  isSavingDesign,
  message
}) {
  // Recommended Swatches
  const highlightSwatches = ['#00B4D8', '#16a34a', '#8b5cf6', '#f97316', '#e02424', '#2563eb'];
  const bgSwatches = ['#ffffff', '#f8fafc', '#1e293b', '#0f172a', '#18181b', '#2e1065'];

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <h2 className="card-title text-xl flex items-center gap-2">
          <HiPaintBrush className="w-5 h-5 text-secondary" />
          2. Choose a Style
        </h2>
        <p className="text-sm text-base-content/70 mb-4">
          Pick a pre-designed theme for your popup. Click to preview, then save.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          
          {/* Text / Verify Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label p-0"><span className="label-text font-medium">Text Link Color</span></label>
              <div className="flex gap-1.5">
                {highlightSwatches.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-5 h-5 rounded-full cursor-pointer border shadow-sm transition-transform hover:scale-110 ${themeColor === color ? 'ring-2 ring-offset-1 ring-base-content/30' : 'border-base-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setThemeColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer p-0 border-0"
              />
              <input
                type="text"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="input input-bordered input-sm flex-1 font-mono uppercase"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label p-0"><span className="label-text font-medium">Card Background Color</span></label>
              <div className="flex gap-1.5">
                {bgSwatches.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-5 h-5 rounded-full cursor-pointer border shadow-sm transition-transform hover:scale-110 ${backgroundColor === color ? 'ring-2 ring-offset-1 ring-base-content/30' : 'border-base-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer p-0 border-0"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="input input-bordered input-sm flex-1 font-mono uppercase"
              />
            </div>
          </div>

          {/* Action Text */}
          <div>
            <label className="label pt-0"><span className="label-text font-medium">Action Text</span></label>
            <input
              type="text"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="e.g., subscribed, bought, ordered"
              className="input input-bordered w-full"
              maxLength={30}
            />
            <label className="label pb-0"><span className="label-text-alt text-base-content/60">What did the customer do?</span></label>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-lg mt-2">
            <div>
              <span className="label-text font-medium block">Show Customer Names</span>
              <span className="text-xs text-base-content/60">Turn off to display "Someone" instead.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={showRealNames}
              onChange={(e) => setShowRealNames(e.target.checked)}
            />
          </div>

          {/* Show Icon Toggle */}
          <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-lg">
            <div>
              <span className="label-text font-medium block">Show Customer Avatar</span>
              <span className="text-xs text-base-content/60">Display an illustrative avatar next to the popup text.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={showIcon}
              onChange={(e) => setShowIcon(e.target.checked)}
            />
          </div>

          {/* Position Select */}
          <div>
            <label className="label pt-0"><span className="label-text font-medium">Popup Position</span></label>
            <select 
              className="select select-bordered w-full"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="bottom-left">Bottom Left (Default)</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Save Footer */}
      <div className="p-6 pt-4 border-t border-base-200 bg-base-100 mt-auto rounded-b-[1rem] z-10 shrink-0">
        <button
          onClick={handleSaveDesign}
          className="btn btn-primary w-full shadow-md transition-all"
          disabled={isSavingDesign}
        >
          {isSavingDesign ? <span className="loading loading-spinner text-white"></span> : "Save Design Preferences"}
        </button>

        {message.section === "design" && message.text && (
          <p className={`text-sm mt-3 text-center font-medium ${message.type === "error" ? "text-error" : "text-success"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
