import axios from 'axios';

const api = axios.create({
    baseURL: "https://wellnessappbackend-evb9g5e7amh5bxej.swedencentral-01.azurewebsites.net/api",
    withCredentials: true
});

export async function logOutUser() {
    await api.post("/Auth/logout");
}