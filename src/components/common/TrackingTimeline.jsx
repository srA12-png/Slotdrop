import React from 'react';
import { CheckCircle2, Circle, Clock, Truck, Package, ShieldCheck } from 'lucide-react';

export const TrackingTimeline = ({ timeline = [], currentStatus = 'received_at_gate' }) => {
  const steps = [
    { key: 'received_at_gate', label: 'Received at Concierge', desc: 'Arrived at society security desk' },
    { key: 'slot_scheduled', label: 'Slot Confirmed', desc: 'Doorstep time window chosen' },
    { key: 'out_for_delivery', label: 'Internal Delivery', desc: 'Staff en route to doorstep' },
    { key: 'delivered', label: 'Delivered (OTP)', desc: 'Verified & handed over' }
  ];

  const getStepStatus = (stepKey) => {
    const order = ['received_at_gate', 'slot_scheduled', 'out_for_delivery', 'delivered'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="py-2">
      {/* Horizontal step summary bar */}
      <div className="relative mb-6 hidden sm:block">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        <div className="relative z-10 flex justify-between">
          {steps.map((st) => {
            const status = getStepStatus(st.key);
            return (
              <div key={st.key} className="flex flex-col items-center">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    status === 'completed'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : status === 'current'
                      ? 'bg-[#2563EB] border-[#2563EB] text-white ring-4 ring-blue-100'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-xs font-bold font-mono">{steps.indexOf(st) + 1}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 font-semibold ${
                  status === 'current' ? 'text-[#2563EB]' : status === 'completed' ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed timestamp list */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Internal Custody Log</h4>
        <div className="space-y-4">
          {timeline.map((event, idx) => {
            const date = new Date(event.timestamp);
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

            return (
              <div key={idx} className="flex items-start gap-3 relative pb-2">
                {idx !== timeline.length - 1 && (
                  <div className="absolute left-[15px] top-[26px] bottom-0 w-0.5 bg-slate-200"></div>
                )}
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-[#14213D]">{event.label}</p>
                    <span className="text-xs text-slate-400 font-mono shrink-0">{formattedDate}, {formattedTime}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

