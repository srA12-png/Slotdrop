import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  KeyRound, 
  Phone, 
  AlertCircle, 
  Play, 
  ShieldCheck,
  ChevronRight,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, MockBadge, EmptyState } from '../common/UIComponents';
import { OtpVerificationModal } from './OtpVerificationModal';

export const StaffDashboard = ({ subTab = 'staff-tasks' }) => {
  const { currentUser, parcels, startDelivery } = useApp();
  const [selectedParcelForOtp, setSelectedParcelForOtp] = useState(null);
  const [activeFilter, setActiveFilter] = useState('active'); // active, out, completed

  // Filter parcels for staff
  // In internal society delivery, staff sees all scheduled and active runs
  const activeDeliveries = parcels.filter(p => p.status === 'slot_scheduled');
  const enRouteDeliveries = parcels.filter(p => p.status === 'out_for_delivery');
  const completedDeliveries = parcels.filter(p => p.status === 'delivered');

  const displayedList = activeFilter === 'active' 
    ? [...enRouteDeliveries, ...activeDeliveries]
    : activeFilter === 'out'
    ? enRouteDeliveries
    : completedDeliveries;

  return (
    <div className="space-y-6">
      {/* Staff Logistics Banner */}
      <div className="bg-[#14213D] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              Internal Society Delivery Operations
            </span>
            <MockBadge text="Staff Roster: Tower B & C" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Staff Portal — {currentUser?.name || 'Manoj Kumar'}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Pick up sorted parcels from Gate Concierge Bays and deliver to resident apartment doors. Every package requires 4-digit resident OTP verification before completion.
          </p>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold">Active Run Status</span>
            <span className="text-sm font-bold text-white">Tower B Elevator 2</span>
          </div>
        </div>
      </div>

      {/* Staff Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Ready For Handover</span>
            <p className="text-2xl font-extrabold text-[#14213D] mt-1">{activeDeliveries.length}</p>
            <p className="text-[11px] text-blue-600 font-semibold">Resident scheduled slot</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">En Route to Flats</span>
            <p className="text-2xl font-extrabold text-purple-700 mt-1">{enRouteDeliveries.length}</p>
            <p className="text-[11px] text-purple-600 font-semibold">Doorstep OTP required</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Truck className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Delivered Today</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{completedDeliveries.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold">OTP Verified</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'active' ? 'bg-[#14213D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>All Assigned Runs</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {activeDeliveries.length + enRouteDeliveries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'out' ? 'bg-[#14213D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>In Transit Now</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700">
              {enRouteDeliveries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'completed' ? 'bg-[#14213D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Completed Today</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-700">
              {completedDeliveries.length}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Rule: <strong className="text-slate-800">Never hand parcel without resident OTP</strong>
        </div>
      </div>

      {/* Task Cards List */}
      {displayedList.length === 0 ? (
        <EmptyState
          title="No tasks in this category"
          description="You have completed all assigned doorstep runs or no packages are scheduled."
        />
      ) : (
        <div className="space-y-4">
          {displayedList.map((parcel) => {
            const isEnRoute = parcel.status === 'out_for_delivery';
            const isDelivered = parcel.status === 'delivered';
            const isScheduled = parcel.status === 'slot_scheduled';

            return (
              <div
                key={parcel.id}
                className={`bg-white rounded-2xl border p-5 transition shadow-xs ${
                  isEnRoute 
                    ? 'border-purple-300 ring-2 ring-purple-100' 
                    : isDelivered 
                    ? 'border-slate-200 opacity-90' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Unit & Parcel details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#14213D] text-white flex items-center justify-center font-bold text-xs">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-[#14213D]">{parcel.unit}</h3>
                          <StatusBadge status={parcel.status} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          Resident: <strong className="text-slate-700">{parcel.recipientName}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                      <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                        {parcel.id}
                      </span>
                      <span className="text-slate-600">
                        Item: <strong>{parcel.sender}</strong> ({parcel.category})
                      </span>
                      <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono font-semibold">
                        Pick from: {parcel.shelfLocation}
                      </span>
                    </div>

                    {parcel.deliveryInstructions && (
                      <p className="text-xs bg-amber-50 text-amber-900 border border-amber-200 p-2 rounded-lg italic">
                        <strong>Resident note:</strong> "{parcel.deliveryInstructions}"
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    {/* If slot scheduled, button to start delivery */}
                    {isScheduled && (
                      <button
                        onClick={() => startDelivery(parcel.id)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs transition flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Doorstep Run</span>
                      </button>
                    )}

                    {/* If out for delivery, button to enter OTP */}
                    {isEnRoute && (
                      <button
                        onClick={() => setSelectedParcelForOtp(parcel)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-md transition flex items-center justify-center gap-2 animate-pulse"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>Enter Resident OTP & Handover</span>
                      </button>
                    )}

                    {/* If delivered, show verified badge */}
                    {isDelivered && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Delivered at {new Date(parcel.deliveredAt || parcel.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Staff OTP Verification Modal */}
      {selectedParcelForOtp && (
        <OtpVerificationModal
          parcel={selectedParcelForOtp}
          onClose={() => setSelectedParcelForOtp(null)}
        />
      )}
    </div>
  );
};

