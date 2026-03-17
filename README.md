# inAppExperience — Vision 2028 Demo

A polished front-end demo showcasing a future Barclays-style in-app banking support experience powered by in-app WebRTC calling, multimodal AI servicing, and seamless AI-to-human handoff.

> **Disclaimer**: This is not production banking software. It is a strategic interactive demo for stakeholders. No real banking APIs, real WebRTC transport, or real AI are used. All data, sessions, and interactions are deterministic mock simulations.

---

## How to Run

```bash
npm install
npm run dev       # http://localhost:5173
```

To build for static hosting:

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally at http://localhost:4173
```

---

## How to Present the Demo

Open `http://localhost:5173` in full-screen browser. Use the top presenter bar to control everything:

| Control | Action |
|---|---|
| **← / →** | Previous / next scene |
| **Play/Pause** | Toggle autoplay (15 seconds per scene by default) |
| **Today / Future / Compare** | Switch demo mode |
| **Scene selector** | Jump to any scene directly |
| **1× / 1.5× / 2×** | Autoplay speed multiplier |
| **🔊** | Toggle Web Speech API narration |
| **🧠 Brain** | Toggle AI Context Drawer (visible when session is active) |
| **☀ / ☾** | Toggle dark / light mode |
| **⟳** | Reset demo to Scene 1 |

**Recommended stakeholder flow:**

1. Start in **Compare** mode and advance all 8 scenes — shows the contrast clearly with delta insights between Today and Future.
2. Switch to **Future** mode, jump to Scene 5 (Multimodal Interaction) — this is the centrepiece.
3. Open the **AI Context Drawer** (🧠) to show what the AI knows in real time.
4. Advance to Scene 7 (Human Handoff) to show the colleague desktop receiving the full context package.
5. End on Scene 8 (Architecture Overlay) to land the strategic message.

---

## How Scenes Work

8 scenes tell the full support journey, from spotting a suspicious transaction to AI-assisted resolution and human handoff.

| Scene | Name | Key moment |
|---|---|---|
| 0 | Entry / Account Activity | Suspicious £67.49 Spotify charge flagged |
| 1 | Finding Support | Today: menu hunting. Future: contextual entry |
| 2 | Contact Initiation | Today: PSTN dialler. Future: one-tap WebRTC |
| 3 | Session Establishment | Today: re-authentication. Future: persistent trust |
| 4 | Multimodal Interaction | AI voice + on-screen action cards |
| 5 | Resolution Actions | Card frozen, dispute started, merchant blocked |
| 6 | Human Handoff | Specialist receives full context package |
| 7 | Architecture Overlay | Strategic platform view |

Scene definitions (names, narration, delta insights) live in `src/data/mockData.js`. Each scene has `narration.today` and `narration.future` text for the Web Speech narrator, and a `delta` string for Compare mode's centre panel.

---

## How to Customise Mock Data

All mock data lives in `src/data/`:

- **`mockData.js`** — Customer profile, accounts, transaction list, and scene definitions.
  - To change the flagged transaction: edit the entry with `suspicious: true` in `mockCustomer.recent_transactions`.
  - To change scene narration or delta insights: edit the `demoScenes` array.
- **`demoScripts.js`** — AI dialogue for Scene 4, AI action cards, and the handoff package shown on the colleague desktop in Scene 6.

---

## Architecture

```
src/
├── context/
│   └── DemoContext.jsx          Central state: scene, mode, theme, speed, drawer
├── services/
│   ├── sceneEngine.js           Deterministic scene progression + autoplay
│   ├── sessionEngine.js         WebRTC lifecycle simulation (idle → connecting → active → handoff)
│   ├── supportIntentEngine.js   Maps scene/transaction context to classified support intent
│   ├── supportPolicyEngine.js   Governs permitted AI actions per intent and session state
│   └── handoffComposer.js       Builds the context transfer payload for human handoff
├── components/
│   ├── presenter/               Top presenter controls bar
│   ├── mobile/                  Customer mobile views (TodayView, TransactionScreen)
│   ├── support/                 VoiceSessionUI — in-app call experience
│   ├── colleague/               AgentDesktop — colleague handoff workspace
│   ├── overlays/                ArchitectureOverlay, ContextDrawer
│   └── shared/                  MobileFrame, DesktopFrame device containers
├── hooks/
│   └── useSessionTimer.js       Elapsed session time hook (MM:SS)
├── utils/
│   └── formatters.js            Currency, date, and confidence formatters
└── data/
    ├── mockData.js              Customer, accounts, transactions, scene definitions
    └── demoScripts.js           Scripted dialogue and handoff package
```

---

## Future Extension Ideas

- **Real WebRTC transport**: Replace `sessionEngine.js` simulation with a real `RTCPeerConnection`. The state machine (`idle → connecting → active → handoff`) maps directly to WebRTC lifecycle events.
- **Live AI responses**: Replace `demoScripts.js` dialogue with streaming Claude/GPT completions. `supportIntentEngine.js` already classifies intents that can seed a system prompt.
- **Real handoff**: Replace `handoffComposer.js` mock output with a real context package pushed to a CRM or contact-centre platform (Salesforce, Genesys, Amazon Connect Task).
- **Real speech**: Replace Web Speech API narration with Amazon Polly or ElevenLabs for consistent, high-quality TTS.
- **Proactive entry**: Add a push-notification / in-app banner variant for Scene 0 — AI proactively flags the transaction before the customer opens the app.
- **Analytics**: Each scene transition and AI action is a natural event to instrument for demo telemetry and stakeholder replay.
