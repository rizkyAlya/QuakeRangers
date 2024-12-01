import './chapter2-ending.css';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap2Ending() {
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();
    const [showScore, setShowScore] = useState(false);
    const [showButton, setShowButton] = useState(false);

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

    return (
        <div className="ending-container-chap2">
            <div className='message-ending-chap2'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Great job! You've safely survived the earthquake.")
                            .pauseFor(500)
                            .typeString("<br />You're a true Earthquake Hero!")
                            .pauseFor(800)
                            .callFunction(() => {
                                setShowScore(true);
                                setShowButton(true);
                            })
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>
            {showScore && (
                <div className="score-container-chap2">
                    <p>You earned 1000 points!</p>
                </div>
            )}

            {showButton && (
                <div className="popup-buttons-ending-chap2">
                    <button className='text-ending-chap2' onClick={handleHome}>Home</button>
                </div>
            )}
        </div>
    )
}

export default Chap2Ending;