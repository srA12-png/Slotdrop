import React, { useState } from 'react';
import { 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  KeyRound, 
  AlertCircle,
  Truck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { StatusBadge, OtpDisplay } from '../common/UIComponents';
import { TrackingTimeline } from '../common/TrackingTimeline';

export const ResidentParcelCard = ({ parcel, onScheduleClick }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  const isPendingSchedule = parcel.status === 'received_at_gate';
  const isOutForDelivery = parcel.status === 'out_for_delivery';
  const isDelivered = parcel.status === 'delivered';
  const isScheduled = parcel.status === 'slot_scheduled';

  return (
    <div className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
      isOutForDelivery 
        ? 'border-purple-300 ring-2 ring-purple-100' 
        : isPendingSchedule 
        ? 'border-amber-300' 
        : 'border-slate-200 hover:border-slate-300'
    }`}>
      {/* Top Bar with Status and Category */}
      <div className="p-5 pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100 font-mono font-bold text-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#14213D]">{parcel.id}</span>
              {parcel.isFragile && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                  Fragile
                </span>
              )}
              {parcel.isPerishable && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Perishable
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">Origin: {parcel.carrierOrigin}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={parcel.status} />
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Sender</span>
            <span className="font-semibold text-slate-800">{parcel.sender}</span>
            <p className="text-xs text-slate-500 mt-0.5">{parcel.category} • {parcel.size}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Society Concierge Shelf</span>
            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs inline-block mt-0.5">
              {parcel.shelfLocation}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Stored safely at main gate</p>
          </div>
        </div>

        {/* Schedule Info or Call to action */}
        {isPendingSchedule && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Awaiting your delivery schedule</p>
                <p className="text-xs text-amber-700">Choose when society internal staff should deliver this to your flat.</p>
              </div>
            </div>
            <button
              onClick={() => onScheduleClick(parcel)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-blue-700 shadow-xs transition shrink-0 flex items-center justify-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Doorstep Slot
            </button>
          </div>
        )}

        {/* Slot Scheduled Details */}
        {(isScheduled || isOutForDelivery) && parcel.scheduledSlotLabel && (
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-950">
            <Clock className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Scheduled Doorstep Window: {parcel.scheduledSlotLabel}</p>
              <p className="text-blue-800 text-[11px] mt-0.5">
                Staff: <span className="font-semibold">{parcel.assignedStaffName || 'Internal Logistics'}</span>
                {parcel.deliveryInstructions && (
                  <span className="block italic text-slate-600 mt-0.5">Note: "{parcel.deliveryInstructions}"</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Out for delivery OTP highlight */}
        {isOutForDelivery && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-900 uppercase tracking-wide">Staff En Route To Your Door!</p>
                <p className="text-xs text-purple-700">Staff {parcel.assignedStaffName} has arrived at {parcel.unit}.</p>
              </div>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <OtpDisplay otp={parcel.otp} label="Delivery Verification OTP" helper="Share code to receive package" />
            </div>
          </div>
        )}

        {/* Delivered success state */}
        {isDelivered && (
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Delivered & verified via OTP on {new Date(parcel.deliveredAt || parcel.receivedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Verified
            </span>
          </div>
        )}

        {/* Timeline toggle button */}
        <div className="pt-2">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="text-xs font-semibold text-slate-600 hover:text-[#2563EB] flex items-center gap-1 transition"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTimeline ? 'rotate-90 text-[#2563EB]' : ''}`} />
            {showTimeline ? 'Hide custody timeline' : 'View internal custody timeline & audit history'}
          </button>
        </div>

        {/* Collapsible Timeline */}
        {showTimeline && (
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 mt-2">
            <TrackingTimeline timeline={parcel.timeline} currentStatus={parcel.status} />
          </div>
        )}
      </div>
    </div>
  );
};

