/**
 * API Configuration
 * In development, Vite proxy handles /api requests.
 * In production, we use the VITE_API_URL environment variable.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  BOOK: `${API_BASE_URL}/api/book`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
