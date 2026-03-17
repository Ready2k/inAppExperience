import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { Phone, PhoneOff, Mic, X, ChevronRight, Search, Menu, MessageSquare, Headphones, ShieldQuestion } from 'lucide-react';
import { TransactionScreen } from './TransactionScreen';

// DTMF frequency pairs per digit (row freq + col freq)
const DTMF_FREQS = {
  '0': [941, 1336], '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
};

const DialerOverlay = () => {
  // phase: 'ringing' → 'dialling' → 'waiting'
  const [phase, setPhase] = useState('ringing');
  const [digits, setDigits] = useState('');
  const targetDigits = '3928104572';
  const audioCtxRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const playTone = (freqs, startTime, duration) => {
    try {
      const ctx = getCtx();
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch { /* autoplay blocked — silent fallback */ }
  };

  const playRingBurst = useCallback((delayFromNow = 0) => {
    try {
      const ctx = getCtx();
      const t = ctx.currentTime + delayFromNow;
      // UK ring pattern: 400ms on, 200ms off, 400ms on
      playTone([400, 450], t, 0.4);
      playTone([400, 450], t + 0.6, 0.4);
    } catch { }
  }, []);

  const playDTMF = useCallback((digit) => {
    try {
      const ctx = getCtx();
      const freqs = DTMF_FREQS[digit] || [697, 1209];
      playTone(freqs, ctx.currentTime, 0.12);
    } catch { }
  }, []);

  // Phase 1: Ringing — two ring bursts then advance to dialling
  useEffect(() => {
    if (phase !== 'ringing') return;
    playRingBurst(0.1);
    const t2 = setTimeout(() => playRingBurst(), 3200);
    const done = setTimeout(() => setPhase('dialling'), 5800);
    return () => { clearTimeout(t2); clearTimeout(done); };
  }, [phase, playRingBurst]);

  // Phase 2: Dialling — type DTMF digits with tones
  useEffect(() => {
    if (phase !== 'dialling') return;
    let i = 0;
    let current = '';
    const interval = setInterval(() => {
      if (i < targetDigits.length) {
        playDTMF(targetDigits[i]);
        current += targetDigits[i];
        setDigits(current);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase('waiting'), 1200);
      }
    }, 280);
    return () => clearInterval(interval);
  }, [phase, playDTMF]);

  // Cleanup AudioContext on unmount
  useEffect(() => {
    return () => { try { audioCtxRef.current?.close(); } catch { } };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-slate-950 z-[90] flex flex-col items-center justify-center p-8 text-white"
    >
      {/* Phone icon — rings during ringing phase */}
      <motion.div
        animate={phase === 'ringing' ? { rotate: [-8, 8, -8, 8, 0], scale: [1, 1.08, 1] } : {}}
        transition={{ repeat: phase === 'ringing' ? Infinity : 0, duration: 0.6, repeatDelay: 2.4 }}
        className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-8 shadow-2xl"
      >
        <Phone size={32} className={phase === 'ringing' ? 'text-brand-cyan' : 'text-white'} />
      </motion.div>

      <h2 className="text-xl font-bold mb-1">0345 734 5345</h2>

      <AnimatePresence mode="wait">
        {phase === 'ringing' && (
          <motion.div key="ringing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 mt-2"
          >
            <p className="text-slate-400 text-sm">Calling Barclays...</p>
            <div className="flex gap-1.5 mt-1">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-brand-cyan/60"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.4 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {phase === 'dialling' && (
          <motion.div key="dialling" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 mt-6"
          >
            <p className="text-slate-400 text-sm">Connected — Sending ID Key</p>
            <div className="flex gap-[5px] h-9 items-center mt-1 font-mono">
              {digits.split('').map((d, i) => (
                <motion.span key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl text-brand-cyan"
                >
                  {d}
                </motion.span>
              ))}
              <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-[2px] h-6 bg-brand-cyan"
              />
            </div>
          </motion.div>
        )}
        {phase === 'waiting' && (
          <motion.div key="waiting" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 mt-6"
          >
            <p className="text-slate-400 text-sm">Connecting to IVR...</p>
            <div className="w-4 h-4 border-2 border-t-transparent border-white/60 rounded-full animate-spin mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-20 flex gap-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center"><Mic size={24} /></div>
          <span className="text-[10px]">Mute</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30"><PhoneOff size={24} /></div>
          <span className="text-[10px]">End</span>
        </div>
        <div className="flex flex-col items-center gap-2 opacity-30">
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

  // Scene 4: In IVR — welcome prompt, no ID&V boxes
  if (currentScene.id === 3) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white p-12 items-center justify-center gap-8">
        <div className="w-32 h-32 rounded-full border-4 border-slate-700 border-t-brand-cyan animate-spin" />
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-bold">In IVR</span>
          <p className="text-center text-slate-400 text-sm leading-relaxed mt-3">
            "Welcome to Barclays. Please state your account number or use your keypad to identify yourself..."
          </p>
        </div>
        <div className="mt-8 w-16 h-16 rounded-full bg-error flex items-center justify-center"><PhoneOff size={28} /></div>
      </div>
    );
  }

  // Scene 5: Call Steering Menu — plain keypad, audio only (no visual IVR menu)
  if (currentScene.id === 4) {
    const keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white items-center justify-center gap-6 px-8">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-bold">Call Steering</span>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            "Please press a key to tell us why you're calling..."
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full max-w-[200px]">
          {keys.map(k => (
            <div key={k}
              className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl font-semibold text-white/70 select-none"
            >
              {k}
            </div>
          ))}
        </div>
        <div className="w-14 h-14 rounded-full bg-error flex items-center justify-center"><PhoneOff size={26} /></div>
      </div>
    );
  }

  // Scene 6 (id 5): On hold / queuing with ID&V and wait time
  if (currentScene.id === 5) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white p-12 items-center justify-center gap-8">
        <div className="w-28 h-28 rounded-full border-4 border-slate-700 border-t-slate-500 animate-spin" />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1">On Hold</h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest">Waiting for an agent</p>
        </div>
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
        <div className="w-14 h-14 rounded-full bg-error flex items-center justify-center"><PhoneOff size={26} /></div>
      </div>
    );
  }

  // Scene 9 (id 8): Incoming PSTN call — unknown number, unverified caller
  if (currentScene.id === 8) {
    return (
      <div className="flex flex-col h-full bg-slate-950 text-white">
        <div className="pt-14 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Incoming Call</span>
          <div className="flex items-center gap-1.5 bg-warning/15 border border-warning/30 rounded-full px-3 py-1 mt-1">
            <span className="text-[10px] font-bold text-warning uppercase tracking-wider">Potential Spam</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
              <Phone size={36} className="text-slate-400" />
            </div>
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">+44 7911 234567</h2>
            <p className="text-sm text-slate-400 mt-1">Unknown Caller</p>
          </div>
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">Caller identity cannot be verified.<br />This may not be your bank.</p>
          </div>
        </div>
        <div className="pb-12 px-8">
          <div className="flex justify-center gap-20">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30"><PhoneOff size={26} /></div>
              <span className="text-xs text-white/50">Decline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/30"
              >
                <Phone size={26} />
              </motion.div>
              <span className="text-xs text-white/50">Answer</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Scene 10 (id 9): Connected PSTN call — no identity, no context
  if (currentScene.id === 9) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white p-6">
        <div className="mt-16 flex-1 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
            <Phone size={40} className="text-slate-400" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">+44 7911 234567</h2>
            <p className="text-sm text-slate-400">Call Active • 00:47</p>
          </div>
          <div className="mt-2 bg-white/5 border border-white/10 p-4 rounded-xl text-center w-full">
            <p className="text-xs italic text-slate-400">"Hi Joe, this is Barclays calling about your mortgage..."</p>
          </div>
          <div className="flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2">
            <ShieldQuestion size={13} className="text-warning" />
            <span className="text-[11px] text-warning/80">Caller identity unverified</span>
          </div>
        </div>
        <div className="pb-12 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg shadow-error/30"><PhoneOff size={28} /></div>
        </div>
      </div>
    );
  }

  // Scene 7 (id 6): Agent connected — cold transfer, no context
  if (currentScene.id === 6) {
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
          <div className="mt-8 bg-white/5 border border-white/10 p-4 rounded-xl text-center w-full">
            <p className="text-xs italic text-slate-400">"Hi Joe, how can I help you today?"</p>
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
      {overlayActive && <DialerOverlay />}
    </>
  );
};
