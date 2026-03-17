import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoProvider, useDemo } from './context/DemoContext';
import { PresenterControls } from './components/presenter/PresenterControls';
import { MobileFrame } from './components/shared/MobileFrame';
import { DesktopFrame } from './components/shared/DesktopFrame';
import { TransactionScreen } from './components/mobile/TransactionScreen';
import { VoiceSessionUI } from './components/support/VoiceSessionUI';
import { TodayView } from './components/mobile/TodayView';
import { AgentDesktop } from './components/colleague/AgentDesktop';
import { ArchitectureOverlay } from './components/overlays/ArchitectureOverlay';
import { ContextDrawer } from './components/overlays/ContextDrawer';
import { demoScripts } from './data/demoScripts';
import { demoScenes } from './data/mockData';

const ContainerLayout = ({ children, title, description }) => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary">{title}</span>
    {description && (
      <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-[220px] italic">
        {description}
      </p>
    )}
    {children}
  </div>
);

const SceneContent = ({ scene, mode, side }) => {
  // Logic to determine which UI to show inside the phone
  const showCallUI = scene.id >= 2 && scene.id <= 6;
  const isFuture = side === 'future' || mode === 'future';

  if (isFuture) {
    if (showCallUI) return <VoiceSessionUI />;
    return <TransactionScreen />;
  }

  // Legacy (Today) View
  return <TodayView scene={scene} />;
};

// No longer capped, allowing comparison for all scenes.

const MainExperience = () => {
  const { currentScene, demoMode, setSessionState } = useDemo();

  const isCompare = demoMode === 'compare';
  const showHandoff = currentScene.id === 6;
  const showArch = currentScene.id === 7;

  const compareScene = currentScene;

  // Handle Session States based on Scene
  useEffect(() => {
    if (currentScene.id === 2) setSessionState('connecting');
    else if (currentScene.id >= 3 && currentScene.id < 6) setSessionState('active');
    else if (currentScene.id === 6) setSessionState('handoff');
    else setSessionState('idle');
  }, [currentScene.id, setSessionState]);

  return (
    <main className="pt-[60px] h-screen w-screen flex items-center justify-center bg-bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        {!isCompare ? (
          <motion.div 
            key={`scene-${currentScene.id}-${demoMode}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex items-center justify-center w-full h-full"
          >
            {showHandoff ? (
              <div className="flex items-center gap-12 scale-[0.85]">
                <ContainerLayout title="Customer Mobile">
                  <MobileFrame>
                    <SceneContent scene={currentScene} mode={demoMode} />
                  </MobileFrame>
                </ContainerLayout>
                <div className="flex flex-col items-center gap-2">
                   <div className="h-0.5 w-12 bg-success/40" />
                   <span className="text-[10px] text-success font-bold uppercase">Handoff</span>
                </div>
                <ContainerLayout title="Colleague Desktop">
                  <DesktopFrame>
                    <AgentDesktop 
                      handoffData={demoScripts[6].handoffPackage} 
                      todayMode={demoMode === 'today'}
                    />
                  </DesktopFrame>
                </ContainerLayout>
              </div>
            ) : showArch ? (
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="w-full flex justify-center"
               >
                 <ArchitectureOverlay />
               </motion.div>
            ) : (
              <MobileFrame>
                <SceneContent scene={currentScene} mode={demoMode} />
              </MobileFrame>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`compare-${compareScene.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center w-full h-full"
          >
            {showArch ? (
              <motion.div 
                key="arch-compare"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex justify-center -mt-10"
              >
                <ArchitectureOverlay />
              </motion.div>
            ) : (
              <motion.div
                key={`compare-content-${compareScene.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-12 px-12 scale-[0.8] transform-gpu"
              >
                {compareScene.compareNarrative ? (
                  // Scenes 4–7: per-side narrative layout
                  <>
                    <ContainerLayout
                      title="Today"
                      description={compareScene.compareNarrative.today}
                    >
                      <MobileFrame>
                        <SceneContent scene={compareScene} mode="today" side="today" />
                      </MobileFrame>
                      {showHandoff && (
                        <div className="mt-8 px-5 py-2.5 bg-error/10 border border-error/20 rounded-full shadow-lg shadow-error/5 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
                          <span className="text-[11px] font-extrabold text-error uppercase tracking-[0.15em]">Cold Transfer (Blind)</span>
                        </div>
                      )}
                    </ContainerLayout>

                    <div className="flex flex-col items-center shrink-0">
                      <div className="h-40 w-[1px] bg-brand-cyan/20" />
                      <div className="w-2 h-2 rounded-full bg-brand-cyan/40" />
                      <div className="h-40 w-[1px] bg-brand-cyan/20" />
                    </div>

                    <ContainerLayout
                      title="Future — WebRTC In-App"
                      description={compareScene.compareNarrative.future}
                    >
                      <MobileFrame>
                        <SceneContent scene={compareScene} mode="future" side="future" />
                      </MobileFrame>
                      {showHandoff && (
                        <div className="mt-8 px-5 py-2.5 bg-success/10 border border-success/20 rounded-full shadow-lg shadow-success/5 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          <span className="text-[11px] font-extrabold text-success uppercase tracking-[0.15em]">Warm Handoff (Full Context)</span>
                        </div>
                      )}
                    </ContainerLayout>
                  </>
                ) : (
                  // Scenes 1–3: standard delta-insight layout
                  <>
                    <ContainerLayout title="Today Journey">
                      <MobileFrame>
                        <SceneContent scene={compareScene} mode="today" side="today" />
                      </MobileFrame>
                    </ContainerLayout>

                    <div className="flex flex-col items-center gap-2 max-w-[240px] text-center shrink-0">
                      <div className="h-16 w-[1px] bg-brand-cyan/30" />
                      <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-5 py-2">
                        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-[0.2em]">The Insight</span>
                      </div>
                      <p className="text-sm font-semibold text-white mt-4 italic leading-relaxed">
                        "{compareScene.delta}"
                      </p>
                      <div className="h-16 w-[1px] bg-brand-cyan/30" />
                    </div>

                    <ContainerLayout title="Future Journey">
                      <MobileFrame>
                        <SceneContent scene={compareScene} mode="future" side="future" />
                      </MobileFrame>
                    </ContainerLayout>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

function App() {
  return (
    <DemoProvider>
      <div className="h-screen w-screen overflow-hidden bg-bg-primary text-text-primary">
        <PresenterControls />
        <MainExperience />
        <ContextDrawer />
      </div>
    </DemoProvider>
  );
}

export default App;
