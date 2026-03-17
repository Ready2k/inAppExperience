import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { demoScenes, mockCustomer } from '../data/mockData';
import { SceneEngine } from '../services/sceneEngine';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState(demoScenes[0]);
  const [demoMode, setDemoMode] = useState('future');
  const [isPlaying, setIsPlaying] = useState(false);
  const [narratorEnabled, setNarratorEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionState, setSessionState] = useState('idle');
  const [darkMode, setDarkMode] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [contextDrawerOpen, setContextDrawerOpen] = useState(false);

  // Mutable refs for values used inside engine callbacks.
  // Updated via effects, not during render.
  const narratorEnabledRef = useRef(narratorEnabled);
  const setCurrentSceneRef = useRef(setCurrentScene);

  useEffect(() => {
    narratorEnabledRef.current = narratorEnabled;
    if (!narratorEnabled) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  }, [narratorEnabled]);
  useEffect(() => { setCurrentSceneRef.current = setCurrentScene; }, []);

  // Track the currently playing narration audio so we can stop it on scene change.
  const currentAudioRef = useRef(null);

  // Engine is created once; callbacks delegate via stable refs so we never
  // need to re-construct the engine when state changes.
  const sceneEngineRef = useRef(new SceneEngine(
    demoScenes,
    (scene) => setCurrentSceneRef.current(scene),
    (text, sceneIndex, mode) => {
      if (!narratorEnabledRef.current) return;

      // Stop any currently playing narration.
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        // eslint-disable-next-line react-hooks/immutability
        currentAudioRef.current = null;
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();

      // Try the pre-generated MP3 first; fall back to Web Speech API.
      const audio = new Audio(`/narration/${mode}/scene${sceneIndex}.mp3`);
      currentAudioRef.current = audio;
      audio.play().catch(() => {
        // File not found or autoplay blocked — use Web Speech API.
        currentAudioRef.current = null;
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  ));

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying(prev => {
      const next = !prev;
      if (next) sceneEngineRef.current.start();
      else sceneEngineRef.current.stop();
      return next;
    });
  }, []);

  const nextScene = useCallback(() => sceneEngineRef.current.next(), []);
  const prevScene = useCallback(() => sceneEngineRef.current.prev(), []);
  const jumpToScene = useCallback((index) => sceneEngineRef.current.jumpTo(index), []);

  const changeMode = useCallback((mode) => {
    setDemoMode(mode);
    sceneEngineRef.current.setMode(mode);
  }, []);

  const resetDemo = useCallback(() => {
    setIsPlaying(false);
    sceneEngineRef.current.stop();
    sceneEngineRef.current.jumpTo(0);
    setSessionState('idle');
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      // eslint-disable-next-line react-hooks/immutability
      currentAudioRef.current = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const toggleContextDrawer = useCallback(() => setContextDrawerOpen(prev => !prev), []);

  const updatePlaybackSpeed = useCallback((speed) => {
    setPlaybackSpeed(speed);
    sceneEngineRef.current.setSpeed(speed);
  }, []);

  // Update time for phone status bar
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
    darkMode,
    toggleDarkMode,
    playbackSpeed,
    setPlaybackSpeed: updatePlaybackSpeed,
    contextDrawerOpen,
    toggleContextDrawer,
    toggleAutoPlay,
    nextScene,
    prevScene,
    jumpToScene,
    changeMode,
    resetDemo,
    customer: mockCustomer,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within a DemoProvider');
  return context;
};
