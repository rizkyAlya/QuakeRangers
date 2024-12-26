import './chapter2-scene1.css';
import { useParams, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap2Scene1() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [lives, setLives] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [confirmFinish, setConfirmFinish] = useState(false);
    const [isTyping, setIsTyping] = useState(true); // Untuk status typing
    const [fullText, setFullText] = useState(""); // Untuk menyimpan teks penuh

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

    const skipTyping = () => {
        setIsTyping(false); // Hentikan typing
        setShowButtons(true); // Tampilkan tombol
    };

    useEffect(() => {
        // Teks penuh untuk ditampilkan saat skip
        setFullText(
            "Danger! Running outside is too risky. <br />Falling debris could hit you. <br />It’s safer to stay inside and take shelter."
        );
    }, []);

    return (
        <div className="skenario1-container-chap2">
            <div className="chap2-message-1">
                {isTyping ? (
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("Danger! Running outside is too risky. ")
                                .pauseFor(500)
                                .typeString("<br />Falling debris could hit you. ")
                                .pauseFor(500)
                                .typeString("<br />It’s safer to stay inside and take shelter.")
                                .pauseFor(500)
                                .callFunction(() => {
                                    setShowButtons(true);
                                    setIsTyping(false);
                                })
                                .start();
                        }}
                        options={{
                            delay: 75,
                        }}
                    />
                ) : (
                    <div className="text-container" dangerouslySetInnerHTML={{ __html: fullText }} />
                )}
            </div>
            {isTyping && (
                <button className="skip-button-chap2" onClick={skipTyping}>
                    Skip
                </button>
            )}
            {showButtons && (
                <div className="popup1-buttons-chap2">
                    {lives >= 1 && (
                        <>
                            <button onClick={handleReplay}>Replay</button>
                            <button onClick={handleFinish}>Finish</button>
                        </>
                    )}
                </div>
            )}
            {showPopup && (
                <div className="popup1-chap2">
                    <div className="popup1-message-chap2">
                        <p>{popupMessage}</p>
                        <div className="popup1-actions-chap2">
                            <button onClick={handlePopupConfirm}>Yes, I'm sure</button>
                            <button onClick={handlePopupCancel}>No, take me back</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chap2Scene1;
