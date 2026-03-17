import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { demoScenes, mockCustomer } from '../data/mockData';
import { SceneEngine } from '../services/sceneEngine';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState(demoScenes[0]);
  const [demoMode, setDemoMode] = useState('future'); // 'today' | 'future' | 'compare'
  const [isPlaying, setIsPlaying] = useState(false);
  const [narratorEnabled, setNarratorEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionState, setSessionState] = useState('idle'); // 'idle' | 'connecting' | 'active' | 'handoff'
  
  const sceneEngineRef = useRef(null);

  const handleNarration = useCallback((text, index) => {
    if (!narratorEnabled) return;
    console.log(`Narration [Scene ${index}]: ${text}`);
    // Web Speech API fallback or pre-recorded MP3 logic will go here
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [narratorEnabled]);

  const handleSceneChange = useCallback((scene) => {
    setCurrentScene(scene);
  }, []);

  if (!sceneEngineRef.current) {
    sceneEngineRef.current = new SceneEngine(demoScenes, handleSceneChange, handleNarration);
  }

  const toggleAutoPlay = useCallback(() => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    if (newState) sceneEngineRef.current.start();
    else sceneEngineRef.current.stop();
  }, [isPlaying]);

  const nextScene = useCallback(() => sceneEngineRef.current.next(), []);
  const prevScene = useCallback(() => sceneEngineRef.current.prev(), []);
  const jumpToScene = useCallback((index) => sceneEngineRef.current.jumpTo(index), []);

  const changeMode = useCallback((mode) => {
    setDemoMode(mode);
    sceneEngineRef.current.setMode(mode);
  }, []);

  // Update time for the phone status bar
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const value = {
    currentScene,
    demoMode,
    isPlaying,
    narratorEnabled,
    setNarratorEnabled,
    currentTime,
    sessionState,
    setSessionState,
    toggleAutoPlay,
    nextScene,
    prevScene,
    jumpToScene,
    changeMode,
    customer: mockCustomer
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within a DemoProvider');
  return context;
};
