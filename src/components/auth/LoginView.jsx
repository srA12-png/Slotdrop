import React, { useState } from 'react';
import { 
  Package, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Building2,
  KeyRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginView = ({ onLoginSuccess }) => {
  const { allUsers, loginAs, switchUser } = useApp();
  const [selectedRole, setSelectedRole] = useState('resident');
  const [email, setEmail] = useState('resident@slotdrop.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const user = allUsers.find(u => u.role === role);
    if (user) {
      setEmail(user.email);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user = loginAs(selectedRole);
      setIsLoading(false);
      if (user && onLoginSuccess) {
        onLoginSuccess(user);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#14213D] text-white shadow-xl shadow-blue-900/10 mb-4">
          <Package className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#14213D] tracking-tight">
          SlotDrop Concierge
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Residential Society Parcel Intake & Scheduled Internal Delivery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200 rounded-3xl sm:px-10">
          {/* Persona Tabs for instant demo switching */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Demo Access Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'resident', label: 'Resident', icon: Building2 },
                { id: 'admin', label: 'Admin', icon: ShieldCheck },
                { id: 'staff', label: 'Staff', icon: Truck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedRole === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleRoleSelect(tab.id)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition ${
                      isSelected
                        ? 'bg-white text-[#14213D] shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Society Account Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Quick profile info reminder */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
              <span className="font-semibold text-[#14213D] block mb-0.5">
                {selectedRole === 'resident' && '👤 Resident: Aarav Sharma (Tower B - 804)'}
                {selectedRole === 'admin' && '🛡️ Society Admin: Rajesh Varma (Facility Office)'}
                {selectedRole === 'staff' && '🚚 Internal Logistics: Manoj Kumar (EMP-408)'}
              </span>
              <p className="text-[11px] text-slate-500">
                {selectedRole === 'resident' && 'Track arriving parcels, select doorstep slot, and receive 4-digit OTP.'}
                {selectedRole === 'admin' && 'Log arriving external couriers, assign bay shelves, and audit deliveries.'}
                {selectedRole === 'staff' && 'View today’s deliveries, start delivery runs, and verify OTP at doorsteps.'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating with Society Directory...</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security policy notice */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Outside Couriers. 100% Verified Internal Staff.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
