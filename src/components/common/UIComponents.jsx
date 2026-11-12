import React from 'react';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  KeyRound, 
  HelpCircle 
} from 'lucide-react';

export const StatusBadge = ({ status, className = '' }) => {
  switch (status) {
    case 'received_at_gate':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 ${className}`}>
          <Package className="w-3.5 h-3.5 text-amber-600" />
          Received at Gate
        </span>
      );
    case 'slot_scheduled':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
          Slot Scheduled
        </span>
      );
    case 'out_for_delivery':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 animate-pulse ${className}`}>
          <Truck className="w-3.5 h-3.5 text-purple-600" />
          Out for Delivery
        </span>
      );
    case 'delivered':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Delivered
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
          <HelpCircle className="w-3.5 h-3.5" />
          {status}
        </span>
      );
  }
};

export const OtpDisplay = ({ otp, label = "Doorstep Delivery OTP", helper = "Share with society staff only at your door" }) => {
  if (!otp) return null;
  const digits = otp.split('');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
        <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
        {label}
      </div>
      <div className="flex items-center justify-center gap-2 mb-1.5">
        {digits.map((digit, i) => (
          <span 
            key={i} 
            className="w-10 h-12 flex items-center justify-center bg-white border-2 border-[#14213D] text-[#14213D] text-xl font-bold font-mono rounded-lg shadow-sm"
          >
            {digit}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 font-medium">
        {helper}
      </p>
    </div>
  );
};

export const EmptyState = ({ 
  icon: Icon = Package, 
  title = "No parcels found", 
  description = "No items match your criteria at this moment.", 
  action 
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 border border-blue-100">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#14213D] mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5">{description}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};

export const LoadingState = ({ message = "Loading concierge records..." }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-xs">
      <div className="w-10 h-10 border-3 border-blue-100 border-t-[#2563EB] rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-semibold text-slate-600">{message}</p>
    </div>
  );
};

export const MockBadge = ({ text = "Mock Society Data" }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-300">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      {text}
    </span>
  );
};

