import { useState } from "react";
import { createDailyLog } from "../services/DailyLogService";

export default function CreateLog() {
    const [mood, setMood] = useState("");
    const [workout, setWorkout] = useState("");
    const [workoutdescription, setWorkoutdesc] = useState("");
    const [water, setWater] = useState("");
    const [glassesofwater, setGlassesofwater] = useState("");

    async function handleSubmit(e) {
        e.prevenDefault();

        await createDailyLog(mood, workout, workoutdescription, water, glassesofwater);
    }

    return (
        <div>
            <h1></h1>
            <p></p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} name="mood" placeholder="MoodId" />
                <input type="text" value={workout} onChange={(e) => setWorkout(e.target.value)} name="workout" placeholder="WorkoutToday?" />
                <input type="text" value={workoutdescription} onChange={(e) => setWorkoutdesc(e.target.value)} name="workoutdescription" placeholder="workoutdesription" />
                <input type="text" value={water} onChange={(e) => setWater(e.target.value)} name="water" placeholder="WaterToday?" />
                <input type="text" value={glassesofwater} onChange={(e) => setGlassesofwater(e.target.value)} name="glassesofwater" placeholder="how many glasses" />
                <button type="handleSubmit" >Create daily log</button>
            </form>
        </div>
    )
}