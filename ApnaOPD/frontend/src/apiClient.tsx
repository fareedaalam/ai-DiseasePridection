// src/api/apiClient.ts
import axios from "axios";
import API_BASE_URL from "./config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

export default apiClient;
