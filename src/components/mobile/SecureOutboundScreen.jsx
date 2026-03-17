import React from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Shield, CheckCircle, Mic, MessageSquare, Lock } from 'lucide-react';

const colleague = {
  name: 'Jane Smith',
  initials: 'JS',
  role: 'Barclays Mortgage Adviser',
  reason: 'Update on reference BF12345678',
};

export const SecureOutboundScreen = ({ scene }) => {
  const isIncoming = scene.id === 8;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#001825] to-[#00395D] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />

      {/* Verified badge */}
      <div className="pt-14 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 bg-success/15 border border-success/30 rounded-full px-3 py-1"
        >
          <Shield size={11} className="text-success" />
          <span className="text-[10px] font-bold text-success uppercase tracking-widest">Verified Barclays Call</span>
        </motion.div>
      </div>

      {/* Avatar + identity */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8">
        <motion.div className="relative">
          {/* Pulsing rings for incoming */}
          {isIncoming && [1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-brand-cyan/25"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1 + i * 0.38, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.55 }}
            />
          ))}
          <div className="w-24 h-24 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan/40 flex items-center justify-center text-3xl font-bold text-brand-cyan">
            {colleague.initials}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center border-2 border-[#001825]">
            <CheckCircle size={14} className="text-white" />
          </div>
        </motion.div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">{colleague.name}</h2>
          <p className="text-sm text-brand-cyan/80 mt-0.5">{colleague.role}</p>
          {!isIncoming && (
            <p className="text-xs text-white/40 mt-1">Call Active</p>
          )}
        </div>

        {/* Reason for call */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="w-full bg-white/[0.07] border border-white/10 rounded-2xl p-4"
        >
          <p className="text-[10px] uppercase tracking-widest text-brand-cyan/60 font-bold mb-1.5">Reason for call</p>
          <p className="text-sm font-semibold text-white">{colleague.reason}</p>
        </motion.div>

        {/* Connected: secure session indicator */}
        {!isIncoming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-full px-4 py-2"
          >
            <Lock size={12} className="text-success" />
            <span className="text-[11px] text-success font-semibold">Secure WebRTC Session Active</span>
          </motion.div>
        )}

        {/* Incoming: sub-label */}
        {isIncoming && (
          <p className="text-[11px] text-white/35 text-center leading-relaxed">
            Calling via secure in-app channel<br />
            <span className="text-brand-cyan/50">Identity verified by Barclays</span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="pb-12 px-8">
        {isIncoming ? (
          <div className="flex justify-center gap-20">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30">
                <PhoneOff size={26} />
              </div>
              <span className="text-xs text-white/50">Decline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/30"
              >
                <Phone size={26} />
              </motion.div>
              <span className="text-xs text-white/50">Answer</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center"><Mic size={22} /></div>
              <span className="text-[10px] text-white/50">Mute</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30"><PhoneOff size={26} /></div>
              <span className="text-[10px] text-white/50">End</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center"><MessageSquare size={22} /></div>
              <span className="text-[10px] text-white/50">Message</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
