# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**inAppExperience** is a fully client-side React demo showcasing a "Vision 2028" in-app banking assistant. It presents an 8-scene narrative contrasting legacy PSTN-based banking support with an AI-native, WebRTC-powered in-app calling experience. Designed for conference/pitch presentations.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Serve dist/ locally
npm run lint      # ESLint check
```

No test suite — this is a demo project.

## Architecture

### State Management

All demo state lives in `src/context/DemoContext.jsx` via React Context. Key state:
- `currentScene` (0–7) — which scene is active
- `demoMode` — `'today'` | `'future'` | `'compare'` (side-by-side)
- `isPlaying` — auto-advance every 15s
- `sessionState` — WebRTC lifecycle simulation (`idle → connecting → active → handoff`)
- `darkMode` — applies `data-theme="dark|light"` to `document.documentElement`
- `playbackSpeed` — multiplier passed to `SceneEngine.setSpeed()`
- `contextDrawerOpen` — controls the AI Context Drawer visibility

Access via `useDemo()` hook throughout the component tree.

The `SceneEngine` and `SessionEngine` are each created once via `useRef` and never re-instantiated. Callbacks into React state use stable mutable refs (`narratorEnabledRef`, `setCurrentSceneRef`) updated via `useEffect`, avoiding stale closures without triggering re-creation of the engines. `currentAudioRef` tracks the active Polly MP3 `Audio` object so it can be stopped on scene change, narrator toggle, or reset.

### Scene Engine (`src/services/sceneEngine.js`)

Deterministic scene flow controller. Reads scene definitions from `src/data/mockData.js` and triggers narration based on the active `demoMode`. Auto-advances when `isPlaying` is true. Calls `onNarrationTrigger(text, sceneIndex, mode)` — `DemoContext` uses this to play `public/narration/{mode}/scene{N}.mp3` (Amazon Polly, Amy Neural), falling back to Web Speech API if the file is absent.

### Narration Audio

Pre-generated MP3s live in `public/narration/{today,future,compare}/scene{0-7}.mp3`. To regenerate after changing narration text in `mockData.js`:

```bash
bash scripts/generate-narration-ssml.sh   # requires AWS CLI + Polly access (eu-west-1)
```

The script outputs SSML with `<sub alias>` pronunciations for WebRTC, PSTN, and UI. Compare-mode files narrate the scene's delta insight rather than either side's full narration.

### Services Layer

- `src/services/supportIntentEngine.js` — Maps `(sceneId, suspiciousTransaction)` to a classified intent with confidence score and signals array
- `src/services/supportPolicyEngine.js` — Returns permitted AI actions `{ id, label, risk }` per intent + session state
- `src/services/handoffComposer.js` — Builds the context transfer payload for AI-to-human handoff (customer, transaction, actions taken, recommended next step, transcript excerpt)
- `src/hooks/useSessionTimer.js` — `useSessionTimer(sessionState)` → elapsed MM:SS string, starts on `'active'`/`'handoff'`, resets on `'idle'`
- `src/utils/formatters.js` — `formatCurrency`, `formatShortDate`, `formatConfidence`, `capitalise`

The `ContextDrawer` (`src/components/overlays/ContextDrawer.jsx`) consumes all three services to render the AI Awareness Panel — visible when `contextDrawerOpen` is true in `DemoContext`.

### Data Layer

- `src/data/mockData.js` — Mock customer (Joe, profile 7829-XJ-1), accounts, transactions, and 8 scene definitions with `today`/`future` narration variants and delta insights
- `src/data/demoScripts.js` — Scene-specific dialogue, AI action cards, and the handoff intelligence package (Scene 6)

### Component Structure

```
App.jsx
├── DemoProvider
├── PresenterControls       # Top bar: playback, mode toggle, scene selector, narrator
└── MainExperience
    ├── TodayView           # Legacy dialer, help menu, call waiting (src/components/mobile/)
    ├── TransactionScreen   # Account activity, flagged transaction, AI trigger
    ├── VoiceSessionUI      # Secure badge, avatar, waveform, multimodal cards (src/components/support/)
    ├── AgentDesktop        # Colleague handoff intelligence panel (src/components/colleague/)
    └── ArchitectureOverlay # Scene 7: WebRTC vs PSTN strategic diagram (src/components/overlays/)
```

Device containers (`MobileFrame` 390×844px, `DesktopFrame` 1200×800px) wrap views in `src/components/shared/`.

### Styling

- **Tailwind CSS via CDN** (not npm) — configured inline in `index.html`
- Custom brand colors: `brand-blue` (#00395D), `brand-cyan` (#00AEEF)
- **Framer Motion** for all transitions, waveform animations, pulsing highlights
- Compare mode scales both frames to 0.8 for side-by-side fit

### Today Mode Scene Mapping

`TodayView` renders different screens per `currentScene.id`:

| Scene id | Screen |
|----------|--------|
| 0 | `TransactionScreen` (account activity — default fallback) |
| 1 | Help & Support menu |
| 2 | `DialerOverlay` (ringing → DTMF dialling → "Connecting to IVR...") |
| 3 | In IVR — spinning ring + IVR welcome prompt |
| 4 | Call Steering — 12-key DTMF keypad + prompt text |
| 5 | On Hold — ID&V Incomplete + Estimated: 5m |
| 6 | Agent connected — agent greets "Hi Joe, how can I help you today?" |
| 7 | `TransactionScreen` (strategic overlay scene) |
| 8 | Incoming PSTN call (unknown number, "Potential Spam") |
| 9 | Connected PSTN call (unverified, "Caller identity unverified") |

Scenes 8 and 9 demonstrate **secure outbound calling** (colleague → customer). Today mode shows a native-phone PSTN call from an unrecognised number with a "Potential Spam" warning. Future mode renders `SecureOutboundScreen` — an in-app verified call showing Jane Smith's name, role, and reason ("Update on reference BF12345678") with a green "Verified Barclays Call" badge before and during the call.

The `DialerOverlay` is controlled by `overlayActive` state in `TodayView`. It activates on `currentScene.id === 2` and deactivates when `id > 2` (never self-dismisses). It synthesizes a UK ring tone (400Hz + 450Hz burst pattern) and standard DTMF tones using the Web Audio API, with no external audio assets.

### Today Mode — In-App DTMF Dialling Accuracy

The demo depicts Scenario A: the customer calls via the in-app dialler. DTMF passes Name, Intent, ID&V flag, and Classification to the colleague — but this is fragile: the transfer can be interrupted, the customer does not know what the digits represent, and a single accidental key press corrupts the match. `AgentDesktop` today mode shows a split panel: "Partial Context Received" (green) vs "Not Available — Must Re-capture Manually" (red). The agent is shown knowing Joe's name because DTMF passed it.

### Audio Race Condition

When scenes change quickly, `audio.play()` on the first scene may be interrupted and reject. The `catch` handler in `DemoContext` guards against starting TTS fallback if a newer audio object has already taken over: `if (currentAudioRef.current !== audio) return;`. Do not remove this guard.

### Key Constraints

- No backend, no API calls — all data is hardcoded mock data
- No TypeScript — pure JavaScript + JSX
- No routing library — all navigation is component state
- Tailwind is CDN-based, not part of the build pipeline
