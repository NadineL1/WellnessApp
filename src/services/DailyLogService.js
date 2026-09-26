import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/api/",
    withCredentials: true
});

export async function showDailylogs() {
    let response = await api.get('dailylog');
    console.log(response);
    return response.data;
}
export async function createDailylog(dailylog) {
    let response = await api.post("dailylog", dailylog);
    console.log(response);
    return response.data;
}
export async function updateDailylog(id, dailylog) {
    let response = await api.put(`dailylog/${id}`, dailylog);
    console.log(response);
    return response.data;
}
export async function deleteDailylog(id) {
    let response = await api.delete(`dailylog/${id}`);
    console.log(response);
}