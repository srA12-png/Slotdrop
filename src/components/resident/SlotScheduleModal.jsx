import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SlotScheduleModal = ({ parcel, onClose }) => {
  const { deliverySlots, scheduleParcelSlot } = useApp();
  const [selectedSlotId, setSelectedSlotId] = useState(deliverySlots[0]?.id || '');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!parcel) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlotId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      scheduleParcelSlot(parcel.id, selectedSlotId, instructions);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const selectedSlot = deliverySlots.find(s => s.id === selectedSlotId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#14213D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Schedule Internal Doorstep Slot</h3>
              <p className="text-xs text-slate-300">Package #{parcel.id} • {parcel.unit}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Parcel Brief */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Sender / Content</span>
              <p className="text-sm font-bold text-[#14213D]">{parcel.sender}</p>
              <p className="text-xs text-slate-600">{parcel.category} • {parcel.size}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500 uppercase">Shelf Bay</span>
              <p className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded mt-0.5 inline-block">
                {parcel.shelfLocation}
              </p>
            </div>
          </div>

          {/* Delivery Policy notice */}
          <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <p>
              <strong>Society Internal Delivery:</strong> Verified staff will bring this directly to your door at the chosen time. You will share your secure OTP upon delivery.
            </p>
          </div>

          {/* Slot Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Today's Delivery Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {deliverySlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                const isFull = slot.availableCapacity <= 0;

                return (
                  <button
                    type="button"
                    key={slot.id}
                    disabled={isFull}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#2563EB] bg-blue-50/50 ring-2 ring-blue-500/20' 
                        : isFull 
                        ? 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#2563EB]' : 'text-[#14213D]'}`}>
                        {slot.label}
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        isFull 
                          ? 'bg-rose-100 text-rose-700' 
                          : isSelected 
                          ? 'bg-blue-200 text-blue-800' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isFull ? 'Full' : `${slot.availableCapacity} slots left`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {slot.timeWindow}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Special Doorstep Instructions <span className="font-normal text-slate-400 normal-case">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Ring bell twice, leave with Flat 803 if not answered"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                maxLength={120}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition bg-white"
              />
              <FileText className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Instructions will be displayed on the delivery staff's digital task sheet.
            </p>
          </div>

          {/* Modal Actions */}
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
              disabled={isSubmitting || !selectedSlotId}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm transition disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Confirming...
                </>
              ) : (
                'Confirm Doorstep Slot'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

