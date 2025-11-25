import axios from "axios";

const API_BASE = "https://social-media-content-analyzer-y07o.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export default api;
