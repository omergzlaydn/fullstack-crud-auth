import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: localStorage.getItem("token") || null,
  },
});

export default api;
