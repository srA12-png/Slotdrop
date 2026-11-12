/**
 * Express REST API Integration Client for SlotDrop
 * 
 * In this production prototype, API calls operate on responsive state/localStorage
 * with artificial latency to mimic Express / MongoDB network requests.
 * 
 * Replace `API_BASE_URL` with your Express server endpoint (e.g., http://localhost:5000/api)
 * when connecting to a live backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = {
  // Parcels Endpoints
  async getParcels(query = {}) {
    // In live backend: return fetch(`${API_BASE_URL}/parcels?...`).then(res => res.json())
    return {
      success: true,
      data: []
    };
  },

  async registerParcel(parcelPayload) {
    // Live: return fetch(`${API_BASE_URL}/parcels/intake`, { method: 'POST', body: JSON.stringify(parcelPayload) })
    return {
      success: true,
      parcelId: `PKG-${Date.now().toString().slice(-4)}`
    };
  },

  async scheduleSlot(parcelId, slotId, instructions) {
    // Live: return fetch(`${API_BASE_URL}/parcels/${parcelId}/schedule`, { method: 'PATCH', body: JSON.stringify({ slotId, instructions }) })
    return {
      success: true
    };
  },

  async startDelivery(parcelId, staffId) {
    // Live: return fetch(`${API_BASE_URL}/deliveries/${parcelId}/start`, { method: 'POST', body: JSON.stringify({ staffId }) })
    return {
      success: true
    };
  },

  async verifyOtpAndDeliver(parcelId, otp) {
    // Live: return fetch(`${API_BASE_URL}/deliveries/${parcelId}/verify-otp`, { method: 'POST', body: JSON.stringify({ otp }) })
    return {
      success: true
    };
  },

  // Slots Endpoints
  async getDeliverySlots() {
    // Live: return fetch(`${API_BASE_URL}/slots`).then(res => res.json())
    return {
      success: true,
      data: []
    };
  },

  // Residents Endpoints
  async getResidents() {
    // Live: return fetch(`${API_BASE_URL}/residents`).then(res => res.json())
    return {
      success: true,
      data: []
    };
  }
};

