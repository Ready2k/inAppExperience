import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Phone, Zap, Shield, Database, Wifi, Server, ArrowRight, AlertCircle } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

const FlowLine = ({ label, from, to, status, color = "brand-cyan", isActive }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
    isActive 
      ? `bg-${color}/10 border-${color}/30 shadow-[0_0_15px_rgba(0,174,239,0.1)]` 
      : 'bg-white/5 border-white/10 opacity-30 grayscale'
  }`}>
    <div className="flex-1">
      <div className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${isActive ? `text-${color}` : 'text-text-secondary'}`}>{label}</div>
      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-text-secondary'}`}>{from}</span>
        <ArrowRight size={14} className={isActive ? `text-${color}` : 'text-text-secondary'} />
        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-text-secondary'}`}>{to}</span>
      </div>
    </div>
    <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
      isActive 
        ? status === 'Active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
        : 'bg-white/5 text-text-secondary'
    }`}>
      {status}
    </div>
  </div>
);

export const ArchitectureOverlay = () => {
  const { demoMode } = useDemo();
  const isToday = demoMode === 'today';
  const isCompare = demoMode === 'compare';

  const futureActive = !isToday;   // future + compare both highlight WebRTC
  const legacyActive = isToday || isCompare;  // today + compare both highlight PSTN

  return (
    <div className="max-w-6xl w-full mx-auto p-12 bg-bg-secondary rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] transition-colors duration-1000 ${isToday ? 'bg-error/5' : 'bg-brand-cyan/10'}`} />
      <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] transition-colors duration-1000 ${isToday ? 'bg-warning/5' : 'bg-accent-purple/10'}`} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Strategic Value */}
        <div className="space-y-8">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.3em] mb-4 block transition-colors duration-500 ${isToday ? 'text-error' : isCompare ? 'text-white/60' : 'text-brand-cyan'}`}>
              {isToday ? 'Legacy Architecture' : isCompare ? 'Architecture Comparison' : 'Strategic Architecture'}
            </span>
            <h1 className="text-5xl font-bold text-white leading-tight">
              {isToday ? (
                <>Fragmented<br />PSTN Voice</>
              ) : isCompare ? (
                <>PSTN vs<br />WebRTC Data</>
              ) : (
                <>Data-Native<br />In-App Calling</>
              )}
            </h1>
          </div>

          <p className="text-lg text-text-secondary leading-relaxed transition-all duration-500">
            {isToday
              ? "The legacy world relies on isolated PSTN voice channels. Identity, context, and data are siloed, resulting in high friction and repetitive security cycles."
              : isCompare
              ? "On the left, legacy PSTN — a closed, voice-only loop that creates data silos and high friction. On the right, WebRTC and data — every conversation is observable and integrated."
              : "Transitioning to an integrated WebRTC Data Layer allows the bank to maintain persistent session context and multimodal AI orchestration."
            }
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border transition-all duration-500 ${isToday ? 'bg-error/5 border-error/20' : isCompare ? 'bg-error/5 border-error/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
              <div className={isToday || isCompare ? 'text-error' : 'text-text-secondary'}><Phone size={20} /></div>
              <h3 className="text-sm font-bold text-white mb-1">Trust Silos</h3>
              <p className="text-[11px] text-text-secondary">Repeated ID&V cycles.</p>
            </div>
            <div className={`p-4 rounded-2xl border transition-all duration-500 ${isToday ? 'bg-white/5 border-white/5 opacity-50' : 'bg-brand-cyan/5 border-brand-cyan/20'}`}>
              <div className={isToday ? 'text-text-secondary' : 'text-brand-cyan'}><Shield size={20} /></div>
              <h3 className="text-sm font-bold text-white mb-1">Zero-Trust</h3>
              <p className="text-[11px] text-text-secondary">In-app auth persists.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Network Flow Comparison */}
        <div className="space-y-6">
          {/* Future Section */}
          <div className={`p-8 rounded-[24px] border transition-all duration-700 ${
            futureActive ? 'bg-black/40 border-brand-cyan/30 ring-1 ring-brand-cyan/20' : 'bg-white/5 border-white/5 opacity-20 grayscale'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 ${futureActive ? 'text-white' : 'text-text-secondary'}`}>
              <Zap size={16} className={futureActive ? 'text-brand-cyan' : 'text-text-secondary'} />
              Future: Data via WebRTC
            </h3>

            <div className="space-y-3">
              <FlowLine label="Primary Route" from="Client App (WebRTC)" to="AI Gateway (Data)" status="Active" isActive={futureActive} />
              <FlowLine label="Media Stack" from="Opus Audio" to="Amazon Nova (S2S)" status="Active" isActive={futureActive} />
              <FlowLine label="Context" from="React State" to="Handoff Package" status="Active" isActive={futureActive} />
            </div>
          </div>

          {/* Legacy Section */}
          <div className={`p-8 rounded-[24px] border transition-all duration-700 ${
            legacyActive ? 'bg-error/5 border-error/30 ring-1 ring-error/20' : 'bg-white/5 border-white/5'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 ${legacyActive ? 'text-white' : 'text-text-secondary'}`}>
              <Phone size={16} className={legacyActive ? 'text-error' : 'text-text-secondary'} />
              Legacy: Traditional PSTN
            </h3>

            <div className="space-y-3">
              <FlowLine label="Media Route" from="Public Telephone Network" to="PSTN Gateway" status="Active" color="error" isActive={legacyActive} />
              <FlowLine label="Identity" from="Manual IVR" to="Agent Prompt" status="Incomplete" color="error" isActive={legacyActive} />
              <FlowLine label="Context" from="None (Blind)" to="Cold Transfer" status="Disconnected" color="error" isActive={legacyActive} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
        <div className="flex items-center gap-6">
           <div className={`flex items-center gap-2 transition-opacity duration-500 ${futureActive ? 'opacity-100' : 'opacity-30'}`}>
              <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,174,239,1)]" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">WebRTC Orchestrated</span>
           </div>
           <div className={`flex items-center gap-2 transition-opacity duration-500 ${legacyActive ? 'opacity-100' : 'opacity-30'}`}>
              <div className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(239,68,68,1)]" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">PSTN Fragmented</span>
           </div>
        </div>
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
          {isToday ? 'Barclays Legacy Stack' : isCompare ? 'Barclays Architecture — Today vs 2028' : 'Barclays Architecture 2028'}
        </div>
      </div>
    </div>
  );
};
