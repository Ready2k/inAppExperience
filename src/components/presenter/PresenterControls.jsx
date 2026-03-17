import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX, Monitor, Smartphone, Layout } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { demoScenes } from '../../data/mockData';

export const PresenterControls = () => {
  const { 
    isPlaying, 
    toggleAutoPlay, 
    nextScene, 
    prevScene, 
    jumpToScene, 
    currentScene,
    demoMode,
    changeMode,
    narratorEnabled,
    setNarratorEnabled
  } = useDemo();

  return (
    <div className="fixed top-0 left-0 right-0 h-[60px] glass z-[100] flex items-center justify-between px-6">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-bold">In-App WebRTC Demo</span>
          <span className="text-sm font-bold text-white">Barclays Vision 2028</span>
        </div>
        <div className="h-8 w-[1px] bg-white/10" />
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-success animate-pulse' : 'bg-text-secondary'}`} />
          <span className="text-xs uppercase tracking-tighter text-text-secondary">
            {currentScene.label}
          </span>
        </div>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/5">
        <button onClick={prevScene} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipBack size={18} />
        </button>
        <button 
          onClick={toggleAutoPlay}
          className="w-10 h-10 bg-brand-cyan hover:bg-brand-cyan/80 rounded-full flex items-center justify-center transition-transform active:scale-95"
        >
          {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
        </button>
        <button onClick={nextScene} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipForward size={18} />
        </button>
      </div>

      {/* Right: Mode Toggles & Options */}
      <div className="flex items-center gap-4">
        {/* Mode Selector */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          {['today', 'future', 'compare'].map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${
                demoMode === m ? 'bg-white/20 text-white' : 'text-text-secondary hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Scene Selector */}
        <select 
          onChange={(e) => jumpToScene(Number(e.target.value))}
          value={currentScene.id}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
        >
          {demoScenes.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        {/* Audio Toggle */}
        <button 
          onClick={() => setNarratorEnabled(!narratorEnabled)}
          className={`p-2 rounded-full transition-colors ${narratorEnabled ? 'text-brand-cyan hover:bg-brand-cyan/10' : 'text-text-secondary hover:bg-white/10'}`}
        >
          {narratorEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </div>
  );
};
