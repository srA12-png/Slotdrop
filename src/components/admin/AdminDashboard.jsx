import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ArrowUpRight,
  TrendingUp,
  Download,
  Building,
  KeyRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, MockBadge, EmptyState } from '../common/UIComponents';
import { ParcelRegistrationModal } from './ParcelRegistrationModal';

export const AdminDashboard = ({ subTab = 'admin-overview' }) => {
  const { parcels, residents, deliverySlots, showToast, allUsers } = useApp();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Stats
  const totalParcels = parcels.length;
  const inGateDesk = parcels.filter(p => p.status === 'received_at_gate').length;
  const inTransit = parcels.filter(p => p.status === 'out_for_delivery').length;
  const deliveredCount = parcels.filter(p => p.status === 'delivered').length;
  const scheduledCount = parcels.filter(p => p.status === 'slot_scheduled').length;

  // Filtered parcels table
  const filteredParcels = parcels.filter(p => {
    const matchesSearch = 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shelfLocation.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedStatusFilter === 'all') return true;
    return p.status === selectedStatusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Admin Top Header Banner */}
      <div className="bg-[#14213D] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
              Facility & Estate Management
            </span>
            <MockBadge text="Concierge Admin Console" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Society Logistics Operations</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Oversee external courier parcel intake at Gate 2, monitor bay storage occupancy, review resident delivery schedules, and audit OTP-verified handovers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-600 text-white shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Intake New Parcel</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gate Desk Intake</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#14213D]">{inGateDesk}</span>
            <span className="text-xs text-amber-600 font-semibold">In Shelf Bays</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting resident slot selection</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Scheduled Runs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#14213D]">{scheduledCount}</span>
            <span className="text-xs text-[#2563EB] font-semibold">Slots Assigned</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Staff assigned for delivery today</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">En Route To Doors</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#14213D]">{inTransit}</span>
            <span className="text-xs text-purple-600 font-semibold">Active Run</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Staff at resident towers with OTP</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Delivered & Closed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#14213D]">{deliveredCount}</span>
            <span className="text-xs text-emerald-600 font-semibold">100% Verified</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Audit log retained in system</p>
        </div>
      </div>

      {/* Conditionally rendered sub-tabs */}
      {subTab === 'admin-residents' ? (
        /* Resident Directory */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#14213D]">Society Residents Directory</h2>
              <p className="text-xs text-slate-500">240 registered flats across Towers A, B, C and D</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Flat / Unit</th>
                  <th className="py-3 px-4">Resident Name</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Account Email</th>
                  <th className="py-3 px-4">Active Parcels</th>
                  <th className="py-3 px-4">Society Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {residents.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-[#14213D]">{r.unit}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{r.name}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">{r.phone}</td>
                    <td className="py-3.5 px-4 text-slate-500">{r.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                        {r.pendingParcels} pending
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        r.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : subTab === 'admin-slots' ? (
        /* Slots Management & Staff Assignments */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#14213D]">Internal Delivery Slot Windows & Staff Roster</h2>
              <p className="text-xs text-slate-500">Hourly parcel delivery rounds by society logistics personnel</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverySlots.map((slot) => (
              <div key={slot.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#14213D]">{slot.label}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-100 text-[#2563EB] font-bold">
                    Cap: {slot.maxCapacity}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{slot.timeWindow}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs flex items-center justify-between text-slate-500">
                  <span>Assigned: <strong>Manoj Kumar</strong></span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Default: Master Parcels Table */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#14213D]">Master Parcel Registry & Custody Tracking</h2>
              <p className="text-xs text-slate-500">All inbound parcels stored at Gate 2 Concierge</p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast('Exported CSV of current parcel logs', 'info')}
                className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search parcel ID, resident, unit, shelf..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'received_at_gate', label: 'In Gate Shelf' },
                { id: 'slot_scheduled', label: 'Slot Booked' },
                { id: 'out_for_delivery', label: 'In Transit' },
                { id: 'delivered', label: 'Delivered' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                    selectedStatusFilter === f.id
                      ? 'bg-[#14213D] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Parcels Table */}
          {filteredParcels.length === 0 ? (
            <EmptyState
              title="No parcels found"
              description="No incoming or active parcels match the current search query or status filter."
              action={
                <button
                  onClick={() => { setSearchQuery(''); setSelectedStatusFilter('all'); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  Reset Filters
                </button>
              }
            />
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Parcel ID</th>
                    <th className="py-3 px-4">Flat & Resident</th>
                    <th className="py-3 px-4">Origin / Sender</th>
                    <th className="py-3 px-4">Gate Shelf Bay</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Assigned Slot</th>
                    <th className="py-3 px-4 text-center">OTP Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredParcels.map((parcel) => (
                    <tr key={parcel.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                        {parcel.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{parcel.unit}</span>
                        <span className="text-slate-500 text-[11px]">{parcel.recipientName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700 block">{parcel.sender}</span>
                        <span className="text-slate-400 text-[11px]">{parcel.carrierOrigin}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {parcel.shelfLocation}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={parcel.status} />
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {parcel.scheduledSlotLabel ? (
                          <span className="font-medium">{parcel.scheduledSlotLabel}</span>
                        ) : (
                          <span className="text-slate-400 italic">Not scheduled yet</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                        <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {parcel.otp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Parcel Intake Modal */}
      <ParcelRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};

