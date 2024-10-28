import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
let baseURL = "";

if (!isDevelopment) {
  baseURL = "";
}

const api = axios.create({
  baseURL,
});

export default api;
