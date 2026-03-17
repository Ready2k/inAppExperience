import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { Mic, PhoneOff, MessageSquare, ShieldCheck, User } from 'lucide-react';

const Waveform = ({ active, color = 'brand-cyan' }) => {
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
          className={`w-[4px] rounded-full ${active ? `bg-${color} shadow-[0_0_10px_rgba(0,174,239,0.5)]` : 'bg-slate-300'}`}
        />
      ))}
    </div>
  );
};

const AIAvatar = ({ sessionState }) => (
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
);

const ColleagueAvatar = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: 1,
      opacity: 1,
      boxShadow: ["0 0 0px 0px rgba(34,197,94,0)", "0 0 40px 10px rgba(34,197,94,0.2)", "0 0 0px 0px rgba(34,197,94,0)"],
    }}
    transition={{ duration: 0.4, boxShadow: { repeat: Infinity, duration: 3 } }}
    className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center relative shadow-2xl"
  >
    <div className="absolute inset-2 border-2 border-white/10 rounded-full" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 border-t-2 border-success/40 rounded-full"
    />
    <User size={40} className="text-white" />
  </motion.div>
);

export const VoiceSessionUI = () => {
  const { sessionState, currentScene } = useDemo();
  const isHandoff = sessionState === 'handoff';

  return (
    <div className="absolute inset-0 bg-white z-[80] flex flex-col p-6 pt-20">
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 mb-8 bg-success/5 border border-success/10 py-1.5 rounded-full px-4 w-fit mx-auto">
        <ShieldCheck size={14} className="text-success" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-success">End-to-End Secure Session</span>
      </div>

      {/* Main Avatar / Waveform Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <AnimatePresence mode="wait">
          {isHandoff ? (
            <motion.div
              key="handoff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Transition: AI fades out, Colleague fades in */}
              <div className="relative flex items-center justify-center gap-4">
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: -20, opacity: 0.25 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center shadow-lg"
                >
                  <span className="text-sm font-bold text-white">AI</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="w-2 h-2 rounded-full bg-success"
                />
                <ColleagueAvatar />
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm font-bold text-success tracking-widest uppercase mb-1">Warm Handoff</p>
                  <h2 className="text-2xl font-bold text-slate-800">Colleague Joined</h2>
                  <p className="text-xs text-slate-400 mt-1">Full context transferred</p>
                </motion.div>
              </div>

              <Waveform active={true} color="success" />

              {/* Context transfer summary */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full px-2 py-3 bg-success/5 border border-success/20 rounded-2xl"
              >
                <p className="text-[10px] font-bold text-success uppercase tracking-widest text-center mb-2">Context Luggage Delivered</p>
                <div className="flex flex-col gap-1">
                  {['Transcript', 'Card Frozen', 'Dispute Raised', 'Identity Confirmed'].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                      <span className="text-[11px] text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="ai-agent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              <AIAvatar sessionState={sessionState} />

              <div className="text-center">
                <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">AI Agent</p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {sessionState === 'connecting' ? 'Connecting…' : 'Support Session'}
                </h2>
              </div>

              <Waveform active={sessionState === 'active'} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Multimodal Card Area */}
      <AnimatePresence mode="wait">
        {currentScene.id === 4 && !isHandoff && (
          // Scene 5: Action prompt — freeze card?
          <motion.div
            key="action-prompt"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-[28px] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Action Required</span>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              I can see a Spotify Digital charge for £67.49. I can freeze your card immediately — shall I do that now?
            </p>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm">Freeze Card</button>
              <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm">Not Now</button>
            </div>
          </motion.div>
        )}
        {currentScene.id === 5 && !isHandoff && (
          // Scene 6: Actions completed — resolution confirmed
          <motion.div
            key="actions-done"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="mb-8 p-5 bg-success/5 border border-success/20 rounded-[28px] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <ShieldCheck size={18} className="text-success" />
              </div>
              <span className="text-xs font-bold text-success uppercase tracking-widest">Actions Taken</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Card Frozen', detail: 'Spotify Digital charge blocked' },
                { label: 'Dispute Raised', detail: '£67.49 — ref: DSP-2847' },
                { label: 'Replacement Card', detail: 'Ordered — arrives in 3–5 days' },
              ].map(({ label, detail }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{label}</p>
                    <p className="text-[11px] text-slate-500">{detail}</p>
                  </div>
                </div>
              ))}
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
