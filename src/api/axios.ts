import axios from "axios";

export const api = axios.create({
    baseURL: `https://api.unsplash.com`,
    params: {
        client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    }
})