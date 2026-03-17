export const mockCustomer = {
  name: "Joe",
  profile_id: "7829-XJ-1",
  accounts: [
    {
      id: "acc_1",
      type: "Current Account",
      name: "Barclays Current",
      balance: 1240.52,
      currency: "GBP",
      is_default: true,
    },
    {
      id: "acc_2",
      type: "Savings Account",
      name: "Everyday Saver",
      balance: 15600.00,
      currency: "GBP",
      rate: 4.75,
    }
  ],
  recent_transactions: [
    {
      id: "tx_1",
      date: "2026-03-17",
      merchant: "Tesco Express",
      amount: -12.45,
      category: "Groceries",
      status: "completed"
    },
    {
      id: "tx_2",
      date: "2026-03-17",
      merchant: "Spotify Digital",
      amount: -67.49,
      category: "Entertainment",
      status: "pending",
      flagged: true,
      suspicious: true,
      description: "UK-SPOT-9283-PREMIUM"
    },
    {
      id: "tx_3",
      date: "2026-03-16",
      merchant: "Shell Petrol",
      amount: -85.12,
      category: "Transport",
      status: "completed"
    },
    {
      id: "tx_4",
      date: "2026-03-15",
      merchant: "Amazon.co.uk",
      amount: -24.99,
      category: "Shopping",
      status: "completed"
    }
  ]
};

