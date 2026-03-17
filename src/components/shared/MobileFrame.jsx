import React from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { Signal, Wifi, BatteryLow, BatteryFull } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const { currentTime } = useDemo();
  
  const timeString = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });

  return (
    <div className="phone-container">
      {/* Status Bar */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center z-50 relative bg-black/20 backdrop-blur-sm">
        <span className="text-[14px] font-semibold text-white">{timeString}</span>
        <div className="flex gap-1.5 items-center">
          <Signal size={14} className="text-white" />
          <Wifi size={14} className="text-white" />
          <BatteryFull size={18} className="text-white" />
        </div>
      </div>

      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-[20px] z-[60]" />

      {/* Content Area */}
      <div className="h-full w-full relative overflow-y-auto overflow-x-hidden bg-white text-black">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-black/20 rounded-full z-50" />
    </div>
  );
};
