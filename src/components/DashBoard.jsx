import { useEffect, useState } from "react";
import { showDailylogs, deleteDailylog } from "../services/DailyLogService";
import EditDailyLogModal from "../components/EditDailyLogModal";

export default function Dashboard() {
    const [dailylogs, setDailylogs] = useState([]);

    async function getDailylogs() {
        try {
            const dailylogList = await showDailylogs();
            setDailylogs(dailylogList)
            console.log(dailylogList)
        }
        catch (error) {
            console.log("Error fetching dailylogs", error)
        }
    }

    async function handleDelete(id) {
        await deleteDailylog(id);
        // after delete in backend - get the list again so client is up to date
        await getDailylogs();
    }

    useEffect(() => {
        (async () => {
            console.log("hej")
            await getDailylogs();
        })();
    }, []);


    return (
        <div className='page-container'>
            <div className='content-container'>
                <h1>Dashboard</h1>
                <h3>My logs:</h3>
                <ul>
                    {dailylogs.map(dailylog => (
                        <li key={dailylog.id}>
                            <EditDailyLogModal dailylog={dailylog} />
                            <button className="edit-btn" onClick={() => handleDelete(dailylog.id)}>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                            <p><b>Date:</b>{dailylog.logDate}</p>
                            <p><b>Mood:</b>{dailylog.mood.id}.{dailylog.mood.description}</p>
                            <p><b>Drank water?</b>{dailylog.water.waterChecked ? "Yes" : "No"}. <b>How many glasses:</b> {dailylog.water.waterConsumed}</p>
                            <p><b>Workout?</b>{dailylog.workout.workoutCompleted ? "Yes" : "No"}. <b>Activity:</b> {dailylog.workout.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}