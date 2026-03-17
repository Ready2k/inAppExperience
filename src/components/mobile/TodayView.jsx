import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { Phone, PhoneOff, Mic, X, ChevronRight, Search, Menu, MessageSquare, Headphones, ShieldQuestion } from 'lucide-react';
import { TransactionScreen } from './TransactionScreen';

const DialerOverlay = ({ onComplete }) => {
  const [digits, setDigits] = useState('');
  const targetDigits = '3928104572'; // The 10-digit DTMF key

  useEffect(() => {
    let current = '';
    const interval = setInterval(() => {
      if (current.length < targetDigits.length) {
        current += targetDigits[current.length];
        setDigits(current);
        // We could play a beep sound here if we had assets
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 2000);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/90 z-[90] flex flex-col items-center justify-center p-8 text-white"
    >
      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-8">
        <Phone size={32} />
      </div>
      <h2 className="text-xl font-bold mb-2">0345 734 5345</h2>
      <p className="text-slate-400 text-sm mb-12">Calling Barclays...</p>
      
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Sending ID Key</span>
        <div className="flex gap-2 h-8 items-center">
          {digits.split('').map((d, i) => (
            <motion.span 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-mono text-brand-cyan"
            >
              {d}
            </motion.span>
          ))}
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-[2px] h-6 bg-brand-cyan"
          />
        </div>
      </div>

      <div className="absolute bottom-20 flex gap-8">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center"><Mic size={24} /></div>
          <span className="text-[10px]">Mute</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30"><PhoneOff size={24} /></div>
          <span className="text-[10px]">End</span>
        </div>
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center"><X size={24} /></div>
          <span className="text-[10px]">Keypad</span>
        </div>
      </div>
    </motion.div>
  );
};

export const TodayView = ({ scene: propsScene }) => {
  const { currentScene: contextScene } = useDemo();
  const currentScene = propsScene || contextScene;
  const [overlayActive, setOverlayActive] = useState(false);

  useEffect(() => {
    if (currentScene.id === 2) setOverlayActive(true);
    else if (currentScene.id > 2) setOverlayActive(false);
  }, [currentScene.id]);

  // Support/Contact Us Screen (Scene 2)
  if (currentScene.id === 1) {
    return (
      <div className="flex flex-col h-full bg-[#F3F4F6]">
        <div className="bg-brand-blue pt-12 pb-6 px-6 text-white rounded-b-[24px]">
          <h1 className="text-lg font-bold">Help & Support</h1>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-2">Search FAQs</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="I have a suspicious transaction" className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm border-none outline-none" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Other ways to contact us</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><MessageSquare size={20} /></div>
                  <span className="text-sm font-bold">Chat to us</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center justify-between p-4 bg-brand-cyan/5 border-2 border-brand-cyan/20 rounded-xl cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cyan text-white flex items-center justify-center"><Phone size={20} /></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Call Us (In-app)</span>
                    <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-tighter">Fastest Way</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-brand-cyan" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Waiting / ID&V Screen (Scene 4 & 5)
  if (currentScene.id === 3 || currentScene.id === 4) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white p-12 items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-slate-700 border-t-brand-cyan animate-spin mb-12" />
        <h2 className="text-2xl font-bold mb-4">On Hold</h2>
        <p className="text-center text-slate-400 text-sm leading-relaxed mb-12">
          "Welcome to Barclays. Please state your account number or use your keypad to identify yourself..."
        </p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-[240px]">
          <div className="p-4 bg-white/5 rounded-2xl flex flex-col items-center gap-2">
            <ShieldQuestion size={24} className="text-warning" />
            <span className="text-[10px] uppercase font-bold text-white/60">ID&V Incomplete</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex flex-col items-center gap-2">
            <Headphones size={24} className="text-slate-400" />
            <span className="text-[10px] uppercase font-bold text-white/60">Estimated: 5m</span>
          </div>
        </div>
        <div className="mt-20 w-16 h-16 rounded-full bg-error flex items-center justify-center"><PhoneOff size={28} /></div>
      </div>
    );
  }

  // Final Call View (Scene 6 & 7)
  if (currentScene.id === 5 || currentScene.id === 6) {
    return (
      <div className="flex flex-col h-full bg-slate-800 text-white p-6">
        <div className="mt-20 flex-1 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-600 flex items-center justify-center overflow-hidden">
             <Headphones size={48} className="text-slate-400" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">Barclays Customer Service</h2>
            <p className="text-sm text-slate-400">Call Active • 04:12</p>
          </div>
          <div className="mt-12 bg-white/5 border border-white/10 p-4 rounded-xl text-center w-full">
            <p className="text-xs italic text-slate-400">"I'm sorry, who am I speaking with? And what was the reason for your call?"</p>
          </div>
        </div>
        <div className="pb-12 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg"><PhoneOff size={28} /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TransactionScreen mode="today" />
      {overlayActive && <DialerOverlay onComplete={() => setOverlayActive(false)} />}
    </>
  );
};
