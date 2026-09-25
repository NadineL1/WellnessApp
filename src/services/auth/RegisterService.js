import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/api"
});

export async function registerUser(userToAdd) {
    let response = await api.post("/Auth/register", userToAdd);
    console.log(response);
}