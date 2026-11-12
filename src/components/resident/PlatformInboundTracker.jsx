import React, { useState } from 'react';
import { 
  ShoppingBag, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ExternalLink, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Package,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlatformInboundTracker = () => {
  const { 
    connectedPlatforms, 
    inboundOrders, 
    isSyncing, 
    syncPlatformOrders, 
    simulateOrderArrivalAtGate, 
    togglePlatformConnection,
    addNewInboundOrder
  } = useApp();

  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    platformId: 'amazon',
    itemName: '',
    category: 'Electronics',
    estimatedArrival: 'Today by 05:00 PM'
  });

  // Filtered orders
  const filteredOrders = inboundOrders.filter(order => {
    if (selectedPlatformFilter === 'all') return true;
    return order.platformId === selectedPlatformFilter;
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrderForm.itemName.trim()) return;

    addNewInboundOrder(newOrderForm);
    setNewOrderForm({
      platformId: 'amazon',
      itemName: '',
      category: 'Electronics',
      estimatedArrival: 'Today by 05:00 PM'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Auto-Sync & Connected Platforms Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#14213D]">
                Connected E-Commerce & Delivery Apps
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              SlotDrop automatically pulls your orders from Amazon, Flipkart, Myntra, Nykaa & Apple Store and notifies you the second couriers reach the society gate.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Simulate New Order</span>
            </button>

            <button
              onClick={syncPlatformOrders}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-blue-700 shadow-xs transition flex items-center gap-2 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Apps Now'}</span>
            </button>
          </div>
        </div>

        {/* Platform Integration Badges / Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {connectedPlatforms.map((plat) => {
            return (
              <div
                key={plat.id}
                onClick={() => togglePlatformConnection(plat.id)}
                className={`p-2.5 rounded-xl border text-center transition cursor-pointer select-none flex flex-col justify-between ${
                  plat.connected
                    ? 'border-slate-200 bg-white hover:border-[#2563EB] shadow-2xs'
                    : 'border-slate-200/60 bg-slate-50 opacity-50 hover:opacity-80'
                }`}
                title={`Click to ${plat.connected ? 'disconnect' : 'connect'} ${plat.name}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: plat.connected ? plat.color : '#94a3b8' }}
                  ></span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${plat.connected ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {plat.connected ? 'Live' : 'Off'}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-800 truncate">{plat.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                  {plat.connected ? plat.lastSync : 'Connect'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inbound Live Tracking Stream */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div>
            <h3 className="text-base font-bold text-[#14213D] flex items-center gap-2">
              <span>Orders Placed Online (Yet to Reach Society Gate)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {inboundOrders.length} In Transit
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              These items are dispatched by external couriers. Once they reach the Society Gate Concierge, they immediately transition to your "Received at Gate" queue for doorstep slot selection.
            </p>
          </div>

          {/* Quick Platform Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedPlatformFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedPlatformFilter === 'all'
                  ? 'bg-[#14213D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Apps ({inboundOrders.length})
            </button>
            {['amazon', 'flipkart', 'myntra', 'nykaa', 'apple'].map((pid) => {
              const count = inboundOrders.filter(o => o.platformId === pid).length;
              if (count === 0) return null;
              return (
                <button
                  key={pid}
                  onClick={() => setSelectedPlatformFilter(pid)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                    selectedPlatformFilter === pid
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pid} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Cards List */}
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            <Truck className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-bold text-slate-700">No active orders in transit from this platform</p>
            <p className="text-xs text-slate-400 mt-1">All ordered items have either arrived at the gate or been delivered.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredOrders.map((order) => {
              return (
                <div 
                  key={order.id} 
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 transition shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left info */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 border border-slate-200">
                      {order.thumbnail}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-extrabold text-white" 
                          style={{ backgroundColor: order.platformColor }}
                        >
                          {order.platformName}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#14213D]">{order.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono">AWB: {order.trackingId}</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-800">{order.itemName}</h4>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>Courier: <strong>{order.carrierPartner}</strong></span>
                        <span>•</span>
                        <span className="text-amber-700 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Expected: {order.estimatedArrival}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-medium mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                        <span>Status: <strong>{order.statusStep}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Action to simulate gate delivery */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200 text-center">
                      ⏳ Yet to be Delivered to Society Gate
                    </span>

                    <button
                      onClick={() => simulateOrderArrivalAtGate(order.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#14213D] hover:bg-slate-800 text-white shadow-xs transition flex items-center justify-center gap-1.5 group"
                      title="Test courier handing package to Society Gate 2 Reception"
                    >
                      <span>Simulate Gate Arrival</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add New Simulated Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#14213D] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-sm">Simulate Online Order Placement</h3>
                  <p className="text-xs text-slate-300">Test auto-sync from Amazon, Flipkart, Myntra, Nykaa & Apple.</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select App / Platform *
                </label>
                <select
                  value={newOrderForm.platformId}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, platformId: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="amazon">Amazon India</option>
                  <option value="flipkart">Flipkart</option>
                  <option value="myntra">Myntra Fashion</option>
                  <option value="nykaa">Nykaa</option>
                  <option value="apple">Apple Store Online</option>
                  <option value="zara">Zara India</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Item Description *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kindle Paperwhite, Nike Running Shoes"
                  value={newOrderForm.itemName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, itemName: e.target.value })}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Estimated Courier Delivery
                </label>
                <input
                  type="text"
                  value={newOrderForm.estimatedArrival}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, estimatedArrival: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-blue-700 shadow-xs"
                >
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

