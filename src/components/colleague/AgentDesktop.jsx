import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, FileText, User, MessageCircle, Search } from 'lucide-react';

export const HandoffPackage = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="bg-[#002050] px-4 py-3 text-white flex items-center gap-2">
        <Shield size={16} />
        <span className="text-xs font-bold uppercase tracking-wider">AI Handoff Intelligence</span>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Issue Summary */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Issue Detected</label>
          <p className="text-sm font-bold text-slate-800">{data.issue}</p>
        </div>

        {/* Sentiment & Confidence */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sentiment</label>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs font-medium text-slate-600">{data.sentiment}</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Auth Level</label>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-success" />
              <span className="text-xs font-medium text-slate-600">Level 3 (Secure)</span>
            </div>
          </div>
        </div>

        {/* Actions Taken */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Automated Actions Completed</label>
          <div className="space-y-2">
            {data.actionsTaken.map((action, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-success font-medium bg-success/5 p-2 rounded-lg border border-success/10">
                <CheckCircle size={14} />
                {action}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Step */}
        <div className="p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl">
          <label className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block mb-1">AI Recommendation</label>
          <p className="text-xs font-medium text-slate-700 leading-relaxed">{data.recommendedNext}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const AgentDesktop = ({ handoffData, todayMode }) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Search / CRM Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col p-6 overflow-y-auto">
        {!todayMode ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={24} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Joe Bloggs</h2>
                <p className="text-xs text-slate-400 tracking-tight">Premier Customer • 12 Years</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Contact Method</span>
                <p className="text-xs font-bold mt-1 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                  In-App WebRTC Voice
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Wait Time</span>
                <p className="text-xs font-bold mt-1">00:00 (Direct Handoff)</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
             <Search size={48} className="mb-4 text-slate-300" />
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Search for Customer</p>
             <p className="text-[10px] text-slate-300 mt-2 px-8">No linked session found. Manual look-up required.</p>
          </div>
        )}
      </div>

      {/* Main Timeline / Conversation Area */}
      <div className="flex-1 bg-[#F9FAFB] p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${todayMode ? 'bg-slate-400' : 'bg-[#002050]'} flex items-center justify-center text-white`}>
                <MessageCircle size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">Active Interaction</span>
                <p className="text-sm font-bold text-slate-800 italic">
                  {todayMode ? '"Unknown Caller..."' : '"Joe is on the line..."'}
                </p>
              </div>
            </div>
            <button className={`px-6 py-2 ${todayMode ? 'bg-slate-400' : 'bg-[#002050]'} text-white rounded-lg text-sm font-bold shadow-lg shadow-black/10`}>Join Discussion</button>
          </div>

          {!todayMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <HandoffPackage data={handoffData} />
               
               {/* Simple Live Transcript */}
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Live Session Intelligence</label>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm min-h-[400px]">
                     <div className="flex gap-3">
                        <div className="text-[10px] font-bold text-brand-cyan shrink-0 pt-0.5">AI</div>
                        <p className="text-xs text-slate-600 tracking-tight leading-relaxed">"I've frozen the card as a precaution. A human specialist is joining us now with all the details..."</p>
                     </div>
                     <div className="flex gap-3">
                        <div className="text-[10px] font-bold text-slate-800 shrink-0 pt-0.5">CUST</div>
                        <p className="text-xs text-slate-800 font-medium tracking-tight leading-relaxed">"Thank you, that's a relief."</p>
                     </div>
                     <div className="pt-4 mt-4 border-t border-dashed border-slate-100 italic text-[10px] text-slate-400 text-center">
                        AI handoff triggered • Specialist context loaded
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-[32px] text-center bg-white/50">
               <AlertCircle size={48} className="text-slate-300 mb-4" />
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Cold Transfer</h3>
               <p className="text-xs text-slate-400 max-w-sm">No context luggage was shared during this transfer. Specialist must perform manual ID&V and re-capture intent.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
