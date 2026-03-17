import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX, Sun, Moon, Brain } from 'lucide-react';
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
    setNarratorEnabled,
    darkMode,
    toggleDarkMode,
    playbackSpeed,
    setPlaybackSpeed,
    resetDemo,
    contextDrawerOpen,
    toggleContextDrawer,
    sessionState,
  } = useDemo();

  const barBg   = darkMode ? 'bg-black/40' : 'bg-white/80';
  const border  = darkMode ? 'border-white/5' : 'border-black/10';
  const text    = darkMode ? 'text-white' : 'text-slate-800';
  const subtext = darkMode ? 'text-slate-400' : 'text-slate-500';
  const pill    = darkMode ? 'bg-black/40 border border-white/5' : 'bg-slate-100 border border-black/8';
  const iconBtn = darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5';

  const showDrawerToggle = demoMode !== 'today' && sessionState !== 'idle';

  return (
    <div className={`fixed top-0 left-0 right-0 h-[60px] z-[100] flex items-center justify-between px-6 backdrop-blur-md border-b ${barBg} ${border}`}>
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-bold">In-App WebRTC Demo</span>
          <span className={`text-sm font-bold ${text}`}>Barclays Vision 2028</span>
        </div>
        <div className={`h-8 w-[1px] ${darkMode ? 'bg-white/10' : 'bg-black/10'}`} />
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-success animate-pulse' : darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
          <span className={`text-xs uppercase tracking-tighter ${subtext}`}>
            {currentScene.label}
          </span>
        </div>
      </div>

      {/* Center: Playback Controls */}
      <div className={`flex items-center gap-2 p-1 rounded-full ${pill}`}>
        <button onClick={prevScene} className={`p-2 ${iconBtn} rounded-full transition-colors ${text}`}>
          <SkipBack size={18} />
        </button>
        <button
          onClick={toggleAutoPlay}
          className="w-10 h-10 bg-brand-cyan hover:bg-brand-cyan/80 rounded-full flex items-center justify-center transition-transform active:scale-95"
        >
          {isPlaying ? <Pause size={20} fill="white" color="white" /> : <Play size={20} fill="white" color="white" className="ml-0.5" />}
        </button>
        <button onClick={nextScene} className={`p-2 ${iconBtn} rounded-full transition-colors ${text}`}>
          <SkipForward size={18} />
        </button>
      </div>

      {/* Right: Mode Toggles & Options */}
      <div className="flex items-center gap-3">
        {/* Mode Selector */}
        <div className={`flex p-1 rounded-lg ${pill}`}>
          {['today', 'future', 'compare'].map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${
                demoMode === m
                  ? darkMode ? 'bg-white/20 text-white' : 'bg-white text-slate-800 shadow-sm'
                  : subtext + ' hover:' + text
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
          className={`border rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer ${
            darkMode
              ? 'bg-black/40 border-white/10 text-white'
              : 'bg-white border-black/10 text-slate-800'
          }`}
        >
          {demoScenes.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        {/* Speed Control */}
        <select
          onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
          value={playbackSpeed}
          title="Autoplay speed"
          className={`border rounded-lg px-2 py-1.5 text-xs outline-none cursor-pointer ${
            darkMode
              ? 'bg-black/40 border-white/10 text-white'
              : 'bg-white border-black/10 text-slate-800'
          }`}
        >
          <option value={1}>1×</option>
          <option value={1.5}>1.5×</option>
          <option value={2}>2×</option>
        </select>

        {/* Narrator Toggle */}
        <button
          onClick={() => setNarratorEnabled(!narratorEnabled)}
          title="Toggle narrator"
          className={`p-2 rounded-full transition-colors ${
            narratorEnabled
              ? 'text-brand-cyan hover:bg-brand-cyan/10'
              : subtext + ' ' + iconBtn
          }`}
        >
          {narratorEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Context Drawer Toggle — visible when session is active in future/compare mode */}
        {showDrawerToggle && (
          <button
            onClick={toggleContextDrawer}
            title="AI context drawer"
            className={`p-2 rounded-full transition-colors ${
              contextDrawerOpen
                ? 'text-brand-cyan bg-brand-cyan/10'
                : subtext + ' ' + iconBtn
            }`}
          >
            <Brain size={18} />
          </button>
        )}

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          title="Toggle dark/light mode"
          className={`p-2 rounded-full transition-colors ${subtext} ${iconBtn}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Reset */}
        <button
          onClick={resetDemo}
          title="Reset demo to Scene 1"
          className={`p-2 rounded-full transition-colors ${subtext} ${iconBtn}`}
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};
