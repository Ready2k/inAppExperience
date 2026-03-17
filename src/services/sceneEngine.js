/**
 * sceneEngine.js
 * Controls the deterministic flow of the demo scenes.
 */

export class SceneEngine {
  constructor(scenes, onSceneChange, onNarrationTrigger) {
    this.scenes = scenes;
    this.currentIndex = 0;
    this.onSceneChange = onSceneChange;
    this.onNarrationTrigger = onNarrationTrigger;
    this.isPlaying = false;
    this.timer = null;
    this.mode = 'future'; // 'today' | 'future' | 'compare'
  }

  setMode(mode) {
    this.mode = mode;
  }

  start() {
    this.isPlaying = true;
    this.playScene(0);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
  }

  next() {
    if (this.currentIndex < this.scenes.length - 1) {
      this.playScene(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.playScene(this.currentIndex - 1);
    }
  }

  jumpTo(index) {
    if (index >= 0 && index < this.scenes.length) {
      this.playScene(index);
    }
  }

  playScene(index) {
    this.currentIndex = index;
    const scene = this.scenes[index];
    
    // Notify UI
    if (this.onSceneChange) {
      this.onSceneChange(scene);
    }

    // Trigger Narration
    if (this.onNarrationTrigger) {
      const text = this.mode === 'today' ? scene.narration.today : scene.narration.future;
      this.onNarrationTrigger(text, index);
    }

    // Auto-advance logic (can be expanded later)
    if (this.isPlaying) {
      const delay = scene.duration || 15000;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.isPlaying) this.next();
      }, delay);
    }
  }
}
