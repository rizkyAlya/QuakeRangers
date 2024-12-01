import './chapter1-ending.css';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap1Ending() {
    const user = useContext(UserContext);
    const userId = user.user;
    const location = useLocation();
    const { answer } = location.state || { answer: "unknown" };
    const navigate = useNavigate();
    const [showScore, setShowScore] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
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

    // Logika untuk menghitung poin berdasarkan answer
    const calculatePoints = () => {
        if (answer === "meja_murid") {
            return 500;
        } else if (answer === "meja_guru") {
            return 1000;
        }
        return 0;
    };

    const points = calculatePoints();

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="ending-container">
            <div className='message-ending'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Great job! You've safely survived the earthquake.")
                            .pauseFor(500)
                            .typeString("<br />You're a true Earthquake Hero!")
                            .pauseFor(800)
                            .callFunction(() => {
                                setEarnedPoints(points);
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
                <div className="score-container">
                    <p>You earned {earnedPoints} points!</p>
                </div>
            )}

            {showButton && (
                <div className="popup-buttons-ending">
                    <button className='text-ending' onClick={handleHome}>Home</button>
                </div>
            )}
        </div>
    );
}

export default Chap1Ending;
