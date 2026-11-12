import React, { useState } from 'react';
import { 
  Package, 
  Calendar, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Search,
  Filter,
  ArrowRight,
  Info,
  ShoppingBag,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResidentParcelCard } from './ResidentParcelCard';
import { SlotScheduleModal } from './SlotScheduleModal';
import { PlatformInboundTracker } from './PlatformInboundTracker';
import { EmptyState, MockBadge } from '../common/UIComponents';

export const ResidentDashboard = ({ subTab = 'resident-parcels' }) => {
  const { 
    currentUser, 
    parcels, 
    deliverySlots, 
    notifications, 
    inboundOrders, 
    syncPlatformOrders, 
    isSyncing 
  } = useApp();

  const [selectedParcelForSlot, setSelectedParcelForSlot] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, pending, out, delivered
  const [searchQuery, setSearchQuery] = useState('');

  // Parcels addressed to current resident
  const residentParcels = parcels.filter(p => p.recipientId === currentUser?.id);

  // Filter logic
  const filteredParcels = residentParcels.filter(p => {
    const matchesQuery = 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.carrierOrigin.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (filterType === 'pending') return p.status === 'received_at_gate';
    if (filterType === 'scheduled') return p.status === 'slot_scheduled';
    if (filterType === 'out') return p.status === 'out_for_delivery';
    if (filterType === 'delivered') return p.status === 'delivered';
    return true;
  });

  // Summary counts
  const inboundCount = inboundOrders.length;
  const pendingCount = residentParcels.filter(p => p.status === 'received_at_gate').length;
  const scheduledCount = residentParcels.filter(p => p.status === 'slot_scheduled').length;
  const outCount = residentParcels.filter(p => p.status === 'out_for_delivery').length;
  const deliveredCount = residentParcels.filter(p => p.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Welcome & Unit Identity Banner */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1B2A4A] to-[#2563EB] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-300">
                Resident Portal
              </span>
              <MockBadge text="Greenwood Heights • Tower B" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Hello, {currentUser?.name}! 👋
            </h1>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">
              Internal parcel concierge for <strong className="text-white underline">{currentUser?.unit}</strong>. Track online orders from Amazon, Flipkart, Myntra, schedule your doorstep slot once received at Gate 2, and verify with your 4-digit OTP.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3">
              <div>
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Online Inbound</span>
                <span className="text-lg font-extrabold text-amber-300">{inboundCount} in transit</span>
              </div>
              <div className="border-l border-white/20 pl-3">
                <span className="text-[10px] text-blue-200 uppercase font-bold block">At Gate Desk</span>
                <span className="text-lg font-extrabold text-white">{pendingCount} ready</span>
              </div>
            </div>

            <button
              onClick={syncPlatformOrders}
              disabled={isSyncing}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white text-[#14213D] hover:bg-slate-100 shadow-md transition flex items-center gap-1.5"
              title="Sync online order status from e-commerce apps"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#2563EB] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Apps'}</span>
            </button>
          </div>
        </div>

        {/* Background decorative glow */}
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Metrics Cards (Including Inbound App Orders) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">App Orders (Online)</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-orange-600">{inboundCount}</p>
          <span className="text-[11px] text-orange-600 font-medium font-mono">Yet to reach gate</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Received at Gate</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#14213D]">{pendingCount}</p>
          <span className="text-[11px] text-amber-600 font-medium">Ready to schedule slot</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Slot Scheduled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#14213D]">{scheduledCount}</p>
          <span className="text-[11px] text-[#2563EB] font-medium">Internal staff assigned</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Out for Delivery</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#14213D]">{outCount}</p>
          <span className="text-[11px] text-purple-600 font-medium font-mono">OTP Ready</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Delivered Safely</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#14213D]">{deliveredCount}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Verified by OTP</span>
        </div>
      </div>

      {/* Main Tabbed Views based on subTab */}
      {subTab === 'resident-inbound' ? (
        /* Dedicated App Delivery Tracker View */
        <PlatformInboundTracker />
      ) : subTab === 'resident-slots' ? (
        /* Slot Scheduling View */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#14213D]">Available Internal Doorstep Delivery Slots</h2>
            <p className="text-xs text-slate-500">
              Select an open window for your flat. Society staff conduct deliveries only during verified times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverySlots.map((slot) => (
              <div 
                key={slot.id} 
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:border-[#2563EB] transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-[#14213D]">{slot.label}</span>
                    <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {slot.availableCapacity} / {slot.maxCapacity} Left
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{slot.timeWindow}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Assigned Staff: Manoj K.</span>
                  <span className="text-emerald-600 font-semibold">Active Run</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pending parcels needing scheduling */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-[#14213D] mb-3">Parcels Awaiting Slot Confirmation</h3>
            {pendingCount === 0 ? (
              <div className="bg-slate-50 rounded-xl p-6 text-center text-xs text-slate-500">
                All arrived parcels have confirmed slots.
              </div>
            ) : (
              <div className="space-y-3">
                {residentParcels.filter(p => p.status === 'received_at_gate').map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#14213D]">{p.id}</span>
                      <p className="text-xs text-slate-600 font-semibold">{p.sender} ({p.carrierOrigin})</p>
                    </div>
                    <button
                      onClick={() => setSelectedParcelForSlot(p)}
                      className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Slot Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : subTab === 'resident-notifications' ? (
        /* Notifications Tab View */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#14213D] mb-4">Gate Concierge & App Delivery Alerts</h2>
          <div className="space-y-3">
            {notifications.filter(n => n.recipientId === currentUser?.id).map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-slate-50/40">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#14213D]">{n.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Default: My Parcels List + Quick Inbound App Banner */
        <div className="space-y-6">
          {/* Inbound App Orders Quick Preview Section */}
          <PlatformInboundTracker />

          {/* Section Divider */}
          <div className="border-t border-slate-200 pt-2">
            <h3 className="text-base font-bold text-[#14213D] mb-1">
              Parcels Received at Society Gate Concierge
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Stored safely in physical bays at Gate 2. Schedule doorstep delivery or track internal staff handover.
            </p>
          </div>

          {/* Filter and search bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by ID, sender, courier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] bg-slate-50 focus:bg-white transition"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Parcels', count: residentParcels.length },
                { id: 'pending', label: 'Awaiting Slot', count: pendingCount },
                { id: 'scheduled', label: 'Scheduled', count: scheduledCount },
                { id: 'out', label: 'Out for Delivery', count: outCount },
                { id: 'delivered', label: 'Delivered', count: deliveredCount },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilterType(btn.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5 ${
                    filterType === btn.id
                      ? 'bg-[#14213D] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    filterType === btn.id ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
                  }`}>
                    {btn.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Parcels List */}
          {filteredParcels.length === 0 ? (
            <EmptyState
              title="No parcels matching this filter"
              description="Either no packages are currently at the gate, or they are stored under a different status."
              action={
                <button
                  onClick={() => { setFilterType('all'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  Clear Filters
                </button>
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredParcels.map((parcel) => (
                <ResidentParcelCard
                  key={parcel.id}
                  parcel={parcel}
                  onScheduleClick={(p) => setSelectedParcelForSlot(p)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for Slot Scheduling */}
      {selectedParcelForSlot && (
        <SlotScheduleModal
          parcel={selectedParcelForSlot}
          onClose={() => setSelectedParcelForSlot(null)}
        />
      )}
    </div>
  );
};
