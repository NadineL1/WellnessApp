import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/",
    withCredentials: true
});

export async function loginWithCookies(email, password) {
    await api.post("login?useCookies=true", { email, password });
}