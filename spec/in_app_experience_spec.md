# inAppExperience - Build Spec

## 1. Project Goal
Build a polished front-end demo repo called **inAppExperience** that evolves the ideas from `futureDemo` into a new experience focused on **in-app calling via WebRTC**, **multimodal AI support**, and **seamless handoff between chat, voice, and human escalation**.

This is **not** production banking software. It is a strategic interactive demo for stakeholders that shows how a Barclays-style mobile banking app could move from today's fragmented support journey to an AI-native in-app support and servicing experience.

The demo should make one core point very clearly:

> Customers should not need to leave the app, repeat themselves, or choose between channels.
> The app should support a single continuous session across UI, chat, voice, AI, and human support.

## 2. What This Demo Must Prove
The demo should visually and interactively demonstrate that **in-app WebRTC support with AI agents** is:

- faster than traditional call-centre journeys
- easier for customers than navigating contact menus
- context-aware because the app already knows the user session
- multimodal, allowing customers to speak, type, and tap in one session
- better for handoff because AI can transfer context to a human without re-authentication or repetition
- more strategically valuable for the bank because the bank remains the trusted execution and service layer even if interfaces become AI-driven

## 3. Reference / Inspiration
Use the existing repo `finTechDemo` as the design and storytelling reference, especially:

- presenter-led interactive flow
- polished React/Vite front-end demo style
- deterministic demo scenes rather than live backend dependence
- scene-by-scene narrative for stakeholders
- optional compare mode showing “Today” versus “Future”
- animated mobile-first visual storytelling

However, **do not just clone futureDemo**. This new repo should be a fresh implementation with a new scenario, new scene architecture, and a stronger focus on support/contact journeys, voice, WebRTC, AI servicing, and escalation.

## 4. Audience
Primary audience:

- banking product leadership
- contact centre leadership
- architecture stakeholders
- AI strategy stakeholders
- operations / servicing stakeholders
- executives evaluating the future of in-app service and support

Secondary audience:

- designers
- engineers
- demo presenters
- innovation teams

## 5. Product Narrative
### Today
In the current model, the customer:
- opens the banking app
- tries to find help or contact us
- navigates menus and categories
- often leaves the app to make a phone call
- repeats authentication and issue details
- gets disconnected from the original app context
- experiences fragmented service between app, chat, telephony, and human support

### Future
In the future model, the customer:
- stays inside the app
- starts voice or chat support instantly
- talks to an AI agent over in-app WebRTC audio
- can switch naturally between chat and voice within one live session
- benefits from context-aware help because the AI already knows the customer state, current screen, intent, and journey
- escalates seamlessly to a human when needed, with a full context package handed over automatically
- never has to start again

## 6. Demo Experience Principles
The demo must feel:

- premium
- believable
- fast
- visually clear for non-technical stakeholders
- deterministic enough to always work in a meeting
- realistic enough to feel like a future production direction

The experience should feel closer to an Apple-grade concept demo than a hackathon prototype.

## 7. Technical Scope
Build a **front-end only** demo first.

### Core stack
- React 19
- Vite
- Framer Motion
- modern CSS or CSS modules
- no backend required for v1
- no real banking APIs
- no real WebRTC media stack required for v1

### Important
Actual real-time WebRTC transport does **not** need to be implemented for the first demo build.
Instead, simulate the experience of WebRTC calling and AI session orchestration with deterministic UI states, timers, event flows, and fake transcripts.

The app should be architected so that real integrations could be layered in later.

## 8. Repo Name
`inAppExperience`

## 9. High-Level Story
The demo tells the story of a customer who spots a suspicious card transaction and needs support.

The current-state journey shows the pain:
- searching for help
- finding contact us
- channel switching
- re-authentication
- long call setup
- repeating the issue
- broken continuity

The future-state journey shows the better model:
- tap “Talk to us” or “Ask AI” in app
- start in-app voice session instantly
- AI already sees recent card activity and screen context
- AI confirms suspicious transaction details in natural conversation
- AI can also send supporting chat cards while voice continues
- AI can freeze the card, raise a dispute, order a replacement, and provide reassurance
- if needed, human specialist joins with full transcript and action history

## 10. Core Demo Modes
Implement these modes:

