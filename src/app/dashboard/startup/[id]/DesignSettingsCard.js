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
  showBorder,
  setShowBorder,
  showCity,
  setShowCity,
  position,
  setPosition
}) {
  // Recommended Swatches
  const highlightSwatches = ['#2563eb', '#0891b2', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0f172a'];
  const bgSwatches = ['#ffffff', '#f8fafc', '#1e293b', '#0f172a', '#18181b', '#2e1065'];

  return (
    <div className="card bg-[#111827] text-white shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl flex items-center gap-2 text-[#e5e7eb]">
          <HiPaintBrush className="w-5 h-5 text-green-400" />
          2. Choose a Style
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Customize your popup style. Preview changes live, then publish.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          
          {/* Text / Verify Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label p-0"><span className="label-text font-medium text-[#e5e7eb]">Text Link Color</span></label>
              <div className="flex gap-1.5">
                {highlightSwatches.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-5 h-5 rounded-full cursor-pointer border shadow-sm transition-transform hover:scale-110 border-gray-600 ${themeColor === color ? 'ring-2 ring-offset-1 ring-offset-[#111827] ring-green-400' : ''}`}
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
                className="input input-bordered input-sm flex-1 font-mono uppercase bg-[#1f2937] border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label p-0"><span className="label-text text-sm text-[#e5e7eb]"> Background Color</span></label>
              <div className="flex gap-1.5">
                {bgSwatches.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-5 h-5 rounded-full cursor-pointer border shadow-sm transition-transform hover:scale-110 border-gray-600 ${backgroundColor === color ? 'ring-2 ring-offset-1 ring-offset-[#111827] ring-green-400' : ''}`}
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
                className="input input-bordered input-sm flex-1 font-mono uppercase bg-[#1f2937] border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Action Text */}
          <div>
            <label className="label pt-0"><span className="label-text font-medium text-[#e5e7eb]">Action Text</span></label>
            <select
              className="select select-bordered w-full bg-[#1f2937] border-gray-600 text-white"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
            >
              <option value="subscribed">subscribed</option>
              <option value="purchased">purchased</option>
              <option value="bought">bought</option>
              <option value="upgraded">upgraded</option>

              <option value="ordered">ordered</option>
              <option value="paid">paid</option>
              <option value="donated">donated</option>
              <option value="booked">booked</option>
            </select>
            <label className="label pb-0"><span className="label-text-alt text-gray-400">What did the customer do?</span></label>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1f2937] rounded-lg mt-2">
            <div>
              <span className="label-text font-medium block text-[#e5e7eb]">Show Customer Names</span>
              <span className="text-xs text-gray-400">Turn off to display "Someone" instead.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-success bg-gray-600 border-gray-500" 
              checked={showRealNames}
              onChange={(e) => setShowRealNames(e.target.checked)}
            />
          </div>

          {/* Show Icon Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1f2937] rounded-lg">
            <div>
              <span className="label-text font-medium block text-[#e5e7eb]">Show Customer Avatar</span>
              <span className="text-xs text-gray-400">Display an illustrative avatar next to the popup text.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-success bg-gray-600 border-gray-500" 
              checked={showIcon}
              onChange={(e) => setShowIcon(e.target.checked)}
            />
          </div>

          {/* Show Border Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1f2937] rounded-lg">
            <div>
              <span className="label-text font-medium block text-[#e5e7eb]">Show Hard Border</span>
              <span className="text-xs text-gray-400">Display a dark thick border and shadow around the popup.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-success bg-gray-600 border-gray-500" 
              checked={showBorder}
              onChange={(e) => setShowBorder(e.target.checked)}
            />
          </div>

          {/* Show City Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1f2937] rounded-lg">
            <div>
              <span className="label-text font-medium block text-[#e5e7eb]">Show City</span>
              <span className="text-xs text-gray-400">Display the customer's city alongside their country.</span>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-success bg-gray-600 border-gray-500" 
              checked={showCity}
              onChange={(e) => setShowCity(e.target.checked)}
            />
          </div>

          {/* Position Select */}
          <div>
            <label className="label pt-0"><span className="label-text font-medium text-[#e5e7eb]">Popup Position</span></label>
            <select 
              className="select select-bordered w-full bg-[#1f2937] border-gray-600 text-white"
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
    </div>
  );
}
