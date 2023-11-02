import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL as string || "http://localhost:8081/api"
});

API.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response.status === 401 || error.response.data.message === "Missing credentials") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;