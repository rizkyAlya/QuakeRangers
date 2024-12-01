import { useParams, useNavigate } from 'react-router-dom';
import './chapter1-scene2.css';
import Typewriter from 'typewriter-effect';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap1Scene2() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [lives, setLives] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [confirmFinish, setConfirmFinish] = useState(false);

    useEffect(() => {
        const userProgress = async () => {
            try {
                const response = await axios.get(`${url}/user/progress/${userId}`);
                console.log('Progress successfully updated:', response.data.data.user);
                setLives(response.data.data.user.lives);
            } catch (error) {
                console.error('Error getting user progress:', error);
            }
        };

        userProgress();
    }, [userId]);

    const handleReplay = () => {
        setPopupMessage("Are you sure you want to restart the scenario? Restarting will reset your score for this chapter to 0.");
        setShowPopup(true);
        setConfirmFinish(false);
    };

    const handleFinish = () => {
        setPopupMessage("If you finish now, you will only earn half of the chapter's total points. Are you sure?");
        setShowPopup(true);
        setConfirmFinish(true);
    };

    const handlePopupConfirm = async () => {
        setShowPopup(false);
        if (confirmFinish) {
            const response = await axios.post(`${url}/quiz/submit/${id}`, {
                userId,
                userAnswer: "meja_murid"
            });
            console.log(response.data);
        
            navigate(`/quiz/${id}/${id}/ending`, { state: { answer: "meja_murid" } });
        } else {
            navigate(`/quiz/${id}/${id}`);
        }
    };

    const handlePopupCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className="skenario2-container">
            <div className="message-2" >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Right choice, but you got injured. ")
                            .pauseFor(500)
                            .typeString("<br />A student desk offers some protection during an earthquake. ")
                            .pauseFor(500)
                            .typeString("<br />However, it's not sturdy enough to keep you completely safe.")
                            .pauseFor(500)
                            .callFunction(() => {
                                setShowButton(true);
                            })
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>
            {showButton && (
                <div className="popup-buttons-2">
                    {lives >= 1 && (
                        <>
                            <button onClick={handleReplay}>Replay</button>
                            <button onClick={handleFinish}>Finish</button>
                        </>
                    )}
                </div>
            )}
            {showPopup && (
                <div className="popup-2">
                    <div className="popup-message-2">
                        <p>{popupMessage}</p>
                        <div className="popup-actions-2">
                            <button onClick={handlePopupConfirm}>Yes, I'm sure</button>
                            <button onClick={handlePopupCancel}>No, take me back</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chap1Scene2;