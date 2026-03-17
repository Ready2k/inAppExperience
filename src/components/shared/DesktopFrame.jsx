import React from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { User, Phone, MessageSquare, Shield, Clock, Search, ChevronDown, Bell, Settings } from 'lucide-react';

export const DesktopFrame = ({ children }) => {
  return (
    <div className="monitor-container flex flex-col bg-[#F3F4F6] text-slate-800 font-sans">
      {/* CRM-style Top Bar */}
      <div className="h-12 bg-[#002050] flex items-center justify-between px-4 text-white shrink-0">
        <div className="flex items-center gap-6">
          <div className="font-bold tracking-tighter text-lg">Customised CRM</div>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <span>Customer Service Workspace</span>
            <ChevronDown size={14} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={18} />
          <Clock size={18} />
          <Bell size={18} />
          <Settings size={18} />
          <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-xs font-bold">AS</div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-12 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-6 text-slate-400">
          <Phone size={20} className="text-[#002050]" />
          <MessageSquare size={20} />
          <User size={20} />
          <Shield size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
