import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './chapter2-scene2.css';
import Typewriter from 'typewriter-effect';

function Chap2Scene2() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    
    const handleFinish = () => {
        navigate(`/quiz/${id}/${id}/ending`);
    };

    return (
        <div className="skenario2-container-chap2">
            <div className="message1-chap2" >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Good job!")
                            .pauseFor(500)
                            .typeString("<br />Taking shelter under the desk was the right choice.")
                            .pauseFor(500)
                            .typeString('<br />Now you are safe, wait until the earthquake stops.')
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
            <div className="popup-buttons1-chap2">
                <button className='text-chap2' onClick={handleFinish}>Finish</button>
            </div>
            )}
        </div>
    )
}

export default Chap2Scene2;