### A. Today Mode
Simulates current fragmented support journey.

### B. Future Mode
Simulates in-app AI + WebRTC journey.

### C. Compare Mode
Optional but strongly preferred.
Side-by-side comparison between Today and Future, with a centre insight panel summarising the key difference in each scene.

## 11. Channel Presentation Model
The demo should explicitly present the two sides of the journey using different device metaphors:

### Customer View
- The customer experience must be shown inside a **mobile phone frame** just like the `futureDemo` / fintech-style demo.
- This is the primary hero surface for the demo.
- The customer stays in the banking app throughout the Future journey.

### Colleague View
- The human colleague / agent experience must be shown inside a **desktop monitor or workstation frame** representing a contact-centre computer.
- This should not feel like a consumer UI.
- It should feel like an internal servicing desktop with a clean operational layout.

### Agent Desktop Design Direction
The colleague desktop should include:
- a simple clean top toolbar inspired by Amazon Connect-style agent controls
- a clear status area showing call/chat state
- a compact contact control area
- a simple CRM / servicing panel that receives the AI handoff
- transcript and action history visibility
- minimal clutter, not a dense enterprise horror show

The visual message should be:
- customer gets a clean elegant mobile experience
- colleague gets a practical efficient desktop experience with the right context already loaded

This dual-surface storytelling is important because the demo is not only about customer convenience. It is also about better human servicing when AI hands over.

## 12. Demo Scenes
Use a scene-based architecture similar in spirit to futureDemo, but tailored to this new narrative.

Recommended scenes:

### Scene 0 - Entry / Account Activity
Customer is in the app reviewing recent transactions.
A suspicious card payment is visible.

**Today:** user sees the charge and looks for help manually.
**Future:** user sees the charge and can immediately tap an in-context “Talk to AI” or “Resolve now” action.

### Scene 1 - Finding Support
**Today:** customer opens help/contact us and navigates menus.
Show friction and uncertainty.

**Future:** contextual support entry is available directly from the suspicious transaction card or sticky support control.

### Scene 2 - Contact Initiation
**Today:** customer must choose between chat, FAQ, or calling. Tapping call exits the app feel and starts a waiting flow.

**Future:** customer starts an in-app voice session using a WebRTC-style call sheet. No dialer. No context loss.

### Scene 3 - Session Establishment
**Today:** IVR / holding / generic greeting / authentication prompts.

**Future:** AI agent joins instantly and already knows:
- authenticated session exists
- current page is card transactions
- suspicious payment selected
- customer likely intent is dispute / freeze card / reassurance

### Scene 4 - Multimodal AI Interaction
**Future only focus scene, but Today can show poor equivalent.**
The customer speaks naturally.
The AI responds with voice and supporting on-screen chat cards.
Examples:
- “I can see the £67.49 charge at X. Do you want me to freeze the card while we review it?”
- customer speaks back
- AI updates chat transcript and action state

This is the centrepiece of the whole demo.

### Scene 5 - Resolution Actions
AI can perform deterministic mock actions such as:
- freeze card
- start dispute
- block merchant
- request replacement card
- surface temporary card / wallet advice

Today mode shows how these actions would be fragmented or deferred.

### Scene 6 - Human Handoff
If escalation is required:
- AI summarises the issue
- human specialist joins without losing context
- transcript, action history, auth state, issue summary, and recommended next steps are preloaded

This scene should clearly show why handoff is better than traditional escalation.

### Scene 7 - Platform / Architecture Overlay
End with a strategic overlay showing:
- customer experience benefits
- operational benefits
- architecture view
- AI orchestration layer
- in-app WebRTC channel
- policy / guardrail layer
- human handoff layer
- audit / transcript / observability layer

## 13. Key Features to Build
### Presenter Controls
Top-level presenter bar with:
- play / pause autoplay
- next / previous scene
- scene selector
- reset demo
- mode toggle: Today / Future
- compare mode toggle
- dark / light mode toggle
- optional speed control for autoplay

### Customer Mobile Frame
Render the customer experience inside a realistic phone shell or mobile frame.
Prefer a clean iPhone-like frame, but avoid trademark-heavy details.
This should remain visually close to the premium mobile storytelling style used in `futureDemo`.

