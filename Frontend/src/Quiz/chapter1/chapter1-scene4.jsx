import { useParams, useNavigate } from 'react-router-dom';
import './chapter1-scene4.css';
import Typewriter from 'typewriter-effect';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap1Scene4() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [lives, setLives] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
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
        setPopupMessage("Are you sure you want to restart the scenario?");
        setShowPopup(true);
        setConfirmFinish(false);
    };

    const handleFinish = () => {
        setPopupMessage("If you finish now, your score will be 0. Are you sure?");
        setShowPopup(true);
        setConfirmFinish(true);
    };

    const handlePopupConfirm = () => {
        setShowPopup(false);
        if (confirmFinish) {
            navigate(`/quiz/${id}/${id}/ending2`);
        } else {
            navigate(`/quiz/${id}/${id}`);
        }
    };

    const handlePopupCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className="skenario4-container">
            <div className="message4">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Choosing the cabinet is risky! ")
                            .pauseFor(500)
                            .typeString("<br />It could fall forward, trapping you inside. ")
                            .pauseFor(500)
                            .typeString("<br />You won't be able to escape if it does.")
                            .pauseFor(500)
                            .callFunction(() => {
                                setShowButtons(true);
                            })
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>
            {showButtons && (
                <div className="popup-buttons4">
                    {lives >= 1 && (
                        <>
                            <button onClick={handleReplay}>Replay</button>
                            <button onClick={handleFinish}>Finish</button>
                        </>
                    )}
                </div>
            )}
            {showPopup && (
                <div className="popup4">
                    <div className="popup-message4">
                        <p>{popupMessage}</p>
                        <div className="popup-actions4">
                            <button onClick={handlePopupConfirm}>Yes, I'm sure</button>
                            <button onClick={handlePopupCancel}>No, take me back</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chap1Scene4;