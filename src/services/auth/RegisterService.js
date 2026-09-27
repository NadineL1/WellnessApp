import axios from 'axios';

const api = axios.create({
    baseURL: "https://wellnessappbackend-evb9g5e7amh5bxej.swedencentral-01.azurewebsites.net/api"
});

export async function registerUser(userToAdd) {
    let response = await api.post("/Auth/register", userToAdd);
    console.log(response);
}