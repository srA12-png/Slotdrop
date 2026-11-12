// Mock data for SlotDrop residential society internal parcel platform

export const SOCIETY_INFO = {
  name: "Greenwood Heights Residential Society",
  shortName: "Greenwood Heights",
  address: "Sector 45, High-Rise Towers A-D, Bengaluru",
  totalApartments: 240,
  conciergeDesk: "Tower A Ground Lobby (Gate 2)",
  operatingHours: "07:00 AM - 10:30 PM",
  phone: "+91 98765 43210",
  internalPolicy: "Parcels delivered internally by verified society staff. 100% OTP verified at doorstep. No outside courier entry beyond security gate."
};

export const INITIAL_USERS = [
  {
    id: "user-res-1",
    name: "Aarav Sharma",
    email: "resident@slotdrop.com",
    role: "resident",
    unit: "Tower B - 804",
    phone: "+91 98234 56789",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    familyMembers: ["Priya Sharma", "Rohan Sharma (Child)"]
  },
  {
    id: "user-res-2",
    name: "Sneha Patel",
    email: "sneha@slotdrop.com",
    role: "resident",
    unit: "Tower A - 402",
    phone: "+91 98111 22334",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    familyMembers: ["Vikram Patel"]
  },
  {
    id: "user-admin-1",
    name: "Rajesh Varma",
    email: "admin@slotdrop.com",
    role: "admin",
    unit: "Estate Management Office",
    phone: "+91 98700 11223",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    designation: "Chief Facility Manager"
  },
  {
    id: "user-staff-1",
    name: "Manoj Kumar",
    email: "staff@slotdrop.com",
    role: "staff",
    unit: "Internal Logistics Team",
    phone: "+91 97654 32109",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    badgeNumber: "EMP-408",
    rating: 4.9,
    assignedTower: "Tower B & Tower C"
  },
  {
    id: "user-staff-2",
    name: "Suresh Patil",
    email: "suresh@slotdrop.com",
    role: "staff",
    unit: "Internal Logistics Team",
    phone: "+91 97654 99887",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    badgeNumber: "EMP-412",
    rating: 4.8,
    assignedTower: "Tower A & Tower D"
  }
];

export const DELIVERY_SLOTS = [
  { id: "slot-1", label: "Morning Slot 1", timeWindow: "08:30 AM - 10:00 AM", availableCapacity: 12, maxCapacity: 15, active: true },
  { id: "slot-2", label: "Morning Slot 2", timeWindow: "10:30 AM - 12:00 PM", availableCapacity: 8, maxCapacity: 15, active: true },
  { id: "slot-3", label: "Afternoon Slot", timeWindow: "02:00 PM - 03:30 PM", availableCapacity: 14, maxCapacity: 15, active: true },
  { id: "slot-4", label: "Evening Rush Slot 1", timeWindow: "05:00 PM - 06:30 PM", availableCapacity: 4, maxCapacity: 18, active: true },
  { id: "slot-5", label: "Prime Evening Slot 2", timeWindow: "07:00 PM - 08:30 PM", availableCapacity: 2, maxCapacity: 20, active: true },
  { id: "slot-6", label: "Night Express Slot", timeWindow: "09:00 PM - 10:00 PM", availableCapacity: 10, maxCapacity: 12, active: true }
];