export const demoScenes = [
  {
    id: 0,
    name: "Entry / Account Activity",
    label: "Scene 1 of 10: Monitoring Activity",
    delta: "Manual search vs instant awareness",
    narration: {
      today: "Scene one. The customer is reviewing their recent card activity. They spot a transaction they don't recognise — but for now, they are on their own to find a solution.",
      future: "Scene one. As soon as the customer views their activity, the AI-native experience highlights the suspicious spend and offers an immediate, contextual route to resolution."
    }
  },
  {
    id: 1,
    name: "Finding Support",
    label: "Scene 2 of 10: Seeking Help",
    delta: "Menu hunting vs contextual entry",
    narration: {
      today: "Today, resolving an issue means navigating support menus and finding numbers. The app doesn't know what you're looking for.",
      future: "In the future, support isn't a destination — it's a capability that lives where the problem is. One tap starts the journey with full context."
    }
  },
  {
    id: 2,
    name: "Contact Initiation",
    label: "Scene 3 of 10: Starting the Call",
    delta: "Tapping a number vs one-tap WebRTC",
    narration: {
      today: "Choosing to call often means leaving the banking app entirely. The session is broken, and the wait begins.",
      future: "Tapping 'Talk to AI' starts a secure WebRTC voice session instantly. No dialers, no menus, no wait."
    }
  },
  {
    id: 3,
    name: "Session Establishment",
    label: "Scene 4 of 10: Secure Handshake",
    delta: "Re-authentication vs persistent trust",
    compareNarrative: {
      today: "With in-app dialling today, DTMF attempts to pass basic identity data — but it's fragile. The transfer can be interrupted mid-stream, the customer has no idea what the digits represent, and a single accidental key press during the transfer corrupts the match entirely. If it fails, all context is lost and the customer is treated as an unknown external caller.",
      future: "Now with WebRTC In-App calling — the customer's authenticated app session metadata is passed silently and reliably in the background. No DTMF, no risk of corruption, no repeated security questions."
    },
    narration: {
      today: "The phone call starts with basic security questions. You have to prove who you are, even though you were just in the secure app.",
      future: "Because the call is initiated inside the authenticated app, the existing session metadata — device fingerprint, app authentication state, and customer context — confirms identity automatically behind the scenes. No security questions, no IVR. The session carries forward instantly."
    }
  },
  {
    id: 4,
    name: "Multimodal Interaction",
    label: "Scene 5 of 10: Multimodal AI Support",
    delta: "Voice-only vs Voice + Co-pilot UI",
    compareNarrative: {
      today: "Today, the call is voice-only — the agent works blind with no visibility of what the customer sees, and no transaction data in context.",
      future: "With WebRTC In-App calling, voice and on-screen co-pilot UI combine — the AI surfaces the flagged transaction and action cards in real time as the customer speaks."
    },
    narration: {
      today: "Traditional calls are voice-only. You can't see what the agent sees, and they can't show you the data easily.",
      future: "This is the multimodal copilot. While you speak, the AI surfaces interactive cards and data on-screen, combining the speed of voice with the clarity of UI."
    }
  },
  {
    id: 5,
    name: "Resolution Actions",
    label: "Scene 6 of 10: Real-time Resolution",
    delta: "Instructional vs Executional AI",
    compareNarrative: {
      today: "Today, the agent can only advise — the customer must manually execute every step, from disputing the charge to blocking the merchant.",
      future: "With In-App AI, the customer is passed to the colleague with full contextual information — card frozen, dispute raised, rich data handed off — all within the conversation."
    },
    narration: {
      today: "Most current AI can only tell you what to do. You still have to do the work yourself.",
      future: "The future AI is executional. It can freeze the card, block the merchant, and start the dispute journey — all during the conversation."
    }
  },
  {
    id: 6,
    name: "Human Handoff",
    label: "Scene 7 of 10: Seamless Handoff",
    delta: "Repeating yourself vs full context luggage",
    compareNarrative: {
      today: "Today, handover is a 'Cold Transfer'. The customer arrives with no baggage — the specialist has no context, no transcript, and no identity confirmation.",
      future: "With WebRTC In-App, we provide 'Warm Handoff'. The specialist joins with a full 'luggage' of data: transcript, actions taken, and confirmed identity."
    },
    narration: {
      today: "Handing over to a human usually means a cold transfer. You repeat your name, your issue, and what you've already tried.",
      future: "When the specialist joins, they don't start from zero. They arrive with a full 'context luggage' — the transcript, the actions taken, and the exact reason for the call."
    }
  },
  {
    id: 7,
    name: "Strategic Overlay",
    label: "Scene 8 of 10: Architecture Value",
    delta: "Legacy PSTN vs Modern Data Strategy",
    compareNarrative: {
      today: "The legacy world is trapped on the PSTN. It's a closed, voice-only loop that creates data silos and high friction.",
      future: "The future is a Data-Native strategy. Every call is an observable, multimodal data stream integrated into the bank's core logic."
    },
    narration: {
      today: "The legacy world is built on PSTN voice — isolated from data. It's expensive, opaque, and fragmented.",
      future: "The future is WebRTC and Data. Every conversation is a data stream — rich, observable, and integrated into the bank's core logic."
    }
  },
  {
    id: 8,
    name: "Secure Outbound Call",
    label: "Scene 9 of 10: Secure Outbound Calling",
    delta: "Anonymous PSTN number vs verified in-app identity",
    compareNarrative: {
      today: "Today, when a Barclays colleague calls a customer, the call arrives from an unrecognised number. With PSTN spoofing trivially easy, customers have no way to tell if it's genuine — and rightly, many won't pick up.",
      future: "With WebRTC in-app outbound calling, the colleague's verified identity and reason for the call are displayed before the customer even answers. Zero ambiguity. Zero spoofing risk. Full trust."
    },
    narration: {
      today: "Today, when a Barclays colleague proactively calls a customer, the call arrives from an unknown number — indistinguishable from a scam. Customers can't verify it, and many won't even answer.",
      future: "With secure in-app outbound calling, the customer sees exactly who's calling, their role, and why — all authenticated by Barclays. No spoofing possible. The customer answers with confidence."
    }
  },
  {
    id: 9,
    name: "Verified Outbound Session",
    label: "Scene 10 of 10: Verified Connection",
    delta: "Unverified PSTN caller vs authenticated WebRTC colleague",
    compareNarrative: {
      today: "Once answered, the customer still can't verify the caller. They must share sensitive mortgage details with someone they cannot confirm is a real Barclays employee — a significant vulnerability.",
      future: "Once connected, Jane's verified identity and case reference remain visible throughout the call. The customer is confident, cooperative, and the conversation is productive from the very first word."
    },
    narration: {
      today: "Even when the customer answers, uncertainty remains. Was this really Barclays? Is this safe to discuss openly? This friction slows resolution and erodes trust.",
      future: "The connected session shows Jane's verified identity and the mortgage reference throughout. Both parties have full context — and full confidence — from the moment the call connects."
    }
  }
];
