import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import './chapter3.css';
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
    const userId = user.user;

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

    const handleElementClick = (elementName, imgSrc) => {
        if (disabledElements.includes(elementName)) return;

        setSelectedElements(prevState => [...prevState, { name: elementName, img: imgSrc }]);
        setDisabledElements(prevState => [...prevState, elementName]);
    };

    const handleUndoElement = (elementName) => {
        setSelectedElements(prevState => prevState.filter(item => item.name !== elementName));
        setDisabledElements(prevState => prevState.filter(item => item !== elementName));
    };

    return (
        <div className="chapter3-container">
            <div className="message3">
                <h4 className='score3'>Score: <span>{score}</span></h4>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString('You are in the classroom.')
                            .pauseFor(500)
                            .typeString('<br />An emergency happens!')
                            .pauseFor(500)
                            .typeString('<br />Choose the right items to survive!')
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>

            <div className="elements3-container">
                {/* Place elements with position absolute */}
                <img
                    src={snack}
                    alt="Snack"
                    className="element3-button"
                    onClick={() => handleElementClick('snack', snack)}
                    disabled={disabledElements.includes('snack')}
                    style={{ position: 'absolute', top: '20%', left: '10%' }}
                />
                <img
                    src={p3k}
                    alt="First Aid"
                    className="element3-button"
                    onClick={() => handleElementClick('p3k', p3k)}
                    disabled={disabledElements.includes('p3k')}
                    style={{ position: 'absolute', top: '20%', left: '30%' }}
                />
                <img
                    src={senter}
                    alt="Flashlight"
                    className="element3-button"
                    onClick={() => handleElementClick('senter', senter)}
                    disabled={disabledElements.includes('senter')}
                    style={{ position: 'absolute', top: '40%', left: '50%' }}
                />
                <img
                    src={botol}
                    alt="Water Bottle"
                    className="element3-button"
                    onClick={() => handleElementClick('botol', botol)}
                    disabled={disabledElements.includes('botol')}
                    style={{ position: 'absolute', top: '60%', left: '30%' }}
                />
                <img
                    src={tas}
                    alt="Bag"
                    className="element3-button"
                    onClick={() => handleElementClick('tas', tas)}
                    disabled={disabledElements.includes('tas')}
                    style={{ position: 'absolute', top: '70%', left: '10%' }}
                />
                <img
                    src={buku}
                    alt="Book"
                    className="element3-button"
                    onClick={() => handleElementClick('buku', buku)}
                    disabled={disabledElements.includes('buku')}
                    style={{ position: 'absolute', top: '10%', left: '70%' }}
                />
                <img
                    src={lampu_meja}
                    alt="Lamp"
                    className="element3-button"
                    onClick={() => handleElementClick('lampu_meja', lampu_meja)}
                    disabled={disabledElements.includes('lampu_meja')}
                    style={{ position: 'absolute', top: '50%', left: '80%' }}
                />
                <img
                    src={pot}
                    alt="Pot"
                    className="element3-button"
                    onClick={() => handleElementClick('pot', pot)}
                    disabled={disabledElements.includes('pot')}
                    style={{ position: 'absolute', top: '40%', left: '80%' }}
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
        </div>
    );
}

export default Chapter3;
