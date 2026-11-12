import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Package, 
  MapPin, 
  Truck, 
  ShieldAlert, 
  Sparkles,
  User,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParcelRegistrationModal = ({ isOpen, onClose }) => {
  const { registerNewParcel, residents } = useApp();

  const [formData, setFormData] = useState({
    recipientId: residents[0]?.id || 'user-res-1',
    carrierOrigin: 'Amazon India Logistics',
    sender: '',
    shelfLocation: 'Bay B1 - Shelf 2',
    category: 'Electronics',
    size: 'Medium Box',
    isFragile: false,
    externalCourierName: 'E-Kart / Delhivery'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sender.trim()) return;

    setIsSubmitting(true);
    const selectedResident = residents.find(r => r.id === formData.recipientId);

    setTimeout(() => {
      registerNewParcel({
        ...formData,
        recipientName: selectedResident?.name || 'Resident',
        unit: selectedResident?.unit || 'Tower B - 804'
      });
      setIsSubmitting(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#14213D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Concierge Parcel Intake</h3>
              <p className="text-xs text-slate-300">Society Gate 2 Reception & Shelf Bay Assignment</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Recipient Resident select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Flat / Resident *
            </label>
            <select
              value={formData.recipientId}
              onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-white"
            >
              {residents.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.unit} — {res.name} ({res.phone})
                </option>
              ))}
            </select>
          </div>

          {/* External Courier Origin & Sender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Delivered by Courier *
              </label>
              <select
                value={formData.carrierOrigin}
                onChange={(e) => setFormData({ ...formData, carrierOrigin: e.target.value })}
                className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] bg-white"
              >
                <option value="Amazon Logistics">Amazon Logistics</option>
                <option value="BlueDart Express">BlueDart Express</option>
                <option value="Delhivery Logistics">Delhivery</option>
                <option value="DTDC Courier">DTDC Courier</option>
                <option value="Shadowfax Courier">Shadowfax Courier</option>
                <option value="India Post EMS">India Post EMS</option>
                <option value="Other Courier">Other Local Courier</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Sender / Merchant Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Zara India, Apple Store"
                value={formData.sender}
                onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                required
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] bg-white"
              />
            </div>
          </div>

          {/* Storage Bay & Package Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Assigned Shelf Bay *
              </label>
              <select
                value={formData.shelfLocation}
                onChange={(e) => setFormData({ ...formData, shelfLocation: e.target.value })}
                className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] bg-white font-mono text-xs"
              >
                <option value="Bay A1 - Shelf 1">Bay A1 (Towers A/B Small)</option>
                <option value="Bay B2 - Shelf 4">Bay B2 (Medium Parcels)</option>
                <option value="Bay C3 - Heavy Pallet">Bay C3 (Heavy / Oversized)</option>
                <option value="Secure Safe Bay S1">Secure Safe Bay S1 (High Value)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] bg-white"
              >
                <option value="Electronics">Electronics</option>
                <option value="Apparel & Shoes">Apparel & Fashion</option>
                <option value="Groceries / Food">Groceries / Pantry</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Documents">Important Documents</option>
                <option value="Healthcare / Medicines">Healthcare & Pharma</option>
              </select>
            </div>
          </div>

          {/* Special Flags */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.isFragile}
                onChange={(e) => setFormData({ ...formData, isFragile: e.target.checked })}
                className="w-4 h-4 rounded text-[#2563EB] focus:ring-blue-500 border-slate-300"
              />
              <span>⚠️ Handle Fragile</span>
            </label>
          </div>

          {/* Notice */}
          <div className="text-[11px] text-slate-500 bg-slate-100 p-2.5 rounded-lg flex items-start gap-2">
            <Package className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
            <span>
              Once saved, a unique 4-digit verification OTP is automatically generated and an instant push notification is dispatched to the resident to book their doorstep slot.
            </span>
          </div>

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
              disabled={isSubmitting || !formData.sender.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm transition disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Registering...' : 'Log & Store Parcel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

