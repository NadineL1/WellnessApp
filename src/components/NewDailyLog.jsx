import { useState } from "react";
import { createDailylog } from "../services/DailyLogService";

export default function CreateLog() {
    const [moodId, setMoodId] = useState(1);
    const [workoutChecked, setWorkoutChecked] = useState(false);
    const [workoutDesc, setWorkoutDesc] = useState("");
    const [waterChecked, setWaterChecked] = useState(false);
    const [waterConsumed, setWaterConsumed] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        const dailylogToAdd = { moodId, workoutChecked, workoutDesc, waterChecked, waterConsumed }
        await createDailylog(dailylogToAdd);

        // reset the form to be empty
        setMoodId(1);
        setWorkoutChecked(false);
        setWorkoutDesc("");
        setWaterChecked(false);
        setWaterConsumed(0);
    }

    return (
        <div className='page-container'>
            <div className='content-container'>
                <h1>Today's Daily Log</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='moodId'>Today's Mood</label>
                    <select id='moodId' type="number" value={moodId} onChange={(e) => setMoodId(Number(e.target.value))}>
                        <option value={1}>1.Very Bad</option>
                        <option value={2}>2.Bad</option>
                        <option value={3}>3.Okay</option>
                        <option value={4}>4.Good</option>
                        <option value={5}>5.Fantastic</option>
                    </select>
                    <label htmlFor='workoutChecked'>Did you work out today?</label>
                    <input type="checkbox" name="workoutChecked" value={workoutChecked} onChange={(e) => setWorkoutChecked(e.target.checked)} />
                    <label htmlFor='workoutDesc'>Describe your workout:</label>
                    <input type="text" name="workoutDesc" value={workoutDesc} onChange={(e) => setWorkoutDesc(e.target.value)} placeholder="workout description" required />
                    <label htmlFor='waterChecked'>Did you drink water today?</label>
                    <input type="checkbox" name="waterChecked" value={waterChecked} onChange={(e) => setWaterChecked(e.target.checked)} />
                    <label htmlFor='waterConsumed'>How many glasses of water did you drink?</label>
                    <input type="number" name="waterConsumed" min="0" max="40" placeholder="how many glasses" value={waterConsumed} onChange={(e) => setWaterConsumed(Number(e.target.value))} required />
                    <button type="submit" className='submit-btn'>Create daily log</button>
                </form>
            </div>
        </div>
    )
}