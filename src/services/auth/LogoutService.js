import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/api",
    withCredentials: true
});

export async function logOutUser() {
    await api.post("/Auth/logout");
}