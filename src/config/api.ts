// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://167.99.60.245:7900",  // Changed to HTTPS
  ENDPOINTS: {
    CHAT: "/chat"
  },
  // Authentication settings
  AUTH: {
    TYPE: "Basic",
    USERNAME: "admin",
    PASSWORD: "password123",
  },
  // Request settings
  REQUEST: {
    TIMEOUT: 30000,
    HEADERS: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
} as const;

// Authentication utilities
export const getAuthHeader = () => {
  const { AUTH } = API_CONFIG;
  
  switch (AUTH.TYPE) {
    case "Basic":
      return {
        "Authorization": `Basic ${btoa(`${AUTH.USERNAME}:${AUTH.PASSWORD}`)}`
      };
    case "Bearer":
      return {};
    default:
      return {};
  }
};