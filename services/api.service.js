import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

export default api