// Connected E-commerce & Delivery Platforms for Live Sync (Amazon, Flipkart, Myntra, Nykaa, Apple, Zara, etc.)
export const CONNECTED_PLATFORMS = [
  {
    id: "amazon",
    name: "Amazon",
    iconKey: "amazon",
    color: "#FF9900",
    bgColor: "#FFF7ED",
    borderColor: "#FED7AA",
    connected: true,
    lastSync: "Just now",
    accountEmail: "aarav.sharma@gmail.com",
    activeOrdersCount: 2
  },
  {
    id: "flipkart",
    name: "Flipkart",
    iconKey: "flipkart",
    color: "#2874F0",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    connected: true,
    lastSync: "3 mins ago",
    accountEmail: "aarav.sharma@gmail.com",
    activeOrdersCount: 1
  },
  {
    id: "myntra",
    name: "Myntra",
    iconKey: "myntra",
    color: "#FF3F6C",
    bgColor: "#FFF1F2",
    borderColor: "#FECDD3",
    connected: true,
    lastSync: "5 mins ago",
    accountEmail: "aarav.sharma@gmail.com",
    activeOrdersCount: 1
  },
  {
    id: "nykaa",
    name: "Nykaa",
    iconKey: "nykaa",
    color: "#E80071",
    bgColor: "#FDF2F8",
    borderColor: "#FBCFE8",
    connected: true,
    lastSync: "8 mins ago",
    accountEmail: "aarav.sharma@gmail.com",
    activeOrdersCount: 1
  },
  {
    id: "apple",
    name: "Apple Store",
    iconKey: "apple",
    color: "#000000",
    bgColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    connected: true,
    lastSync: "25 mins ago",
    accountEmail: "aarav.sharma@icloud.com",
    activeOrdersCount: 1
  },
  {
    id: "zara",
    name: "Zara / Inditex",
    iconKey: "zara",
    color: "#1E293B",
    bgColor: "#F1F5F9",
    borderColor: "#CBD5E1",
    connected: false,
    lastSync: "Not connected",
    accountEmail: null,
    activeOrdersCount: 0
  }
];

// Inbound Online App Orders (Ordered online, yet to reach society gate)
export const INITIAL_INBOUND_ORDERS = [
  {
    id: "ORD-AMZ-99120",
    platformId: "amazon",
    platformName: "Amazon",
    platformColor: "#FF9900",
    itemName: "Sony WH-1000XM5 Noise Cancelling Headphones",
    category: "Electronics",
    orderDate: "2026-11-09T18:30:00",
    estimatedArrival: "Today, by 02:00 PM",
    trackingId: "AWB-4091823901",
    carrierPartner: "Amazon Logistics / ATS",
    inboundStatus: "yet_to_deliver",
    statusStep: "Out for courier delivery to society gate",
    thumbnail: "🎧",
    recipientId: "user-res-1",
    recipientUnit: "Tower B - 804"
  },
  {
    id: "ORD-FK-78210",
    platformId: "flipkart",
    platformName: "Flipkart",
    platformColor: "#2874F0",
    itemName: "Mi Smart Air Purifier 4 (HEPA Filter)",
    category: "Home Appliances",
    orderDate: "2026-11-08T14:15:00",
    estimatedArrival: "Tomorrow, Nov 11",
    trackingId: "FMPC-8829104",
    carrierPartner: "Ekart Logistics",
    inboundStatus: "yet_to_deliver",
    statusStep: "Shipped from Bengaluru Fulfillment Center",
    thumbnail: "💨",
    recipientId: "user-res-1",
    recipientUnit: "Tower B - 804"
  },
  {
    id: "ORD-MYN-5521",
    platformId: "myntra",
    platformName: "Myntra",
    platformColor: "#FF3F6C",
    itemName: "Nike Air Zoom Pegasus 40 Running Shoes",
    category: "Footwear",
    orderDate: "2026-11-09T21:00:00",
    estimatedArrival: "Today, by 04:30 PM",
    trackingId: "DEL-MYN-99881",
    carrierPartner: "Delhivery Surface",
    inboundStatus: "yet_to_deliver",
    statusStep: "Dispatched from Hub, on delivery van",
    thumbnail: "👟",
    recipientId: "user-res-1",
    recipientUnit: "Tower B - 804"
  },
  {
    id: "ORD-NYK-9041",
    platformId: "nykaa",
    platformName: "Nykaa",
    platformColor: "#E80071",
    itemName: "Estée Lauder Advanced Night Repair Serum",
    category: "Cosmetics",
    orderDate: "2026-11-10T09:00:00",
    estimatedArrival: "Today, by 06:00 PM",
    trackingId: "NYK-EXP-4410",
    carrierPartner: "BlueDart Express",
    inboundStatus: "yet_to_deliver",
    statusStep: "Out for courier delivery to society gate",
    thumbnail: "✨",
    recipientId: "user-res-1",
    recipientUnit: "Tower B - 804"
  }
];

