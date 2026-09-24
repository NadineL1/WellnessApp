import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7119/",
    withCredentials: true
});

export async function createDailyLog(mood, workout, workoutdescription, water, glassesofwater) {
    await api.post("dailylog",
        {
            mood,
            workout,
            workoutdescription,
            water,
            glassesofwater
        }
    );
}