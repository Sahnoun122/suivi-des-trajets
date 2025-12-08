import axios from "axios";

export const api = axios.create({
  URL: import.meta.env.VITE_API,
  timeout:5000,
});