export const INITIAL_PARCELS = [
  {
    id: "PKG-8902",
    trackingNumber: "IN-GW-8902",
    orderRef: "ORD-AMZ-88120",
    platformId: "amazon",
    platformName: "Amazon",
    recipientId: "user-res-1",
    recipientName: "Aarav Sharma",
    unit: "Tower B - 804",
    carrierOrigin: "Amazon Logistics / ATS",
    sender: "Amazon India Fulfillment",
    shelfLocation: "Bay B2 - Shelf 4",
    status: "received_at_gate", // received_at_gate, slot_scheduled, out_for_delivery, delivered
    category: "Electronics",
    size: "Medium Box",
    isFragile: true,
    receivedAt: "2026-11-10T08:15:00",
    receivedByStaff: "Suresh Patil (Gate Guard Desk)",
    scheduledSlotId: null,
    scheduledDate: null,
    assignedStaffId: null,
    otp: "4829",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received at Society Concierge Desk",
        description: "Checked in by Suresh Patil. Inspected undamaged. Placed in Bay B2.",
        timestamp: "2026-11-10T08:15:00"
      }
    ]
  },
  {
    id: "PKG-8891",
    trackingNumber: "IN-GW-8891",
    orderRef: "ORD-MYN-4412",
    platformId: "myntra",
    platformName: "Myntra",
    recipientId: "user-res-1",
    recipientName: "Aarav Sharma",
    unit: "Tower B - 804",
    carrierOrigin: "Delhivery / Myntra",
    sender: "Myntra Fashion Logistics",
    shelfLocation: "Bay A1 - Shelf 1",
    status: "slot_scheduled",
    category: "Apparel",
    size: "Flyer Pouch",
    isFragile: false,
    receivedAt: "2026-11-10T07:45:00",
    receivedByStaff: "Suresh Patil (Gate Guard Desk)",
    scheduledSlotId: "slot-5",
    scheduledSlotLabel: "Prime Evening Slot 2 (07:00 PM - 08:30 PM)",
    scheduledDate: "2026-11-10",
    assignedStaffId: "user-staff-1",
    assignedStaffName: "Manoj Kumar",
    otp: "7314",
    deliveryInstructions: "Ring bell twice, leave with neighbor 803 if door not answered in 2 mins.",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received at Society Concierge Desk",
        description: "Logged by Suresh Patil. Tagged Bay A1.",
        timestamp: "2026-11-10T07:45:00"
      },
      {
        status: "slot_scheduled",
        label: "Slot Confirmed by Resident",
        description: "Scheduled for Today Prime Evening Slot (07:00 PM - 08:30 PM). Assigned to Manoj Kumar.",
        timestamp: "2026-11-10T09:10:00"
      }
    ]
  },
  {
    id: "PKG-8874",
    trackingNumber: "IN-GW-8874",
    orderRef: "ORD-FK-2210",
    platformId: "flipkart",
    platformName: "Flipkart",
    recipientId: "user-res-1",
    recipientName: "Aarav Sharma",
    unit: "Tower B - 804",
    carrierOrigin: "Ekart Logistics",
    sender: "Flipkart (Book Bundle)",
    shelfLocation: "Bay B1 - Shelf 2",
    status: "out_for_delivery",
    category: "Books & Stationery",
    size: "Medium Box",
    isFragile: false,
    receivedAt: "2026-11-10T09:30:00",
    receivedByStaff: "Manoj Kumar",
    scheduledSlotId: "slot-2",
    scheduledSlotLabel: "Morning Slot 2 (10:30 AM - 12:00 PM)",
    scheduledDate: "2026-11-10",
    assignedStaffId: "user-staff-1",
    assignedStaffName: "Manoj Kumar",
    otp: "5921",
    deliveryInstructions: "",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received at Society Concierge Desk",
        description: "Stored in Bay B1. Alert sent to resident.",
        timestamp: "2026-11-10T09:30:00"
      },
      {
        status: "slot_scheduled",
        label: "Internal Delivery Slot Selected",
        description: "Resident booked Morning Slot 2.",
        timestamp: "2026-11-10T09:40:00"
      },
      {
        status: "out_for_delivery",
        label: "Out for Doorstep Delivery",
        description: "Staff Manoj Kumar picked up parcel and entered Tower B elevator.",
        timestamp: "2026-11-10T10:35:00"
      }
    ]
  },
  {
    id: "PKG-8750",
    trackingNumber: "IN-GW-8750",
    orderRef: "ORD-AMZ-7719",
    platformId: "amazon",
    platformName: "Amazon",
    recipientId: "user-res-1",
    recipientName: "Aarav Sharma",
    unit: "Tower B - 804",
    carrierOrigin: "DTDC / Amazon Seller",
    sender: "Amazon India (Crossword Books)",
    shelfLocation: "Delivered (Bay D)",
    status: "delivered",
    category: "Books",
    size: "Small Box",
    isFragile: false,
    receivedAt: "2026-11-09T14:10:00",
    receivedByStaff: "Manoj Kumar",
    scheduledSlotId: "slot-4",
    scheduledSlotLabel: "Evening Rush Slot 1 (05:00 PM - 06:30 PM)",
    scheduledDate: "2026-11-09",
    assignedStaffId: "user-staff-1",
    assignedStaffName: "Manoj Kumar",
    otp: "1894",
    deliveredAt: "2026-11-09T17:42:00",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received at Gate Concierge Desk",
        description: "Scanned and verified.",
        timestamp: "2026-11-09T14:10:00"
      },
      {
        status: "slot_scheduled",
        label: "Internal Slot Confirmed",
        description: "Scheduled for Evening Slot.",
        timestamp: "2026-11-09T15:00:00"
      },
      {
        status: "out_for_delivery",
        label: "Staff en-route",
        description: "Staff Manoj Kumar dispatched.",
        timestamp: "2026-11-09T17:25:00"
      },
      {
        status: "delivered",
        label: "Delivered Successfully to Resident",
        description: "Handed over to Aarav Sharma. 4-digit OTP verified.",
        timestamp: "2026-11-09T17:42:00"
      }
    ]
  },
  {
    id: "PKG-8898",
    trackingNumber: "IN-GW-8898",
    orderRef: "ORD-NYK-102",
    platformId: "nykaa",
    platformName: "Nykaa",
    recipientId: "user-res-2",
    recipientName: "Sneha Patel",
    unit: "Tower A - 402",
    carrierOrigin: "FedEx / Nykaa",
    sender: "Nykaa Beauty Pvt Ltd",
    shelfLocation: "Bay A2 - Shelf 3",
    status: "received_at_gate",
    category: "Cosmetics",
    size: "Small Box",
    isFragile: true,
    receivedAt: "2026-11-10T09:15:00",
    receivedByStaff: "Suresh Patil",
    scheduledSlotId: null,
    scheduledDate: null,
    assignedStaffId: null,
    otp: "6240",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received at Society Concierge Desk",
        description: "Logged by Suresh Patil. Waiting for resident slot confirmation.",
        timestamp: "2026-11-10T09:15:00"
      }
    ]
  },
  {
    id: "PKG-8899",
    trackingNumber: "IN-GW-8899",
    orderRef: "ORD-APL-998",
    platformId: "apple",
    platformName: "Apple Store",
    recipientId: "user-res-2",
    recipientName: "Sneha Patel",
    unit: "Tower A - 402",
    carrierOrigin: "BlueDart / Apple",
    sender: "Apple India Direct",
    shelfLocation: "Secure Safe Bay S1",
    status: "slot_scheduled",
    category: "High-Value Electronics",
    size: "Medium Box",
    isFragile: true,
    receivedAt: "2026-11-10T08:45:00",
    receivedByStaff: "Suresh Patil",
    scheduledSlotId: "slot-5",
    scheduledSlotLabel: "Prime Evening Slot 2 (07:00 PM - 08:30 PM)",
    scheduledDate: "2026-11-10",
    assignedStaffId: "user-staff-2",
    assignedStaffName: "Suresh Patil",
    otp: "9912",
    deliveryInstructions: "Call before knocking. High value order.",
    timeline: [
      {
        status: "received_at_gate",
        label: "Received & Locked in Secure Safe Bay",
        description: "Logged by Suresh Patil.",
        timestamp: "2026-11-10T08:45:00"
      },
      {
        status: "slot_scheduled",
        label: "Internal Delivery Scheduled",
        description: "Resident Sneha scheduled for Prime Evening Slot.",
        timestamp: "2026-11-10T09:05:00"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-sync-1",
    recipientId: "user-res-1",
    title: "Amazon Order Synced & In Transit",
    message: "Your Amazon order 'Sony WH-1000XM5' is out for delivery with courier. Expected at society gate by 02:00 PM today.",
    type: "platform_sync",
    timestamp: "2026-11-10T10:15:00",
    read: false,
    platform: "Amazon"
  },
  {
    id: "notif-1",
    recipientId: "user-res-1",
    title: "New Parcel at Society Gate Desk",
    message: "Amazon India parcel (PKG-8902) received by Suresh Patil. Please choose your preferred doorstep delivery slot.",
    type: "parcel_received",
    timestamp: "2026-11-10T08:16:00",
    read: false,
    parcelId: "PKG-8902"
  },
  {
    id: "notif-2",
    recipientId: "user-res-1",
    title: "Parcel Out for Doorstep Delivery!",
    message: "Staff Manoj Kumar is on his way to Tower B - 804 with your parcel (PKG-8874). Keep OTP 5921 ready.",
    type: "out_for_delivery",
    timestamp: "2026-11-10T10:35:00",
    read: false,
    parcelId: "PKG-8874"
  },
  {
    id: "notif-3",
    recipientId: "user-res-1",
    title: "Doorstep Slot Confirmed",
    message: "Your Myntra parcel (PKG-8891) is scheduled for delivery today between 07:00 PM - 08:30 PM.",
    type: "slot_confirmed",
    timestamp: "2026-11-10T09:10:00",
    read: true,
    parcelId: "PKG-8891"
  },
  {
    id: "notif-4",
    recipientId: "user-admin-1",
    title: "Daily Inflow Peak: 48 Parcels",
    message: "Gate 2 concierge desk has received 48 external parcels today. Peak slot demand between 7:00 PM - 8:30 PM.",
    type: "admin_alert",
    timestamp: "2026-11-10T09:45:00",
    read: false
  }
];

export const RESIDENTS_DIRECTORY = [
  { id: "user-res-1", name: "Aarav Sharma", unit: "Tower B - 804", phone: "+91 98234 56789", email: "resident@slotdrop.com", status: "Active", pendingParcels: 2, totalReceivedMonth: 14 },
  { id: "user-res-2", name: "Sneha Patel", unit: "Tower A - 402", phone: "+91 98111 22334", email: "sneha@slotdrop.com", status: "Active", pendingParcels: 2, totalReceivedMonth: 19 },
  { id: "user-res-3", name: "Vikram Sengupta", unit: "Tower C - 1201", phone: "+91 99002 33445", email: "vikram@example.com", status: "Active", pendingParcels: 0, totalReceivedMonth: 8 },
  { id: "user-res-4", name: "Deepa Nambiar", unit: "Tower B - 302", phone: "+91 97412 88990", email: "deepa@example.com", status: "Active", pendingParcels: 1, totalReceivedMonth: 22 },
  { id: "user-res-5", name: "Rohan & Ananya Roy", unit: "Tower D - 905", phone: "+91 98300 44556", email: "rohan.roy@example.com", status: "Active", pendingParcels: 0, totalReceivedMonth: 11 },
  { id: "user-res-6", name: "Kavita Rao", unit: "Tower A - 701", phone: "+91 98450 77112", email: "kavita@example.com", status: "Vacation Hold", pendingParcels: 0, totalReceivedMonth: 5 }
];

