import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/jokes`,
  headers: {
    "Content-Type": "application/json",
  },
});
