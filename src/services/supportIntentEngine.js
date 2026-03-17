/**
 * supportIntentEngine.js
 * Maps the current scene and transaction context to a classified support intent.
 * Designed to be replaced by a real NLU/LLM classifier in a live integration.
 */

export const INTENTS = {
  DISPUTE_CHARGE:      'dispute_charge',
  FREEZE_CARD:         'freeze_card',
  FRAUD_CONCERN:       'fraud_concern',
  ACCOUNT_QUERY:       'account_query',
  ESCALATE_HUMAN:      'escalate_human',
  GENERAL_SUPPORT:     'general_support',
};

const SCENE_INTENT_MAP = {
  0: INTENTS.GENERAL_SUPPORT,   // Entry / Account Activity
  1: INTENTS.GENERAL_SUPPORT,   // Finding Support
  2: INTENTS.FRAUD_CONCERN,     // Contact Initiation
  3: INTENTS.FRAUD_CONCERN,     // Session Establishment
  4: INTENTS.DISPUTE_CHARGE,    // Multimodal Interaction
  5: INTENTS.FREEZE_CARD,       // Resolution Actions
  6: INTENTS.ESCALATE_HUMAN,    // Human Handoff
  7: INTENTS.GENERAL_SUPPORT,   // Architecture Overlay
};

const INTENT_LABELS = {
  [INTENTS.DISPUTE_CHARGE]:  'Card Dispute — Unrecognised Charge',
  [INTENTS.FREEZE_CARD]:     'Card Freeze Request',
  [INTENTS.FRAUD_CONCERN]:   'Potential Fraud Concern',
  [INTENTS.ACCOUNT_QUERY]:   'Account Enquiry',
  [INTENTS.ESCALATE_HUMAN]:  'Escalation to Human Specialist',
  [INTENTS.GENERAL_SUPPORT]: 'General Support',
};

const CONFIDENCE_MAP = {
  [INTENTS.DISPUTE_CHARGE]:  0.92,
  [INTENTS.FREEZE_CARD]:     0.88,
  [INTENTS.FRAUD_CONCERN]:   0.85,
  [INTENTS.ACCOUNT_QUERY]:   0.76,
  [INTENTS.ESCALATE_HUMAN]:  0.97,
  [INTENTS.GENERAL_SUPPORT]: 0.60,
};

export const SupportIntentEngine = {
  /**
   * Derive intent from scene context and the flagged transaction.
   * @param {number} sceneId - Current scene index
   * @param {object|null} suspiciousTransaction - The flagged transaction, if selected
   * @returns {{ intent: string, label: string, confidence: number, signals: string[] }}
   */
  deriveIntent(sceneId, suspiciousTransaction = null) {
    let intent = SCENE_INTENT_MAP[sceneId] ?? INTENTS.GENERAL_SUPPORT;

    // Boost to dispute if a suspicious transaction is in context
    if (suspiciousTransaction?.suspicious && sceneId >= 2 && sceneId <= 5) {
      intent = INTENTS.DISPUTE_CHARGE;
    }

    const signals = this._buildSignals(sceneId, suspiciousTransaction, intent);

    return {
      intent,
      label: INTENT_LABELS[intent],
      confidence: CONFIDENCE_MAP[intent] ?? 0.5,
      signals,
    };
  },

  _buildSignals(sceneId, transaction, intent) {
    const signals = [];
    if (transaction?.suspicious) signals.push(`Suspicious transaction flagged: ${transaction.merchant}`);
    if (transaction?.amount && Math.abs(transaction.amount) > 50) signals.push(`Transaction amount above £50 threshold`);
    if (transaction?.status === 'pending') signals.push('Transaction status is pending');
    if (sceneId >= 2) signals.push('Customer initiated support session');
    if (intent === INTENTS.ESCALATE_HUMAN) signals.push('Escalation trigger met: specialist required');
    return signals;
  },
};
