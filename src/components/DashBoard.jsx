import { useEffect, useState } from "react";
import { showDailylogs, deleteDailylog } from "../services/DailyLogService";
import EditDailyLogModal from "../components/EditDailyLogModal";
import { defaults } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";

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

    function getMoodData() {
        const data = [0, 0, 0, 0, 0];
        dailylogs.forEach(log => {
            data[log.mood.id - 1]++;
        });
        return data;
    }

    function getWorkoutData() {
        const data = [0, 0];
        dailylogs.forEach(log => {
            if (log.workout.workoutCompleted) {
                data[0]++
            }
            else {
                data[1]++
            }
        });
        return data;
    }
    function getWaterData() {
        const data = [0, 0];
        dailylogs.forEach(log => {
            if (log.water.waterChecked) {
                data[0]++
            }
            else {
                data[1]++
            }

        });
        return data;
    }


    function stylingOfDiagram() {
        defaults.plugins.title.display = true;
        defaults.plugins.title.font.size = 25;
        defaults.plugins.title.color = "rgb(185, 103, 206)";
        defaults.maindainAspectRation = true;
        defaults.responsive = true;
    }


    useEffect(() => {
        (async () => {
            console.log("hej")
            await getDailylogs();
            stylingOfDiagram();
        })();
    }, []);


    return (
        <div className='page-container'>
            <div className='content-container'>
                <h1>Dashboard</h1>
                <button className="btn"><a href='/newdailylog'>Create new dailyLog</a></button>
                <button className="btn">Logout</button>

                <div className='content-container'><Line
                    data={{
                        labels: dailylogs.map((data) => data.logDate),
                        datasets: [
                            {
                                label: "Mood",
                                data: dailylogs.map((data) => data.mood.id),
                                backgroundColor: " rgb(55, 161, 147)",
                                borderColor: " rgb(55, 161, 147)",
                                borderRadius: 1,
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                        plugins: {
                            title: {
                                text: "Mood over time",
                            }
                        }
                    }}
                /></div>
                <div className="content-container">
                    <Doughnut
                        data={{
                            labels: ["Yes", "No"],// the value of the x-axel
                            datasets: [
                                {
                                    label: "Amount",
                                    data: getWaterData(),
                                    backgroundColour: [
                                        "rgb(236, 236, 80)",
                                        "rgb(93, 203, 203)"
                                    ],
                                    borderRadius: 1,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Water",
                                }
                            }
                        }}
                    />
                    <Doughnut
                        data={{
                            labels: ["Yes", "No"],// the value of the x-axel
                            datasets: [
                                {
                                    label: "Amount",
                                    data: getWorkoutData(),
                                    backgroundColour: [
                                        "rgb(236, 236, 80)",
                                        "rgb(93, 203, 203)"
                                    ],
                                    borderRadius: 1,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Workout",
                                }
                            }
                        }}
                    /></div>
                <div className="content-container">
                    <Doughnut
                        data={{
                            labels: ["1 - Very Bad", "2 - Bad", "3 - Okay", "4 - Good", "5 - Fanstastic"],// the value of the x-axel
                            datasets: [
                                {
                                    label: "amount of times logged",
                                    data: getMoodData(),
                                    backgroundColour: [
                                        "rgb(236, 236, 80)",
                                        "rgb(93, 203, 203)",
                                        "rgb(233, 80, 236)",
                                        "rgb(242, 103, 115)",
                                        "rgb(74, 142, 99)",
                                    ],
                                    borderRadius: 1,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Moods",
                                }
                            }
                        }}
                    /></div>

                <div className="content-container">
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
                    </ul></div>
            </div>
        </div>
    )
}