import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import './chapter1.css';
import fullHeart from '../../assets/icons/nyawa-penuh.png';
import deskImage from '../../assets/chapter1/Elemen-Skenario1.png';
import tableImage from '../../assets/chapter1/Elemen-Skenario2.png';
import doorImage from '../../assets/chapter1/Elemen-Skenario3.jpeg';
import cupboardImage from '../../assets/chapter1/Elemen-Skenario4.jpeg';
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chapter1() {
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
    const [isTypingDone, setIsTypingDone] = useState(false); // Untuk skip fitur typing
    const userId = user.user;
    const fullText = `You are at school.<br />Suddenly an earthquake occurs!<br />Quick! You must take shelter.`;

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

    const handleSkip = () => {
        setIsTypingDone(true); // Tandai bahwa teks selesai
        setShowTips(true); // Tampilkan tips langsung
        setShowHint(true); // Tampilkan hint langsung
    };

    const handleHintClick = () => {
        if (score > 0) {
            setShowHintPopup(true);
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
            case 'meja_guru':
                setShowNextButton(true);
                message = "You decided to stay under the teacher's desk for protection.";
                break;
            case 'meja_murid':
                message = "You picked the student desk as your shelter.";
                break;
            case 'pintu':
                setLives(prevLives => prevLives - 1);
                if (lives > 1) {
                    message = "You chose to run outside through the door.";
                } else {
                    message = "Game Over! You ran out of lives. Stay safe and try again!";
                }
                break;
            case 'lemari':
                setLives(prevLives => prevLives - 1);
                if (lives > 1) {
                    message = "You chose to hide in the cabinet.";
                } else {
                    message = "Game Over! You ran out of lives. Stay safe and try again!";
                }
        }

        setMessage(message);
        setShowPopup(true);
    };

    // Fungsi untuk handle Finish
    const handleFinish = () => {
        setShowPopup(false);
        if (lives === 0 && (element === "lemari" || element === "pintu")) {
            navigate(`/quiz/${id}/${id}/ending2`);
        } else {
            handleSubmit(element);
        }
    };

    const handleSubmit = async (answer) => {
        console.log(user, answer);
        try {
            if (answer === "pintu" || answer === "lemari") {
                try {
                    const res = await axios.put(`${url}/user/progress/${userId}`, {
                        lives: lives // Kirim hanya 'lives' yang akan diperbarui
                    });
                    console.log('Lives updated successfully:', res.data);
                } catch (error) {
                    console.error('Error updating lives:', error.response?.data || error.message);
                }
            }

            if (answer === "meja_guru") {
                const response = await axios.post(`${url}/quiz/submit/${id}`, {
                    userId,
                    userAnswer: answer
                });
                console.log(response.data);

                navigate(`/quiz/${id}/${id}/scene1`);
            } else if (answer === "meja_murid") {
                navigate(`/quiz/${id}/${id}/scene2`);
            } else if (answer === "pintu") {
                navigate(`/quiz/${id}/${id}/scene3`);
            } else {
                navigate(`/quiz/${id}/${id}/scene4`);
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
        <div className="chapter-container">
            {!isWindowMaximized && (
                <div className="warning-message">{warningMessage}</div>
            )}
            <div className="message">
                <div className='heart-container'>
                    {Array.from({ length: lives }).map((_, index) => (
                        <img key={index} src={fullHeart} alt="Nyawa" />
                    ))}
                </div>
                <h4 className='score'>Score: <span>{score}</span></h4>
                {!isTypingDone ? (
                    <>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(fullText)
                                    .callFunction(() => {
                                        setIsTypingDone(true);
                                        setShowTips(true);
                                        setShowHint(true);
                                    })
                                    .start();
                            }}
                            options={{
                                delay: 75,
                            }}
                        />
                        <button onClick={handleSkip} className="skip-button">
                            Skip
                        </button>
                    </>
                ) : (
                    <div className="text-container" dangerouslySetInnerHTML={{ __html: fullText }} />
                )}
            </div>
            {showHint && (
                <button
                    onClick={handleHintClick}
                    disabled={score === 0}
                    className={score === 0 ? "disabled-button" : "hint-button"}
                >
                    Hint
                </button>
            )}
            {showHintPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Using a hint will cost 100 points. Are you sure?</p>
                        <div className="popup-buttons">
                            <button onClick={confirmHint}>Yes, show me the hint</button>
                            <button onClick={cancelHint}>No, cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {hintVisible && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Hint: Look for a sturdy object to protect yourself during the earthquake!</p>
                        <div className="popup-buttons">
                            <button onClick={closeHint}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <img
                src={deskImage}
                alt="Meja Guru"
                className="desk-button"
                onClick={() => handleClick('meja_guru')}
            />
            <img
                src={tableImage}
                alt="Meja Murid"
                className='table-button'
                onClick={() => handleClick('meja_murid')}
            />
            <img
                src={doorImage}
                alt="Pintu"
                className='door-button'
                onClick={() => handleClick('pintu')}
            />
            <img
                src={cupboardImage}
                alt="Lemari"
                className="cupboard-button"
                onClick={() => handleClick('lemari')}
            />
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>{message}</p>
                        <div className="popup-buttons">
                            <button onClick={handleFinish}>Next</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chapter1;
