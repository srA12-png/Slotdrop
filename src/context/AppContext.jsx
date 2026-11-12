import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_PARCELS, 
  INITIAL_NOTIFICATIONS, 
  DELIVERY_SLOTS,
  RESIDENTS_DIRECTORY,
  CONNECTED_PLATFORMS,
  INITIAL_INBOUND_ORDERS
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current logged in user (defaults to Resident Aarav Sharma for instant preview)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('slotdrop_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS[0]; // Aarav Sharma (resident)
  });

  const [parcels, setParcels] = useState(() => {
    const saved = localStorage.getItem('slotdrop_parcels');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PARCELS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('slotdrop_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [deliverySlots, setDeliverySlots] = useState(() => {
    const saved = localStorage.getItem('slotdrop_slots');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DELIVERY_SLOTS;
  });

  // Connected shopping platforms (Amazon, Flipkart, Myntra, Nykaa, Apple Store, etc.)
  const [connectedPlatforms, setConnectedPlatforms] = useState(() => {
    const saved = localStorage.getItem('slotdrop_connected_platforms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return CONNECTED_PLATFORMS;
  });

  // Inbound online orders (ordered online, yet to reach society gate)
  const [inboundOrders, setInboundOrders] = useState(() => {
    const saved = localStorage.getItem('slotdrop_inbound_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_INBOUND_ORDERS;
  });

  const [residents, setResidents] = useState(RESIDENTS_DIRECTORY);
  const [activeToast, setActiveToast] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('slotdrop_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('slotdrop_parcels', JSON.stringify(parcels));
  }, [parcels]);

  useEffect(() => {
    localStorage.setItem('slotdrop_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('slotdrop_slots', JSON.stringify(deliverySlots));
  }, [deliverySlots]);

  useEffect(() => {
    localStorage.setItem('slotdrop_connected_platforms', JSON.stringify(connectedPlatforms));
  }, [connectedPlatforms]);

  useEffect(() => {
    localStorage.setItem('slotdrop_inbound_orders', JSON.stringify(inboundOrders));
  }, [inboundOrders]);

  const showToast = (message, type = 'success') => {
    setActiveToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  // Switch role or login
  const switchUser = (userOrId) => {
    let target;
    if (typeof userOrId === 'string') {
      target = INITIAL_USERS.find(u => u.id === userOrId || u.role === userOrId);
    } else {
      target = userOrId;
    }
    if (target) {
      setCurrentUser(target);
      showToast(`Switched account to ${target.name} (${target.role.toUpperCase()})`, 'info');
    }
  };

  const loginAs = (role) => {
    const target = INITIAL_USERS.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      showToast(`Logged in as ${target.name} (${role.toUpperCase()})`, 'success');
      return target;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Sync platforms now (Simulate live auto-updating order statuses from Amazon, Flipkart, etc.)
  const syncPlatformOrders = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const now = "Just now";
      setConnectedPlatforms(prev => prev.map(p => ({
        ...p,
        lastSync: p.connected ? now : p.lastSync
      })));
      setIsSyncing(false);
      showToast('Synced active orders from Amazon, Flipkart, Myntra & Nykaa!', 'success');
    }, 900);
  };

  // Simulate courier delivering an online order to Society Gate Concierge
  // Converts an inbound order (e.g. from Amazon) into a received Gate Parcel
  const simulateOrderArrivalAtGate = (orderId) => {
    const order = inboundOrders.find(o => o.id === orderId);
    if (!order) return;

    // Remove from inbound or mark arrived
    setInboundOrders(prev => prev.filter(o => o.id !== orderId));

    // Create new received parcel at gate desk
    const generatedId = `PKG-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newParcel = {
      id: generatedId,
      trackingNumber: `IN-GW-${generatedId.split('-')[1]}`,
      orderRef: order.id,
      platformId: order.platformId,
      platformName: order.platformName,
      recipientId: order.recipientId,
      recipientName: currentUser?.name || 'Aarav Sharma',
      unit: order.recipientUnit,
      carrierOrigin: `${order.carrierPartner} (${order.platformName})`,
      sender: `${order.platformName} Fulfillment (${order.itemName})`,
      shelfLocation: "Bay A2 - Shelf 1",
      status: "received_at_gate",
      category: order.category,
      size: "Medium Box",
      isFragile: false,
      receivedAt: new Date().toISOString(),
      receivedByStaff: "Suresh Patil (Gate Guard Desk)",
      scheduledSlotId: null,
      scheduledDate: null,
      assignedStaffId: null,
      otp: randomOtp,
      timeline: [
        {
          status: "received_at_gate",
          label: "Courier Delivered to Society Gate Concierge",
          description: `${order.platformName} package delivered by ${order.carrierPartner}. Stored in Bay A2.`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setParcels(prev => [newParcel, ...prev]);

    // Push notification
    const notif = {
      id: `notif-${Date.now()}`,
      recipientId: order.recipientId,
      title: `${order.platformName} Order Arrived at Society Gate!`,
      message: `Your ${order.itemName} from ${order.platformName} was delivered to Gate 2 Concierge desk. Please choose your internal doorstep slot.`,
      type: 'parcel_received',
      timestamp: new Date().toISOString(),
      read: false,
      parcelId: generatedId
    };
    setNotifications(prev => [notif, ...prev]);

    showToast(`Courier arrived! ${order.platformName} order moved to Received at Gate desk.`, 'success');
  };

  // Toggle connection of an e-commerce platform
  const togglePlatformConnection = (platformId) => {
    setConnectedPlatforms(prev => prev.map(p => {
      if (p.id === platformId) {
        const nextState = !p.connected;
        return {
          ...p,
          connected: nextState,
          lastSync: nextState ? "Just now" : "Disconnected",
          accountEmail: nextState ? "aarav.sharma@gmail.com" : null
        };
      }
      return p;
    }));

    const platform = connectedPlatforms.find(p => p.id === platformId);
    showToast(`${platform?.name} integration ${platform?.connected ? 'disconnected' : 'connected & synced'}!`, 'info');
  };

  // Add custom inbound simulated order (e.g. from user form)
  const addNewInboundOrder = (orderData) => {
    const platform = connectedPlatforms.find(p => p.id === orderData.platformId) || {
      name: "Amazon",
      color: "#FF9900"
    };

    const newOrder = {
      id: `ORD-${orderData.platformId.toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`,
      platformId: orderData.platformId,
      platformName: platform.name,
      platformColor: platform.color,
      itemName: orderData.itemName,
      category: orderData.category || "General",
      orderDate: new Date().toISOString(),
      estimatedArrival: orderData.estimatedArrival || "Today by 06:00 PM",
      trackingId: `AWB-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      carrierPartner: `${platform.name} Delivery Network`,
      inboundStatus: "yet_to_deliver",
      statusStep: "Courier dispatched to society gate",
      thumbnail: "📦",
      recipientId: currentUser?.id || "user-res-1",
      recipientUnit: currentUser?.unit || "Tower B - 804"
    };

    setInboundOrders(prev => [newOrder, ...prev]);

    // Push notification
    const notif = {
      id: `notif-${Date.now()}`,
      recipientId: newOrder.recipientId,
      title: `New ${platform.name} Order Tracked`,
      message: `'${newOrder.itemName}' ordered on ${platform.name}. Status: Yet to be delivered to society gate.`,
      type: 'platform_sync',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [notif, ...prev]);

    showToast(`Tracked new ${platform.name} order! Will auto-update upon gate arrival.`, 'success');
  };

  // Schedule a slot for a parcel (Resident action)
  const scheduleParcelSlot = (parcelId, slotId, instructions = '') => {
    const slot = deliverySlots.find(s => s.id === slotId);
    if (!slot) return false;

    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        const updatedTimeline = [
          ...p.timeline,
          {
            status: 'slot_scheduled',
            label: 'Doorstep Delivery Slot Scheduled',
            description: `Scheduled by resident for ${slot.label} (${slot.timeWindow}). ${instructions ? `Instructions: "${instructions}"` : ''}`,
            timestamp: new Date().toISOString()
          }
        ];

        return {
          ...p,
          status: 'slot_scheduled',
          scheduledSlotId: slot.id,
          scheduledSlotLabel: `${slot.label} (${slot.timeWindow})`,
          scheduledDate: new Date().toISOString().split('T')[0],
          deliveryInstructions: instructions || p.deliveryInstructions,
          assignedStaffId: 'user-staff-1',
          assignedStaffName: 'Manoj Kumar',
          timeline: updatedTimeline
        };
      }
      return p;
    }));

    // Update slot capacity
    setDeliverySlots(prev => prev.map(s => {
      if (s.id === slotId && s.availableCapacity > 0) {
        return { ...s, availableCapacity: s.availableCapacity - 1 };
      }
      return s;
    }));

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      recipientId: currentUser?.id,
      title: 'Slot Confirmed!',
      message: `Your package ${parcelId} is scheduled for ${slot.label} (${slot.timeWindow}). Internal delivery staff will verify OTP at your doorstep.`,
      type: 'slot_confirmed',
      timestamp: new Date().toISOString(),
      read: false,
      parcelId
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Slot booked for ${slot.timeWindow}! Internal staff assigned.`, 'success');
    return true;
  };

  // Admin registers new parcel received at society gate concierge
  const registerNewParcel = (parcelData) => {
    const generatedId = `PKG-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newParcel = {
      id: generatedId,
      trackingNumber: `IN-GW-${generatedId.split('-')[1]}`,
      recipientId: parcelData.recipientId || 'user-res-1',
      recipientName: parcelData.recipientName || 'Aarav Sharma',
      unit: parcelData.unit || 'Tower B - 804',
      carrierOrigin: parcelData.carrierOrigin || 'External Courier',
      sender: parcelData.sender || 'Retail Hub',
      shelfLocation: parcelData.shelfLocation || 'Bay A3 - Shelf 2',
      status: 'received_at_gate',
      category: parcelData.category || 'General Package',
      size: parcelData.size || 'Medium Box',
      isFragile: Boolean(parcelData.isFragile),
      receivedAt: new Date().toISOString(),
      receivedByStaff: currentUser?.name || 'Gate Concierge Desk',
      scheduledSlotId: null,
      scheduledDate: null,
      assignedStaffId: null,
      otp: randomOtp,
      deliveryInstructions: '',
      timeline: [
        {
          status: 'received_at_gate',
          label: 'Received at Society Concierge Desk',
          description: `Logged and inspected by ${currentUser?.name || 'Concierge'}. Placed in ${parcelData.shelfLocation || 'Bay A3'}.`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setParcels(prev => [newParcel, ...prev]);

    // Send notification to resident
    const notif = {
      id: `notif-${Date.now()}`,
      recipientId: newParcel.recipientId,
      title: 'New Parcel Received at Society Desk',
      message: `${newParcel.carrierOrigin} parcel from ${newParcel.sender} has arrived. Stored safely at ${newParcel.shelfLocation}. Please select your internal delivery slot.`,
      type: 'parcel_received',
      timestamp: new Date().toISOString(),
      read: false,
      parcelId: generatedId
    };
    setNotifications(prev => [notif, ...prev]);

    showToast(`Parcel ${generatedId} registered! Stored in ${newParcel.shelfLocation}. Notification pushed to resident.`, 'success');
    return newParcel;
  };

  // Staff starts doorstep delivery run
  const startDelivery = (parcelId) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        const updatedTimeline = [
          ...p.timeline,
          {
            status: 'out_for_delivery',
            label: 'Out for Doorstep Delivery',
            description: `Staff ${currentUser?.name || 'Logistics Staff'} collected package and is heading to ${p.unit}.`,
            timestamp: new Date().toISOString()
          }
        ];
        return {
          ...p,
          status: 'out_for_delivery',
          assignedStaffId: currentUser?.id || 'user-staff-1',
          assignedStaffName: currentUser?.name || 'Manoj Kumar',
          timeline: updatedTimeline
        };
      }
      return p;
    }));

    const parcel = parcels.find(p => p.id === parcelId);
    if (parcel) {
      const notif = {
        id: `notif-${Date.now()}`,
        recipientId: parcel.recipientId,
        title: 'Parcel Out for Doorstep Delivery!',
        message: `Staff ${currentUser?.name || 'Delivery Staff'} is en route to ${parcel.unit}. Your OTP is ${parcel.otp}.`,
        type: 'out_for_delivery',
        timestamp: new Date().toISOString(),
        read: false,
        parcelId
      };
      setNotifications(prev => [notif, ...prev]);
    }

    showToast(`Delivery started for ${parcelId}! Resident notified to keep OTP ready.`, 'info');
  };

  // Staff completes delivery via OTP verification
  const verifyOtpAndDeliver = (parcelId, enteredOtp) => {
    const parcel = parcels.find(p => p.id === parcelId);
    if (!parcel) {
      return { success: false, message: 'Parcel not found.' };
    }

    if (parcel.otp !== enteredOtp.trim()) {
      return { success: false, message: `Incorrect OTP! Expected 4-digit resident code.` };
    }

    // Success! Update parcel status
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        const updatedTimeline = [
          ...p.timeline,
          {
            status: 'delivered',
            label: 'Delivered Successfully to Resident',
            description: `Handed over at ${p.unit}. 4-digit OTP verified by ${currentUser?.name || 'Staff'}.`,
            timestamp: new Date().toISOString()
          }
        ];
        return {
          ...p,
          status: 'delivered',
          deliveredAt: new Date().toISOString(),
          timeline: updatedTimeline
        };
      }
      return p;
    }));

    const notif = {
      id: `notif-${Date.now()}`,
      recipientId: parcel.recipientId,
      title: 'Parcel Delivered Successfully',
      message: `Your package ${parcel.id} from ${parcel.sender} was handed over and verified via OTP. Thank you!`,
      type: 'delivered',
      timestamp: new Date().toISOString(),
      read: false,
      parcelId
    };
    setNotifications(prev => [notif, ...prev]);

    showToast(`Parcel ${parcelId} verified & handed over! Delivery completed.`, 'success');
    return { success: true, message: 'OTP verified successfully! Package marked as delivered.' };
  };

  // Mark notification read
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.recipientId === currentUser.id ? { ...n, read: true } : n));
    showToast('All notifications marked as read', 'info');
  };

  // Reset sample data
  const resetToSampleData = () => {
    setParcels(INITIAL_PARCELS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDeliverySlots(DELIVERY_SLOTS);
    setConnectedPlatforms(CONNECTED_PLATFORMS);
    setInboundOrders(INITIAL_INBOUND_ORDERS);
    localStorage.removeItem('slotdrop_parcels');
    localStorage.removeItem('slotdrop_notifications');
    localStorage.removeItem('slotdrop_slots');
    localStorage.removeItem('slotdrop_connected_platforms');
    localStorage.removeItem('slotdrop_inbound_orders');
    showToast('Reset all data to default mock state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        loginAs,
        logout,
        parcels,
        deliverySlots,
        notifications,
        residents,
        connectedPlatforms,
        inboundOrders,
        isSyncing,
        activeToast,
        showToast,
        syncPlatformOrders,
        simulateOrderArrivalAtGate,
        togglePlatformConnection,
        addNewInboundOrder,
        scheduleParcelSlot,
        registerNewParcel,
        startDelivery,
        verifyOtpAndDeliver,
        markNotificationRead,
        markAllNotificationsRead,
        resetToSampleData,
        allUsers: INITIAL_USERS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
