import './chapter2-scene3.css';
import { useParams, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap2Scene3() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [lives, setLives] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [confirmFinish, setConfirmFinish] = useState(false);
    const [isTyping, setIsTyping] = useState(true);

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

    const handleSkip = () => {
        setIsTyping(false);
        setShowButtons(true);
    };

    return (
        <div className="skenario3-container-chap2">
        {isTyping && (
            <button className="skip-button-chap2" onClick={handleSkip}>
                Skip
            </button>
        )}
        <div className="chap2-message-3">
            {isTyping ? (
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Hiding beside the sofa is unsafe! ")
                            .pauseFor(500)
                            .typeString("<br />It won’t protect you from falling objects. ")
                            .pauseFor(500)
                            .typeString("<br />This could put you in serious danger.")
                            .pauseFor(500)
                            .callFunction(() => {
                                setShowButtons(true);
                                setIsTyping(false);
                            })
                            .start();
                    }}
                    options={{
                        delay: 75,
                        skipAddStyles: true
                    }}
                />
            ) : (
                <div className="text-container">
                    <p>Hiding beside the sofa is unsafe!</p>
                    <p>It won’t protect you from falling objects.</p>
                    <p>This could put you in serious danger.</p>
                </div>
            )}
        </div>
        {showButtons && (
            <div className="popup3-buttons-chap2">
                {lives >= 1 && (
                    <>
                        <button onClick={handleReplay}>Replay</button>
                        <button onClick={handleFinish}>Finish</button>
                    </>
                )}
            </div>
        )}
        {showPopup && (
            <div className="popup3-chap2">
                <div className="popup3-message-chap2">
                    <p>{popupMessage}</p>
                    <div className="popup3-actions-chap2">
                        <button onClick={handlePopupConfirm}>Yes, I'm sure</button>
                        <button onClick={handlePopupCancel}>No, take me back</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    
    );
}

export default Chap2Scene3;
