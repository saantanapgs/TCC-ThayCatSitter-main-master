import axios from "axios";

const API_URL = "https://catsitterapidb-main.onrender.com"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

export default api