import axios from 'axios';
import { logOutUser } from './auth/LogoutService';

const api = axios.create({
    baseURL: "https://wellnessappbackend-evb9g5e7amh5bxej.swedencentral-01.azurewebsites.net/api",
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            logOutUser();
            window.location.replace("/");
        }
        return;
    }
);

export async function showDailylogs() {
    let response = await api.get('/dailylog');
    console.log(response);
    return response.data;
}
export async function createDailylog(dailylog) {
    let response = await api.post("/dailylog", dailylog);
    console.log(response);
    return response.data;
}
export async function updateDailylog(dailylog) {
    console.log(dailylog);
    let response = await api.put("/dailylog", dailylog);
    console.log(response);
    return response.data;
}
export async function deleteDailylog(id) {
    let response = await api.delete(`/dailylog?dailyLogId=${id}`);
    console.log(response);
}