export const demoScripts = {
  // Scene 0: Entry
  0: {
    mobileTitle: "Account Activity",
    mobileSubtitle: "Joe's Current Account",
    actions: [
      { type: 'highlight', target: 'tx_2' } // Highlight the suspicious transaction
    ]
  },
  // Scene 4: Multimodal Interaction
  4: {
    dialogue: [
      { role: 'ai', text: "I can help with that. I can see a card payment for £67.49 today at Spotify Digital. Would you like me to freeze your card while we check it?" },
      { role: 'user', text: "Yes, freeze it." },
      { role: 'ai', text: "Done. Your card is frozen. I’ve also started a dispute journey for that transaction." }
    ],
    cards: [
      { type: 'transaction_detail', data: { merchant: 'Spotify Digital', amount: '£67.49' } },
      { type: 'status', label: 'Card Status', value: 'Frozen', color: 'error' }
    ]
  },
  // Scene 6: Human Handoff
  6: {
    handoffPackage: {
      issue: "Unrecognised Transaction: Spotify Digital £67.49",
      sentiment: "Concerned but reassured",
      actionsTaken: ["Card Frozen", "Dispute Started", "Security Check Passed"],
      recommendedNext: "Finalise dispute and order replacement card"
    }
  }
};
