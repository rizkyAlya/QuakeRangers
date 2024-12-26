import './chapter1-ending2.css';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap1Ending2() {
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [isTypingDone, setIsTypingDone] = useState(false); // Untuk fitur skip

    const fullText = `Unfortunately, you did not survive the scenario. <br />Remember to make safer choices during earthquakes.`;

    useEffect(() => {
        const userProgress = async () => {
            try {
                const response = await axios.put(`${url}/user/progress/${userId}`, {
                    lives: 3
                });
                console.log('Progress successfully updated:', response.data.data);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        };

        userProgress();
    }, [userId]);

    const handleHome = () => {
        navigate('/home');
    };

    const handleSkip = () => {
        setIsTypingDone(true); // Langsung tampilkan teks penuh
    };

    return (
        <div className="ending2-container">
            <div className="message-ending2">
                {!isTypingDone ? (
                    <>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("Unfortunately, you did not survive the scenario. ")
                                    .pauseFor(500)
                                    .typeString("<br />Remember to make safer choices during earthquakes.")
                                    .callFunction(() => {
                                        setIsTypingDone(true);
                                    })
                                    .start();
                            }}
                            options={{
                                delay: 75,
                            }}
                        />
                        <button className="skip-button" onClick={handleSkip}>Skip</button>
                    </>
                ) : (
                    <div className="text-container" dangerouslySetInnerHTML={{ __html: fullText }} />
                )}
            </div>
            <div className="popup-buttons-ending2">
                <button className='text-ending2' onClick={handleHome}>Home</button>
            </div>
        </div>
    );
}

export default Chap1Ending2;