### Colleague Desktop Frame
Render the human agent experience inside a desktop monitor / workstation frame.
This should visually contrast with the mobile device and clearly signal an internal colleague tool.
The colleague desktop should feel light, modern, and operational.

### Agent Toolbar
The desktop UI should include a simple, clean toolbar inspired by Amazon Connect patterns, such as:
- agent availability state
- active contact indicator
- mute / hold / transfer style controls
- elapsed interaction timer
- channel badge for voice/chat/AI-assist

Do not overcomplicate this. Keep it elegant and easy to understand for stakeholders.

### Simple CRM / Handoff Workspace
The desktop should include a simple CRM-style panel showing the handoff package from AI to human.
This should include:
- customer summary
- issue summary
- authentication state
- suspicious transaction context
- actions already completed by AI
- recommended next action
- live transcript or transcript excerpt

This CRM should look intentionally simplified for demo purposes, but credible enough to represent a real servicing desktop.

### Mobile Device Frame
Render the demo inside a realistic phone shell or mobile frame.
Prefer a clean iPhone-like frame, but avoid trademark-heavy details.

### Contact / Support UI
Need UI patterns for:
- transactions list
- suspicious transaction detail
- contact us/help centre
- in-app call UI
- chat transcript panel
- AI action cards
- escalation / handoff state

### Voice Session UI
Simulate a live in-app call with:
- waveform or pulsing orb
- elapsed time
- AI speaking/listening states
- mute / speaker / end call controls
- transcript snippets
- subtle “connected securely” indicator

### Multimodal Session Layout
During Future mode, voice and chat should coexist.
Options:
- voice call top panel + transcript bottom sheet
- voice overlay over transaction page with AI cards appearing inline
- split conversational panel with mobile-native styling

### Reasoning / Context Drawer
Optional but highly desirable.
A side drawer or floating panel showing what the AI knows, such as:
- authenticated user state
- current screen
- selected transaction
- recent account events
- likely intent
- recommended safe actions
- escalation triggers

This should be presented in a stakeholder-friendly way, not raw chain-of-thought.
Think “context package” or “AI awareness panel,” not exposed internal reasoning.

### Handoff Summary Panel
When escalating, display a concise transfer object such as:
- issue summary
- actions already taken
- customer sentiment / urgency
- transcript excerpt
- auth confidence
- recommended human next step

This handoff object should appear both:
- in the customer journey as reassurance that the context is preserved
- in the colleague desktop / CRM as the starting point for human servicing

## 14. Interaction Model
The experience should support:
- autoplay demo mode for presentations
- manual click-through mode for exploration
- deterministic progression without needing any external service

Avoid any dependency on internet or API availability.
A presenter should be able to run this locally or from static hosting.

## 15. Content / Script Behaviour
Use deterministic scripted messages, not LLM calls.
Create reusable mock scripts for both Today and Future journeys.

### Example Future interaction flow
Customer: “I don’t recognise this transaction.”
AI: “I can help with that. I can see a card payment for £67.49 today at Spotify Digital. Would you like me to freeze your card while we check it?”
Customer: “Yes, freeze it.”
AI: “Done. Your card is frozen. I’ve also started a dispute journey for that transaction. I can keep going here, or bring in a card specialist with all the context.”

### Example Today interaction flow
- User taps help
- user scrolls categories
- user taps contact us
- user chooses call us
- user waits
- generic greeting asks for account details and issue explanation

## 16. Data Model
Create a mock data layer that drives all screens from one source of truth.

Suggested data domains:
- customer profile
- account balances
- recent transactions
- suspicious transaction flag
- card status
- dispute state
- replacement card state
- support session state
- transcript entries
- handoff package

## 17. Architecture Guidance
Use clean modular structure.

Suggested structure:

```text
src/
├── App.jsx
├── data/
│   ├── mockCustomer.js
│   ├── mockTransactions.js
│   ├── demoScenes.js
│   └── mockSupportSession.js
├── context/
│   └── DemoContext.jsx
├── services/
│   ├── sceneEngine.js
│   ├── sessionEngine.js
│   ├── supportIntentEngine.js
│   ├── supportPolicyEngine.js
│   └── handoffComposer.js
├── components/
│   ├── presenter/
│   ├── mobile/
│   ├── support/
│   ├── overlays/
│   └── shared/
├── hooks/
├── styles/
└── utils/
```

