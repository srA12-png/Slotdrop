import React, { useState } from 'react';
import { 
  Building2, 
  Package, 
  Calendar, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Layout = ({ activeTab, onTabChange, children }) => {
  const { 
    currentUser, 
    switchUser, 
    allUsers, 
    logout, 
    notifications, 
    inboundOrders,
    markAllNotificationsRead,
    resetToSampleData,
    activeToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const userNotifications = notifications.filter(
    n => !currentUser || n.recipientId === currentUser.id || currentUser.role === 'admin'
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;
  const inboundCount = inboundOrders?.length || 0;

  // Navigation tabs config based on role
  const getNavItems = () => {
    if (!currentUser) return [];

    if (currentUser.role === 'resident') {
      return [
        { id: 'resident-parcels', label: 'My Parcels & Deliveries', icon: Package },
        { id: 'resident-inbound', label: 'E-Commerce App Orders', icon: ShoppingBag, badge: inboundCount },
        { id: 'resident-slots', label: 'Slot Scheduling', icon: Calendar },
        { id: 'resident-notifications', label: 'Alerts', icon: Bell, badge: unreadCount },
        { id: 'resident-history', label: 'Past Deliveries', icon: CheckCircle },
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        { id: 'admin-overview', label: 'Executive Dashboard', icon: BarChart3 },
        { id: 'admin-parcels', label: 'Parcel Intake & Registry', icon: Package },
        { id: 'admin-residents', label: 'Resident Directory', icon: Users },
        { id: 'admin-slots', label: 'Delivery Slots & Logistics', icon: Calendar },
        { id: 'admin-analytics', label: 'Analytics & Audits', icon: ClipboardList },
      ];
    }

    if (currentUser.role === 'staff') {
      return [
        { id: 'staff-tasks', label: "Today's Delivery Runs", icon: Truck },
        { id: 'staff-verification', label: 'OTP Doorstep Verification', icon: ShieldCheck },
        { id: 'staff-history', label: 'Completed Deliveries', icon: CheckCircle },
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Toast Notification Container */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 max-w-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <p className="text-xs font-medium text-slate-100 flex-1">{activeToast.message}</p>
          </div>
        </div>
      )}

      {/* Top Banner Notice: Internal platform identity */}
      <div className="bg-[#14213D] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">Greenwood Heights Society</span>
          <span className="text-slate-400 hidden sm:inline">• Internal Doorstep Concierge & Delivery</span>
          <span className="bg-blue-900/60 text-blue-300 border border-blue-700/60 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider hidden md:inline">
            Multi-App Sync Enabled
          </span>
        </div>

        {/* Global Demo Quick Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 text-xs text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition"
            >
              <span className="text-slate-400">Role:</span>
              <strong className="capitalize text-[#2563EB] bg-blue-100 px-1.5 py-0.2 rounded text-[11px] font-bold">
                {currentUser?.role || 'Guest'}
              </strong>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Switch Persona (Quick Test)
                </div>
                {allUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      currentUser?.id === user.id ? 'bg-blue-50 font-bold text-[#2563EB]' : ''
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{user.role} • {user.unit}</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold bg-slate-100 text-slate-600">
                      {user.role}
                    </span>
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1 px-3 py-1">
                  <button
                    onClick={() => {
                      resetToSampleData();
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 py-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Mock Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-white flex items-center justify-center shadow-md">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#14213D] tracking-tight">SlotDrop</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase">
                    Concierge
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 -mt-0.5 font-medium hidden sm:block">
                  Society Internal Parcel Delivery
                </p>
              </div>
            </div>
          </div>

          {/* User Profile & Notifications Center */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifPanel(!showNotifPanel)}
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:text-[#14213D] hover:bg-slate-50 flex items-center justify-center relative transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2563EB] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifPanel && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 text-slate-800">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">Gate & App Order Alerts</h4>
                      <p className="text-[11px] text-slate-400">{userNotifications.length} updates</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {userNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications at this time.
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-3.5 hover:bg-slate-50 transition flex items-start gap-3 ${
                            !notif.read ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                            <Package className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                            <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-200">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-xs"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#14213D] leading-tight flex items-center gap-1.5">
                  {currentUser?.name}
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase bg-blue-50 text-[#2563EB] border border-blue-200">
                    {currentUser?.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{currentUser?.unit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Role Tabs Subheader */}
        <div className="hidden lg:block border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition -mb-[1px] ${
                    isActive
                      ? 'border-[#2563EB] text-[#2563EB] bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-[#14213D] hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.id === 'resident-inbound' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-[#2563EB] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
            {currentUser?.role.toUpperCase()} Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                  isActive ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-blue-600' : 'bg-[#2563EB] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#14213D]">SlotDrop</span>
            <span>• Multi-App Connected Concierge (Amazon, Flipkart, Myntra, Nykaa, Apple)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Gate Concierge Desk: Ext 404</span>
            <span>•</span>
            <span>Secure Doorstep Handover via 4-Digit OTP</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
