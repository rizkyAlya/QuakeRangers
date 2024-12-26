import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import './chapter2.css';
import fullHeart from '../../assets/icons/nyawa-penuh.png';
import doorImage from '../../assets/chapter2/Elemen-Skenario1.png';
import tableImage from '../../assets/chapter2/Elemen-Skenario2.png';
import sofaImage from '../../assets/chapter2/Elemen-Skenario3.png';
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chapter2() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [lives, setLives] = useState(0);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState('');
    const [showHintPopup, setShowHintPopup] = useState(false);
    const [hintVisible, setHintVisible] = useState(false);
    const [isWindowMaximized, setIsWindowMaximized] = useState(true);
    const [warningMessage, setWarningMessage] = useState('');
    const [showTips, setShowTips] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [element, setElement] = useState('');
    const [message, setMessage] = useState('');
    const [skip, setSkip] = useState(false);
    const userId = user.user;

    useEffect(() => {
        const userProgress = async () => {
            try {
                const response = await axios.get(`${url}/user/progress/${userId}`);
                console.log('Progress successfully updated:', response.data.data.user);
                setLives(response.data.data.user.lives);
                setScore(response.data.data.user.score);
                setProgress(response.data.data.user.progress);
            } catch (error) {
                console.error('Error getting user progress:', error);
            }
        };

        userProgress();
    }, [userId]);

    const handleHintClick = () => {
        if (score > 0) {
            setShowHintPopup(true); // Tampilkan popup jika poin > 0
        }
    };

    const confirmHint = async () => {
        const newScore = score - 100;
        setScore(prevScore => prevScore - 100);

        try {
            console.log(newScore);
            const res = await axios.put(`${url}/user/progress/${userId}`, {
                score: newScore
            });
            console.log('Score updated successfully:', res.data);
        } catch (error) {
            console.error('Error updating score:', error.response?.data || error.message);
        }

        setHintVisible(true); // Tampilkan hint
        setShowHintPopup(false); // Sembunyikan popup
    };

    const cancelHint = () => {
        setShowHintPopup(false); // Sembunyikan popup tanpa perubahan
    };

    const closeHint = () => {
        setHintVisible(false); // Tutup popup hint
    };

    const handleClick = (choice) => {
        let message = '';
        setElement(choice);

        switch (choice) {
            case 'pintu':
                setLives(prevLives => prevLives - 1);
                if (lives > 1) {
                    message = "You chose to run outside through the door.";
                } else {
                    message = "Game Over! You ran out of lives. Stay safe and try again!";
                }
                break;
            case 'meja':
                setShowNextButton(true);
                message = "You decide to stay under the table for protection.";
                break;
            case 'sofa':
                setLives(prevLives => prevLives - 1);
                if (lives > 1) {
                    message = "You decide to stay beside the couch for protection.";
                } else {
                    message = "Game Over! You ran out of lives. Stay safe and try again!";
                }
                break;
        }

        setMessage(message);
        setShowPopup(true);
    };

    // Fungsi untuk handle Finish
    const handleFinish = () => {
        setShowPopup(false);
        if (lives === 0 && element !== "meja") {
            navigate(`/quiz/${id}/${id}/ending2`);
        } else {
            handleSubmit(element);
        }
    };

    const handleSubmit = async (answer) => {
        console.log(user, answer);
        try {
            if (answer === "pintu" || answer === "sofa") {
                try {
                    const res = await axios.put(`${url}/user/progress/${userId}`, {
                        lives: lives // Kirim hanya 'lives' yang akan diperbarui
                    });
                    console.log('Lives updated successfully:', res.data);
                } catch (error) {
                    console.error('Error updating lives:', error.response?.data || error.message);
                }
            }

            if (answer === "pintu") {
                navigate(`/quiz/${id}/${id}/scene1`);
            } else if (answer === "meja") {
                const response = await axios.post(`${url}/quiz/submit/${id}`, {
                    userId,
                    userAnswer: answer
                });
                console.log(response.data);

                navigate(`/quiz/${id}/${id}/scene2`);
            } else {
                navigate(`/quiz/${id}/${id}/scene3`);
            }

        } catch (error) {
            console.error('Submit error:', error);
            console.log(user);
        }
    };

    // Menentukan ukuran maksimal yang diinginkan untuk jendela
    const checkWindowSize = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenMaxWidth = window.screen.width;
        const screenMaxHeight = window.screen.height;

        // Tentukan batas ukuran jendela yang diinginkan (misalnya 95% dari ukuran layar)
        const widthThreshold = screenMaxWidth * 1.32;
        const heightThreshold = screenMaxHeight * 1.13;

        // Cek apakah jendela lebih kecil dari batas threshold
        if (screenWidth < widthThreshold || screenHeight < heightThreshold) {
            setIsWindowMaximized(false);
            setWarningMessage('Perhatian: Ukuran jendela tidak maksimal. Harap perbesar jendela!');
        } else {
            setIsWindowMaximized(true);
            setWarningMessage('');
        }
    };

    // Tambahkan event listener untuk memonitor perubahan ukuran jendela
    useEffect(() => {
        window.addEventListener('resize', checkWindowSize);

        // Cek ukuran jendela saat pertama kali halaman dimuat
        checkWindowSize();

        // Bersihkan event listener ketika komponen unmount
        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, []);

    return (
        <div className="chapter2-container">
            {!isWindowMaximized && (
                <div className="warning-message-chap2">{warningMessage}</div>
            )}
            <div className="message-chap2" >
                <div className='heart-container-chap2'>
                    {Array.from({ length: lives }).map((_, index) => (
                        <img
                            key={index}
                            src={fullHeart}
                            alt="Nyawa"
                        />
                    ))}
                </div>
                <h4 className='score-chap2'>Score: <span>{score}</span></h4>
                <div className="typewriter-container">
                    {!skip && (
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('You are at home.')
                                    .pauseFor(500)
                                    .typeString('<br />Suddenly an earthquake occurs!')
                                    .pauseFor(500)
                                    .typeString('<br />Quick! You must take shelter.')
                                    .pauseFor(800)
                                    .callFunction(() => {
                                        setShowTips(true);
                                        setShowHint(true);
                                    })
                                    .start();
                            }}
                            options={{
                                delay: 75,
                            }}
                        />
                    )}
                    {skip && (
                        <div className="text-container">
                            You are at home.<br />
                            Suddenly an earthquake occurs!<br />
                            Quick! You must take shelter.
                        </div>
                    )}
                    {!skip && (
                        <button className="skip-button" onClick={() => setSkip(true)}>
                            Skip
                        </button>
                    )}
                </div>
                {showTips && <h4 className='tips-chap2'>Move your cursor across the page and select a shelter</h4>}
            </div>
            {showHint && (
                <button
                    onClick={handleHintClick}
                    disabled={score === 0}
                    className={score === 0 ? "disabled-button-chap2" : "hint-button-chap2"}
                >
                    Hint
                </button>
            )}
            {showHintPopup && (
                <div className="popup-overlay-chap2">
                    <div className="popup-chap2">
                        <p>Using a hint will cost 100 points. Are you sure?</p>
                        <div className="popup-buttons-chap2">
                            <button onClick={confirmHint}>Yes, show me the hint</button>
                            <button onClick={cancelHint}>No, cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {hintVisible && (
                <div className="popup-overlay-chap2">
                    <div className="popup-chap2">
                        <p>Hint: Look for something solid to hide under to stay safe from falling debris!</p>
                        <div className="popup-buttons-chap2">
                            <button onClick={closeHint}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <img
                src={doorImage}
                alt="Pintu"
                className="door-button-chap2"
                onClick={() => handleClick('pintu')}
            />
            <img
                src={tableImage}
                alt="Meja"
                className='table-button-chap2'
                onClick={() => handleClick('meja')}
            />
            <img
                src={sofaImage}
                alt="Sofa"
                className='sofa-button-chap2'
                onClick={() => handleClick('sofa')}
            />
            {showPopup && (
                <div className="popup-overlay-chap2">
                    <div className="popup-chap2">
                        <p>{message}</p>
                        <div className="popup-buttons-chap2">
                            <button onClick={handleFinish}>Next</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chapter2;
