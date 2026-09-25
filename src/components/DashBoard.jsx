import { useEffect, useState } from "react";
import { showDailylogs } from "../services/DailyLogService";

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
                <ul>
                    {dailylogs.map(dailylog => (
                        <li key={dailylog.id}>
                            <p><b>Date:</b>{dailylog.logDate}</p>
                            <p><b>Mood:</b>{dailylog.mood.id}.{dailylog.mood.description}</p>
                            <p><b>Water:</b>{dailylog.water.waterChecked}{dailylog.water.waterConsumed}</p>
                            <p><b>Workout:</b>{dailylog.workout.workoutCompleted}{dailylog.workout.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}