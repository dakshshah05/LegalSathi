import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log('API Base URL:', baseURL);

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Intercept responses to handle offline errors cleanly
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorResponse = {
      message: "An error occurred while connecting. Please try again.",
      isOffline: false
    };

    if (!error.response) {
      // Server down, network disconnected, or CORS issue
      errorResponse.message = "LegalSaathi is currently offline. Please check your internet connection or try again shortly.";
      errorResponse.isOffline = true;
    } else {
      // Server responded with an error status
      errorResponse.message = error.response.data?.detail || error.response.data?.message || error.message;
      errorResponse.status = error.response.status;
    }

    return Promise.reject(errorResponse);
  }
);

export default client;
