import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { ResidentDashboard } from './components/resident/ResidentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { LoginView } from './components/auth/LoginView';

const MainContent = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState(() => {
    if (!currentUser) return 'login';
    if (currentUser.role === 'resident') return 'resident-parcels';
    if (currentUser.role === 'admin') return 'admin-overview';
    if (currentUser.role === 'staff') return 'staff-tasks';
    return 'resident-parcels';
  });

  // If role changes, ensure activeTab matches role
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'resident' && !activeTab.startsWith('resident')) {
        setActiveTab('resident-parcels');
      } else if (currentUser.role === 'admin' && !activeTab.startsWith('admin')) {
        setActiveTab('admin-overview');
      } else if (currentUser.role === 'staff' && !activeTab.startsWith('staff')) {
        setActiveTab('staff-tasks');
      }
    }
  }, [currentUser?.role]);

  if (!currentUser) {
    return <LoginView onLoginSuccess={() => setActiveTab('resident-parcels')} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {currentUser.role === 'resident' && (
        <ResidentDashboard subTab={activeTab} />
      )}
      {currentUser.role === 'admin' && (
        <AdminDashboard subTab={activeTab} />
      )}
      {currentUser.role === 'staff' && (
        <StaffDashboard subTab={activeTab} />
      )}
    </Layout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </BrowserRouter>
  );
}

