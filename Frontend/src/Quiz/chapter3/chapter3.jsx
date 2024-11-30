import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import './chapter3.css';
import fullHeart from '../../assets/icons/nyawa-penuh.png';
import snack from '../../assets/chapter3/ElemenBenar1.png';
import p3k from '../../assets/chapter3/ElemenBenar2.png';
import senter from '../../assets/chapter3/ElemenBenar3.png';
import botol from '../../assets/chapter3/ElemenBenar4.png';
import tas from '../../assets/chapter3/ElemenBenar5.png';
import buku from '../../assets/chapter3/ElemenSalah1.png';
import lampu_meja from '../../assets/chapter3/ElemenSalah2.png';
import pot from '../../assets/chapter3/ElemenSalah3.png';
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chapter3() {
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
    const [selectedElements, setSelectedElements] = useState([]);
    const [disabledElements, setDisabledElements] = useState([]);
    const [message, setMessage] = useState('');
    const userId = user.user;

    const correctAnswers = ['snack', 'p3k', 'senter', 'botol', 'tas']; // List of correct elements
    const wrongAnswers = ['buku', 'lampu_meja', 'pot']; // List of wrong elements

    useEffect(() => {
        const userProgress = async () => {
            try {
                const response = await axios.get(`${url}/user/progress/${userId}`);
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

    const handleElementClick = (elementName, imgSrc) => {
        if (disabledElements.includes(elementName)) return;

        setSelectedElements(prevState => [...prevState, { name: elementName, img: imgSrc }]);
        setDisabledElements(prevState => [...prevState, elementName]);
    };

    const handleUndoElement = (elementName) => {
        setSelectedElements(prevState => prevState.filter(item => item.name !== elementName));
        setDisabledElements(prevState => prevState.filter(item => item !== elementName));
    };

    const handleSubmit = () => {
        const selectedNames = selectedElements.map(item => item.name);
        const correct = selectedNames.every(name => correctAnswers.includes(name)); // Check if all selected items are correct
        const wrong = selectedNames.some(name => wrongAnswers.includes(name)); // Check if any selected item is wrong

        if (correct) {
            setMessage('Correct! You have selected all the necessary items.');
            setScore(prevScore => prevScore + 1000); // Add 1000 points if correct
            setLives(prevLives => prevLives); // Keep lives as is
            navigate(`/quiz/674abb8d3771c421e3a88b3d/${id}/success`); // Navigate to success scenario
        } else {
            setMessage('Wrong selection! Some of your choices were incorrect.');
            setScore(prevScore => prevScore - 500); // Deduct 500 points if wrong
            setLives(prevLives => Math.max(prevLives - 1, 0)); // Deduct 1 life
            navigate(`/quiz/674abb8d3771c421e3a88b3d/${id}/fail`); // Navigate to fail scenario
        }

        // Update score and lives in the backend
        UserProgress();
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
        <div className="chapter3-container">
            {!isWindowMaximized && (
                <div className="warning3-message">{warningMessage}</div>
            )}
            <div className="message3" >
                <div className='heart3-container'>
                    {Array.from({ length: lives }).map((_, index) => (
                        <img
                            key={index}
                            src={fullHeart}
                            alt="Nyawa"
                        />
                    ))}
                </div>
                <h4 className='score3'>Score: <span>{score}</span></h4>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString('Hurry up!')
                            .pauseFor(500)
                            .typeString('<br />We dont know when the aftershocks will occur')
                            .pauseFor(500)
                            .typeString('<br />Quickly pack your important things!')
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
                {showTips && <h4 className='tips3'>Tips: Choose  five correct items</h4>}
            </div>
            {showHint &&
                <button
                    onClick={handleHintClick}
                    disabled={score === 0}
                    className={score === 0 ? "disabled-button-chap2" : "hint-button-chap2"}
                >
                    Hint
                </button>
            }
            {showHintPopup && (
                <div className="popup-overlay-chap2">
                    <div className="popup3">
                        <p>Using a hint will cost 100 points. Are you sure?</p>
                        <div className="popup3-buttons">
                            <button onClick={confirmHint}>Yes, show me the hint</button>
                            <button onClick={cancelHint}>No, cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {hintVisible && (
                <div className="popup3-overlay">
                    <div className="popup3">
                        <p>Hint: Items such as books, lamps or pots may be attractive, but in emergency situations, more practical and functional items will be more important.</p>
                        <div className="popup3-buttons">
                            <button onClick={closeHint}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="elements3-container">
                {/* Place elements with position absolute */}
                <img
                    src={snack}
                    alt="Snack"
                    className="snack-button"
                    onClick={() => handleElementClick('snack', snack)}
                    disabled={disabledElements.includes('snack')}
                    style={{ position: 'absolute', top: '21%', left: '70.5%' }}
                />
                <img
                    src={p3k}
                    alt="First Aid"
                    className="p3k-button"
                    onClick={() => handleElementClick('p3k', p3k)}
                    disabled={disabledElements.includes('p3k')}
                    style={{ position: 'absolute', top: '23.5%', left: '77.5%' }}
                />
                <img
                    src={senter}
                    alt="Flashlight"
                    className="senter-button"
                    onClick={() => handleElementClick('senter', senter)}
                    disabled={disabledElements.includes('senter')}
                    style={{ position: 'absolute', top: '9.5%', left: '70.5%' }}
                />
                <img
                    src={botol}
                    alt="Water Bottle"
                    className="botol-button"
                    onClick={() => handleElementClick('botol', botol)}
                    disabled={disabledElements.includes('botol')}
                    style={{ position: 'absolute', top: '26%', left: '28.3%' }}
                />
                <img
                    src={tas}
                    alt="Bag"
                    className="tas-button"
                    onClick={() => handleElementClick('tas', tas)}
                    disabled={disabledElements.includes('tas')}
                    style={{ position: 'absolute', top: '48%', left: '25%' }}
                />
                <img
                    src={buku}
                    alt="Book"
                    className="buku-button"
                    onClick={() => handleElementClick('buku', buku)}
                    disabled={disabledElements.includes('buku')}
                    style={{ position: 'absolute', top: '26%', left: '37%' }}
                />
                <img
                    src={lampu_meja}
                    alt="Lamp"
                    className="lampu_meja-button"
                    onClick={() => handleElementClick('lampu_meja', lampu_meja)}
                    disabled={disabledElements.includes('lampu_meja')}
                    style={{ position: 'absolute', top: '37%', left: '84.5%' }}
                />
                <img
                    src={pot}
                    alt="Pot"
                    className="pot-button"
                    onClick={() => handleElementClick('pot', pot)}
                    disabled={disabledElements.includes('pot')}
                    style={{ position: 'absolute', top: '18.5%', left: '42.5%' }}
                />
            </div>

            <div className="selected3-elements">
                <h4>Selected Items:</h4>
                <div className="selected3-items-list">
                    {selectedElements.map((item, index) => (
                        <div key={index} className="selected3-item">
                            <img src={item.img} alt={item.name} className="selected3-item-img" />
                            <button onClick={() => handleUndoElement(item.name)} className="undo-button">x</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="submit-container">
    {!message && <button className="submit-button" onClick={handleSubmit}>Submit</button>}
</div>


            {message && (
                <div className="result-message">
                    <h3>{message}</h3>
                </div>
            )}
        </div>
    );
}

export default Chapter3;