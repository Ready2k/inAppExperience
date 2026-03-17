/**
 * ContextDrawer.jsx
 * A slide-in side panel showing what the AI currently knows about the session.
 * Spec §13: "Reasoning / Context Drawer" — presented in stakeholder-friendly form,
 * not raw chain-of-thought.
 */

import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShieldCheck, User, CreditCard, Lightbulb, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { SupportIntentEngine } from '../../services/supportIntentEngine';
import { SupportPolicyEngine } from '../../services/supportPolicyEngine';
import { formatConfidence, formatCurrency, formatShortDate } from '../../utils/formatters';

const iconClass = 'text-brand-cyan shrink-0';

// Accepts a pre-rendered `header` node (icon element) to avoid component-as-prop linting issues
const Section = ({ header, title, children }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {header}
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{title}</span>
    </div>
    {children}
  </div>
);

const Pill = ({ label, variant = 'default' }) => {
  const styles = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-success/10 text-success',
    warn:    'bg-warning/10 text-warning',
    cyan:    'bg-brand-cyan/10 text-brand-cyan',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${styles[variant]}`}>
      {label}
    </span>
  );
};

export const ContextDrawer = () => {
  const { contextDrawerOpen, toggleContextDrawer, currentScene, sessionState, customer } = useDemo();

  const suspiciousTransaction = customer?.recent_transactions?.find(t => t.suspicious);

  const intentData = useMemo(
    () => SupportIntentEngine.deriveIntent(currentScene.id, suspiciousTransaction),
    [currentScene.id, suspiciousTransaction]
  );

  const allowedActions = useMemo(
    () => SupportPolicyEngine.getAllowedActions(intentData.intent, sessionState),
    [intentData.intent, sessionState]
  );

  return (
    <AnimatePresence>
      {contextDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px]"
            onClick={toggleContextDrawer}
          />

          {/* Panel */}
          <motion.div
            key="drawer-panel"
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[60px] right-0 bottom-0 w-[340px] z-[95] bg-white border-l border-slate-200 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#00395D] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan">AI Awareness Panel</p>
                <h2 className="text-sm font-bold text-white mt-0.5">Context Package</h2>
              </div>
              <button
                onClick={toggleContextDrawer}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-6">

              {/* Auth State */}
              <Section header={<ShieldCheck size={13} className={iconClass} />} title="Authentication State">
                <div className="flex items-center gap-2 p-3 bg-success/5 border border-success/10 rounded-xl">
                  <CheckCircle2 size={16} className="text-success shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Level 3 — Secure In-App Session</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Biometric + session token verified</p>
                  </div>
                </div>
              </Section>

              {/* Customer Profile */}
              <Section header={<User size={13} className={iconClass} />} title="Customer">
                <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span className="font-semibold">{customer?.name ?? '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Profile ID</span>
                    <span className="font-mono text-[11px]">{customer?.profile_id ?? '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Screen</span>
                    <span className="font-semibold">Card Transactions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Channel</span>
                    <Pill label="In-App WebRTC" variant="cyan" />
                  </div>
                </div>
              </Section>

              {/* Selected Transaction */}
              {suspiciousTransaction && (
                <Section header={<CreditCard size={13} className={iconClass} />} title="Transaction in Focus">
                  <div className="p-3 bg-slate-50 rounded-xl border border-warning/20 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800">{suspiciousTransaction.merchant}</p>
                        <p className="text-slate-400 mt-0.5">{formatShortDate(suspiciousTransaction.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-error">{formatCurrency(suspiciousTransaction.amount)}</p>
                        <Pill label="Flagged" variant="warn" />
                      </div>
                    </div>
                    {suspiciousTransaction.description && (
                      <p className="text-[10px] text-slate-400 font-mono">{suspiciousTransaction.description}</p>
                    )}
                  </div>
                </Section>
              )}

              {/* Likely Intent */}
              <Section header={<Lightbulb size={13} className={iconClass} />} title="Likely Intent">
                <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/15 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">{intentData.label}</p>
                    <span className="text-[10px] font-bold text-brand-cyan">{formatConfidence(intentData.confidence)}</span>
                  </div>
                  {intentData.signals.length > 0 && (
                    <ul className="space-y-1 pt-1 border-t border-brand-cyan/10">
                      {intentData.signals.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] text-slate-500">
                          <span className="text-brand-cyan mt-0.5 shrink-0">›</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Section>

              {/* Allowed Actions */}
              <Section header={<Zap size={13} className={iconClass} />} title="Permitted AI Actions">
                <div className="flex flex-wrap gap-2">
                  {allowedActions.map(action => (
                    <div
                      key={action.id}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border ${
                        action.risk === 'none'   ? 'bg-slate-50 border-slate-200 text-slate-500' :
                        action.risk === 'low'    ? 'bg-success/5 border-success/20 text-success' :
                                                   'bg-warning/5 border-warning/20 text-warning'
                      }`}
                    >
                      {action.label}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Escalation Triggers */}
              <Section header={<AlertTriangle size={13} className={iconClass} />} title="Escalation Triggers">
                <div className="space-y-1.5">
                  {[
                    'Unrecognised merchant flagged',
                    'Transaction amount > £50',
                    'Customer requests specialist',
                    'Dispute requires human approval',
                  ].map((trigger, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                      {trigger}
                    </div>
                  ))}
                </div>
              </Section>

              <p className="text-[10px] text-slate-300 text-center pt-2 border-t border-slate-100">
                Context updated in real time as session progresses
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
