/**
 * supportPolicyEngine.js
 * Governs which actions the AI is permitted to take based on the current intent
 * and session state. Acts as the guardrail layer between intent classification
 * and execution.
 *
 * In a real integration this would call a policy service or rules engine.
 */

import { INTENTS } from './supportIntentEngine.js';

export const ACTIONS = {
  FREEZE_CARD:          { id: 'freeze_card',         label: 'Freeze Card',           risk: 'low' },
  UNFREEZE_CARD:        { id: 'unfreeze_card',        label: 'Unfreeze Card',         risk: 'low' },
  START_DISPUTE:        { id: 'start_dispute',        label: 'Start Dispute Journey', risk: 'medium' },
  BLOCK_MERCHANT:       { id: 'block_merchant',       label: 'Block Merchant',        risk: 'medium' },
  REQUEST_REPLACEMENT:  { id: 'request_replacement',  label: 'Order Replacement Card',risk: 'low' },
  PROVIDE_REASSURANCE:  { id: 'provide_reassurance',  label: 'Provide Reassurance',   risk: 'none' },
  ESCALATE_HUMAN:       { id: 'escalate_human',       label: 'Escalate to Specialist',risk: 'none' },
  VIEW_TRANSACTION:     { id: 'view_transaction',     label: 'View Transaction Detail',risk: 'none' },
};

const POLICY_MAP = {
  [INTENTS.DISPUTE_CHARGE]: [
    ACTIONS.VIEW_TRANSACTION,
    ACTIONS.FREEZE_CARD,
    ACTIONS.START_DISPUTE,
    ACTIONS.BLOCK_MERCHANT,
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
  [INTENTS.FREEZE_CARD]: [
    ACTIONS.FREEZE_CARD,
    ACTIONS.UNFREEZE_CARD,
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
  [INTENTS.FRAUD_CONCERN]: [
    ACTIONS.VIEW_TRANSACTION,
    ACTIONS.FREEZE_CARD,
    ACTIONS.START_DISPUTE,
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
  [INTENTS.ESCALATE_HUMAN]: [
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
  [INTENTS.GENERAL_SUPPORT]: [
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
  [INTENTS.ACCOUNT_QUERY]: [
    ACTIONS.VIEW_TRANSACTION,
    ACTIONS.PROVIDE_REASSURANCE,
    ACTIONS.ESCALATE_HUMAN,
  ],
};

export const SupportPolicyEngine = {
  /**
   * Returns the set of actions the AI is allowed to offer/execute for a given intent.
   * @param {string} intent - Intent ID from SupportIntentEngine
   * @param {string} sessionState - Current session state ('idle'|'connecting'|'active'|'handoff')
   * @returns {Array<{ id, label, risk }>}
   */
  getAllowedActions(intent, sessionState) {
    if (sessionState === 'idle' || sessionState === 'connecting') {
      return [ACTIONS.VIEW_TRANSACTION];
    }
    return POLICY_MAP[intent] ?? [ACTIONS.PROVIDE_REASSURANCE, ACTIONS.ESCALATE_HUMAN];
  },

  /**
   * Check if a specific action is permitted.
   * @param {string} actionId - Action ID from ACTIONS
   * @param {string} intent - Current intent
   * @param {string} sessionState - Current session state
   * @returns {boolean}
   */
  isActionAllowed(actionId, intent, sessionState) {
    return this.getAllowedActions(intent, sessionState).some(a => a.id === actionId);
  },
};