### Notes
- `sceneEngine` controls scripted scene progression
- `sessionEngine` simulates AI call/chat session states
- `supportIntentEngine` maps selected moments to support intents
- `supportPolicyEngine` governs allowed actions like freeze card / dispute / escalate
- `handoffComposer` builds the context transfer payload shown to the user

## 18. UX Requirements
### Visual style
- modern banking-app aesthetic
- premium dark/light theme support
- subtle motion
- strong typography hierarchy
- polished microinteractions
- minimal clutter

### Motion
Use Framer Motion for:
- transitions between scenes
- call connection states
- transcript reveal
- AI card expansion
- handoff package animation
- compare mode transitions

### Accessibility
- good contrast
- keyboard accessible presenter controls
- reduced motion fallback where reasonable

## 19. Compare Mode Requirements
When compare mode is enabled:
- show Today and Future side-by-side in synced scene progression
- optionally show a centre panel with one key “Experience Delta” per scene

Examples:
- Scene 1: “Menu hunting vs context-aware entry”
- Scene 2: “Channel switch vs native in-app support”
- Scene 3: “Re-authentication vs persistent trust context”
- Scene 6: “Cold transfer vs context-rich handoff”

## 20. Non-Goals for v1
Do not build:
- real banking backend integration
- real WebRTC transport
- real speech-to-text
- real text-to-speech
- real LLM orchestration
- real identity verification flows
- production security controls

Instead, design the code so those could be plugged in later.

## 21. Design Cues from futureDemo to Reuse Conceptually
Re-use these ideas conceptually from futureDemo:
- scene-led storytelling
- deterministic autopilot
- presenter-friendly controls
- polished mobile simulation
- future-vs-today framing
- architecture overlay as closing payoff

But evolve the concept with:
- a stronger service/support storyline
- voice-first interaction
- in-app call visuals
- live multimodal session design
- explicit AI-to-human handoff storytelling

## 22. Deliverables Expected from Codex
Codex should generate:
- a new Vite React repo
- all app source code
- mock data
- scene orchestration
- polished styles
- README with run instructions
- deterministic demo content
- enough component structure for easy future extension

## 23. README Requirements
The generated repo README should include:
- purpose of the demo
- disclaimer that it is not production banking software
- how to run locally
- how scenes work
- how to customise mock data
- how to present the demo
- future extension ideas like real WebRTC / live AI / handoff integrations

## 24. Acceptance Criteria
The repo is successful if:
- it runs locally with `npm install` and `npm run dev`
- the presenter can demonstrate the full journey without backend services
- the difference between Today and Future is immediately obvious
- the in-app voice + chat AI scene feels compelling and modern
- the handoff scene clearly demonstrates continuity and reduced effort
- the final platform overlay ties the UX back to strategic architecture value

## 25. Stretch Goals
If time allows, add:
- optional fake ringtone / connected audio cues
- transcript auto-scroll
- fake agent sentiment / confidence indicators
- dynamic scene notes for presenter
- exportable “handoff summary card” visual
- architecture diagram toggle
- mobile notification / proactive support entry variant

## 26. Suggested Opening Prompt for Codex
Use this spec to build a complete new repo called `inAppExperience`.
Use the existing `futureDemo` project only as inspiration for overall quality, scene-based storytelling, and presenter-friendly structure.
Do not clone it directly.
Create a fresh React + Vite front-end demo focused on a Barclays-style in-app support journey powered by WebRTC-like in-app calling, multimodal AI servicing, and seamless AI-to-human handoff.
The app must be deterministic, visually polished, frontend-only, and suitable for stakeholder presentations.

## 27. Build Priorities
Priority order:
1. core scene flow works end-to-end
2. Future mode feels excellent
3. Today mode clearly shows friction
4. compare mode works
5. architecture overlay lands the strategic message
6. code is modular enough for future enhancement

## 28. Tone of the Demo
The demo should not feel gimmicky or sci-fi.
It should feel plausible, premium, near-future, and commercially credible.
The right reaction from a stakeholder should be:

> “This feels like something we should actually build.”

