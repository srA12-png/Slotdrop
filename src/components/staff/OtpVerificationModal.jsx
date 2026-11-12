import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle,
  Package,
  MapPin,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OtpVerificationModal = ({ parcel, onClose }) => {
  const { verifyOtpAndDeliver } = useApp();
  const [digits, setDigits] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!parcel) return null;

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setErrorMsg('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`staff-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`staff-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullOtp = digits.join('');
    if (fullOtp.length !== 4) {
      setErrorMsg('Please enter all 4 digits of the resident OTP.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const result = verifyOtpAndDeliver(parcel.id, fullOtp);
      setIsVerifying(false);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#14213D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Verify Resident Doorstep OTP</h3>
              <p className="text-xs text-slate-300">Package {parcel.id} • {parcel.unit}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">OTP Verified Successfully!</h4>
            <p className="text-xs text-slate-500">Parcel handed over to {parcel.recipientName}. Status updated to Delivered.</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="p-6 space-y-5">
            {/* Delivery target summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Resident</span>
                <p className="text-sm font-bold text-[#14213D]">{parcel.recipientName}</p>
                <p className="text-xs text-slate-600 font-medium">{parcel.unit}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Package</span>
                <p className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mt-0.5">
                  {parcel.sender}
                </p>
              </div>
            </div>

            {/* Quick Demo Helper (to easily test without switching) */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
              <div>
                <span className="font-bold">Resident OTP for demo:</span>
                <p className="text-[11px] text-blue-700">Aarav's generated code is displayed below for fast evaluation:</p>
              </div>
              <button
                type="button"
                onClick={() => setDigits(parcel.otp.split(''))}
                className="font-mono font-bold text-sm bg-white border border-blue-300 text-blue-700 px-2.5 py-1 rounded shadow-xs hover:bg-blue-100/50 transition"
                title="Click to autofill OTP"
              >
                {parcel.otp} (Auto-Fill)
              </button>
            </div>

            {/* OTP Inputs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 text-center mb-3">
                Ask resident for the 4-digit code
              </label>
              <div className="flex items-center justify-center gap-3">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    id={`staff-otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2 border-slate-300 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition bg-white text-[#14213D]"
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isVerifying || digits.join('').length !== 4}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition disabled:opacity-50 flex items-center gap-2"
              >
                {isVerifying ? 'Verifying...' : 'Complete Doorstep Handover'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

