import React from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { ChevronRight, CreditCard, Search, ArrowRightLeft, Menu } from 'lucide-react';

export const TransactionScreen = ({ mode }) => {
  const { customer, demoMode: contextMode } = useDemo();
  const activeMode = mode || contextMode;
  const isToday = activeMode === 'today';
  
  return (
    <div className="flex flex-col h-full bg-[#F3F4F6]">
      {/* App Header */}
      <div className="bg-brand-blue pt-12 pb-6 px-6 text-white rounded-b-[24px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Menu size={24} />
          <h1 className="text-lg font-bold tracking-tight">Barclays</h1>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">JB</div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs opacity-60 uppercase tracking-widest font-semibold mb-1">Current Account</p>
            <p className="text-3xl font-bold">£1,240.52</p>
          </div>
          <button className="bg-brand-cyan/20 p-2 rounded-full border border-brand-cyan/20">
            <Search size={20} className="text-brand-cyan" />
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 px-4 pt-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-800">Recent Activity</h2>
          <span className="text-xs text-brand-cyan font-bold">See all</span>
        </div>

        <div className="space-y-3">
          {customer.recent_transactions.map((tx) => (
            <motion.div 
              key={tx.id}
              initial={tx.flagged && !isToday ? { scale: 1 } : {}}
              animate={tx.flagged && !isToday ? { 
                boxShadow: ["0px 0px 0px rgba(0,174,239,0)", "0px 0px 20px rgba(0,174,239,0.3)", "0px 0px 0px rgba(0,174,239,0)"],
                borderColor: tx.flagged ? ["#E5E7EB", "#00AEEF", "#E5E7EB"] : "#E5E7EB"
              } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`p-4 bg-white rounded-2xl border flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all ${tx.flagged && !isToday ? 'border-brand-cyan/40 bg-brand-cyan/5' : 'border-slate-100'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.flagged ? 'bg-error/10 text-error' : 'bg-slate-100 text-slate-400'}`}>
                  {tx.flagged ? <CreditCard size={20} /> : <div className="font-bold text-sm">{tx.merchant.charAt(0)}</div>}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{tx.merchant}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{tx.category} • {tx.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.amount < 0 ? 'text-slate-800' : 'text-success'}`}>
                  {tx.amount < 0 ? '' : '+'}{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(tx.amount)}
                </p>
                {tx.flagged && !isToday && (
                  <span className="text-[9px] font-bold text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Needs Review</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Button - Contextual AI */}
      {!isToday && (
        <motion.button 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-24 right-6 w-14 h-14 bg-brand-cyan rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-cyan/30 z-[70] active:scale-90 transition-transform"
        >
          <div className="absolute inset-0 bg-brand-cyan rounded-full animate-ping opacity-20" />
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <span className="text-xl font-bold">AI</span>
          </motion.div>
        </motion.button>
      )}

      {/* Nav Bar Placeholder */}
      <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 pb-2">
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-6 h-6 bg-slate-200 rounded-md" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-brand-blue">
          <div className="w-6 h-6 bg-brand-blue/10 rounded-md flex items-center justify-center">
            <ArrowRightLeft size={16} />
          </div>
          <span className="text-[10px] font-bold">Pay</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-6 h-6 bg-slate-200 rounded-md" />
          <span className="text-[10px] font-medium">Cards</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-6 h-6 bg-slate-200 rounded-md" />
          <span className="text-[10px] font-medium">Help</span>
        </div>
      </div>
    </div>
  );
};
