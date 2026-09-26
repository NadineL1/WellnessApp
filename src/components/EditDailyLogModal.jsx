import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateDailylog } from '../services/DailyLogService';

export default function UpdateLog(props) {
    const [dailylog] = useState(props.dailylog);
    const [moodId, setMoodId] = useState(dailylog.moodId);
    const [workoutChecked, setWorkoutChecked] = useState(dailylog.workout.workoutCompleted);
    const [workoutDesc, setWorkoutDesc] = useState(dailylog.workout.description);
    const [waterChecked, setWaterChecked] = useState(dailylog.water.waterChecked);
    const [waterConsumed, setWaterConsumed] = useState(dailylog.water.waterConsumed);


    // modal functionality
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const id = dailylog.id;

        const dailylogToUpdate = { id, moodId, workoutChecked, workoutDesc, waterChecked, waterConsumed }
        await updateDailylog(dailylogToUpdate);

        // close modal and force refresh
        setShow(false);
        navigate(0);

    }
    return (
        <>
            <button className="edit-btn" onClick={handleShow}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor='moodId'>Today's Mood</label>
                        <select id='moodId' type="number" value={moodId} onChange={(e) => setMoodId(Number(e.target.value))}>
                            <option value={1}>1.Very Bad</option>
                            <option value={2}>2.Bad</option>
                            <option value={3}>3.Okay</option>
                            <option value={4}>4.Good</option>
                            <option value={5}>5.Fantastic</option>
                        </select>
                        <label htmlFor='workoutChecked'>Did you work out today?</label>
                        <input type="checkbox" name="workoutChecked" checked={workoutChecked} onChange={(e) => setWorkoutChecked(e.target.checked)} />
                        <label htmlFor='workoutDesc'>Describe your workout:</label>
                        <input type="text" name="workoutDesc" value={workoutDesc} onChange={(e) => setWorkoutDesc(e.target.value)} />
                        <label htmlFor='waterChecked'>Did you drink water today?</label>
                        <input type="checkbox" name="waterChecked" checked={waterChecked} onChange={(e) => setWaterChecked(e.target.checked)} />
                        <label htmlFor='waterConsumed'>How many glasses of water did you drink?</label>
                        <input type="number" name="waterConsumed" min="0" max="40" value={waterConsumed} onChange={(e) => setWaterConsumed(Number(e.target.value))} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

