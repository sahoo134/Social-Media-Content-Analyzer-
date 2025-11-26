import axios from "axios";

const API_BASE = "https://social-media-content-analyzer-y07o.onrender.com/api";
// const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export default api;
