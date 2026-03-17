import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { Mic, X, PhoneOff, Maximize2, MessageSquare, ShieldCheck } from 'lucide-react';

const Waveform = ({ active }) => {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [10, 30, 15, 40, 10],
          } : { height: 10 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.1,
          }}
          className={`w-[4px] rounded-full ${active ? 'bg-brand-cyan shadow-[0_0_10px_rgba(0,174,239,0.5)]' : 'bg-slate-300'}`}
        />
      ))}
    </div>
  );
};

export const VoiceSessionUI = () => {
  const { sessionState, currentScene } = useDemo();
  
  return (
    <div className="absolute inset-0 bg-white z-[80] flex flex-col p-6 pt-20">
      {/* Encryption Badge */}
      <div className="flex items-center justify-center gap-2 mb-8 bg-success/5 border border-success/10 py-1.5 rounded-full px-4 w-fit mx-auto">
        <ShieldCheck size={14} className="text-success" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-success">End-to-End Secure Session</span>
      </div>

      {/* Main Avatar / Waveform Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <motion.div 
          animate={sessionState === 'active' ? { 
            boxShadow: ["0 0 0px 0px rgba(0,174,239,0)", "0 0 40px 10px rgba(0,174,239,0.2)", "0 0 0px 0px rgba(0,174,239,0)"],
          } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-32 h-32 rounded-full bg-brand-blue flex items-center justify-center relative shadow-2xl"
        >
          <div className="absolute inset-2 border-2 border-white/10 rounded-full" />
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
             className="absolute inset-0 border-t-2 border-brand-cyan/40 rounded-full" 
          />
          <span className="text-2xl font-bold text-white">AI</span>
        </motion.div>

        <div className="text-center">
          <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">AI Agent Joined</p>
          <h2 className="text-2xl font-bold text-slate-800">Support Session</h2>
        </div>

        <Waveform active={sessionState === 'active'} />
      </div>

      {/* Multimodal Card Area (Scene 5 Focus) */}
      <AnimatePresence>
        {currentScene.id >= 4 && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-[28px] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Action Required</span>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              I can freeze your card immediately for protection. Would you like me to do that now?
            </p>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm">Freeze Card</button>
              <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm">Not Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Controls */}
      <div className="pb-12 flex items-center justify-center gap-6">
        <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <Mic size={24} />
        </button>
        <button className="w-20 h-20 rounded-full bg-error flex items-center justify-center text-white shadow-xl shadow-error/30 active:scale-95 transition-transform">
          <PhoneOff size={32} />
        </button>
        <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};
