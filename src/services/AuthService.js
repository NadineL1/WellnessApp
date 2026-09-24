import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/api"
});

export async function loginWithCookies(email, password) {
    let response = await api.post("/Auth/login", { email, password });
    console.log(response);
}