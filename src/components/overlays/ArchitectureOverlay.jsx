import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Phone, Zap, Shield, Database, Wifi, Server, ArrowRight } from 'lucide-react';

const FlowLine = ({ label, from, to, status, color = "brand-cyan" }) => (
  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 group hover:border-brand-cyan/30 transition-colors">
    <div className="flex-1">
      <div className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mb-1">{label}</div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-white">{from}</span>
        <ArrowRight size={14} className="text-brand-cyan" />
        <span className="text-sm font-bold text-white">{to}</span>
      </div>
    </div>
    <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-opacity-10 ${status === 'Active' ? 'bg-success text-success' : 'text-text-secondary bg-white'}`}>
      {status}
    </div>
  </div>
);

export const ArchitectureOverlay = () => {
  return (
    <div className="max-w-6xl w-full mx-auto p-12 bg-bg-secondary rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Strategic Value */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-[0.3em] mb-4 block">Strategic Architecture</span>
            <h1 className="text-5xl font-bold text-white leading-tight">Data-Native<br />In-App Calling</h1>
          </div>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Transitioning from legacy PSTN voice to an integrated WebRTC Data Layer allows the bank to maintain persistent session context and multimodal AI orchestration.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-brand-cyan mb-2"><Globe size={20} /></div>
              <h3 className="text-sm font-bold text-white mb-1">Global Scale</h3>
              <p className="text-[11px] text-text-secondary">Cloud-native WebRTC infrastructure.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-success mb-2"><Shield size={20} /></div>
              <h3 className="text-sm font-bold text-white mb-1">Zero-Trust</h3>
              <p className="text-[11px] text-text-secondary">In-app auth persists into voice.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Network Flow Comparison */}
        <div className="space-y-6">
          <div className="bg-black/20 p-8 rounded-[24px] border border-white/5 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Zap size={16} className="text-brand-cyan" />
              Future: Data via WebRTC
            </h3>
            
            <div className="space-y-3">
              <FlowLine label="Primary Route" from="Client App (WebRTC)" to="AI Gateway (Data)" status="Active" />
              <FlowLine label="Media Stack" from="Opus Audio" to="Amazon Nova (S2S)" status="Active" />
              <FlowLine label="Context" from="React State" to="Handoff Package" status="Active" />
            </div>

            <div className="pt-4 border-t border-white/5">
              <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">Redundancy / Fallback</h3>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-dashed border-white/20 opacity-60">
                <Phone size={14} />
                <span className="text-xs font-medium">Automatic PSTN Failover (No Signal / Data)</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-[24px] border border-white/5 opacity-40 grayscale group hover:grayscale-0 transition-all">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">Legacy: Traditional Voice</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full" />
              <span className="text-[10px] uppercase font-bold text-text-secondary">Fragmented PSTN Journey</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,174,239,1)]" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">WebRTC Orchestrated</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(124,58,237,1)]" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Context-Aware</span>
           </div>
        </div>
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Barclays Architecture 2028</div>
      </div>
    </div>
  );
};
