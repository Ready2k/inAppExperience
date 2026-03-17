/**
 * handoffComposer.js
 * Builds the context transfer payload passed from AI to a human specialist.
 * This is the "context luggage" that prevents customers from repeating themselves.
 *
 * In a real integration this would be posted to a CRM or contact-centre platform
 * (e.g. Salesforce, Genesys, Amazon Connect Task).
 */

export const HandoffComposer = {
  /**
   * Compose a full handoff package from session context.
   *
   * @param {object} customer         - Customer profile from mockData
   * @param {object|null} transaction - The suspicious transaction in focus
   * @param {string} sessionState     - Current session state
   * @param {string[]} actionsTaken   - Human-readable list of AI-completed actions
   * @param {string} sentiment        - Assessed customer sentiment
   * @param {object} intent           - Derived intent from SupportIntentEngine
   * @returns {object} handoffPackage
   */
  compose({ customer, transaction, sessionState, actionsTaken = [], sentiment = 'Neutral', intent = null }) {
    const package_ = {
      composedAt: new Date().toISOString(),
      sessionState,

      customer: {
        name: customer?.name ?? 'Unknown',
        profileId: customer?.profile_id ?? null,
        authLevel: 'Level 3 (Secure In-App Session)',
        channel: 'In-App WebRTC Voice',
        waitTime: '00:00 (Direct Handoff)',
      },

      issue: transaction
        ? `Unrecognised transaction: ${transaction.merchant} ${this._formatAmount(transaction.amount)}`
        : 'Customer-reported support enquiry',

      transaction: transaction
        ? {
            id: transaction.id,
            merchant: transaction.merchant,
            amount: this._formatAmount(transaction.amount),
            date: transaction.date,
            status: transaction.status,
            reference: transaction.description ?? null,
            flagged: transaction.flagged ?? false,
          }
        : null,

      sentiment: sentiment,
      urgency: this._deriveUrgency(transaction, actionsTaken),

      actionsTaken,

      recommendedNext: this._recommendNextStep(actionsTaken),

      transcriptExcerpt: [
        { speaker: 'AI',   text: "I can see a card payment for £67.49 today at Spotify Digital. I've frozen the card and started a dispute journey as a precaution." },
        { speaker: 'Customer', text: "Thank you, that's a relief." },
        { speaker: 'AI',   text: "I'm connecting you now with a card specialist who has all the context. You won't need to repeat anything." },
      ],

      escalationReason: intent?.label ?? 'Customer requested specialist',
    };

    return package_;
  },

  _formatAmount(amount) {
    if (amount == null) return '';
    return `£${Math.abs(amount).toFixed(2)}`;
  },

  _deriveUrgency(transaction, actionsTaken) {
    if (transaction?.suspicious && !actionsTaken.includes('Card Frozen')) return 'High';
    if (transaction?.suspicious) return 'Medium';
    return 'Normal';
  },

  _recommendNextStep(actionsTaken) {
    const frozen = actionsTaken.includes('Card Frozen');
    const disputed = actionsTaken.includes('Dispute Started');

    if (!frozen && !disputed) return 'Freeze card and initiate dispute journey with customer';
    if (frozen && !disputed) return 'Confirm dispute details and proceed with chargeback process';
    if (frozen && disputed) return 'Confirm replacement card preference and close dispute journey';
    return 'Review case notes and advise customer on next steps';
  },
};
