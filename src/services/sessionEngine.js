/**
 * sessionEngine.js
 * Simulates the lifecycle of a WebRTC session.
 */

export class SessionEngine {
  constructor(onStateChange) {
    this.onStateChange = onStateChange;
    this.state = 'idle'; // 'idle' | 'connecting' | 'active' | 'handoff'
  }

  startSession() {
    this.setState('connecting');
    setTimeout(() => {
      this.setState('active');
    }, 2000);
  }

  endSession() {
    this.setState('idle');
  }

  triggerHandoff() {
    this.setState('handoff');
  }

  setState(newState) {
    this.state = newState;
    if (this.onStateChange) {
      this.onStateChange(newState);
    }
  }
}
