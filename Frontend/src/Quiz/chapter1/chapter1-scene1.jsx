import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './chapter1-scene1.css';
import Typewriter from 'typewriter-effect';

function Chap1Scene1() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);
    const [isTypingDone, setIsTypingDone] = useState(false); // Untuk fitur skip

    const fullText = `Good job! <br />Taking shelter under the teacher's desk was the right choice. <br />Now you are safe, wait until the earthquake stops.`;

    const handleFinish = () => {
        navigate(`/quiz/${id}/${id}/ending`, { state: { answer: "meja_guru" } });
    };

    const handleSkip = () => {
        setIsTypingDone(true); // Langsung tampilkan teks penuh
        setShowButton(true); // Tampilkan tombol Finish
    };

    return (
        <div className="skenario1-container">
            <div className="message1">
                {!isTypingDone ? (
                    <>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("Good job! ")
                                    .pauseFor(500)
                                    .typeString("<br />Taking shelter under the teacher's desk was the right choice. ")
                                    .pauseFor(500)
                                    .typeString('<br />Now you are safe, wait until the earthquake stops.')
                                    .callFunction(() => {
                                        setShowButton(true);
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
            {showButton && (
                <div className="popup-buttons1">
                    <button className='text1' onClick={handleFinish}>Finish</button>
                </div>
            )}
        </div>
    );
}

export default Chap1Scene1;
