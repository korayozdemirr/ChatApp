// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.110:4002", // Global baseURL
});

export default axiosInstance;