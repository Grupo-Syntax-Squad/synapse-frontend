import axios from "axios";

export const ServiceSynapse = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_URL,
  timeout: parseInt(import.meta.env.SERVICE_REQUEST_TIMEOUT) || 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
