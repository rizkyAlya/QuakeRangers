import { useParams, useNavigate } from 'react-router-dom';
import './chapter3-ending-success.css';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';

function Chap3Success() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSkip, setShowSkip] = useState(true); // State untuk tombol skip
    const [showButtons, setShowButtons] = useState(false); // State untuk tombol finish
    const [typewriterText, setTypewriterText] = useState(''); // State untuk teks tipewriter

    const handleFinish = () => {
        navigate(`/quiz`);
    };

    const handleSkip = () => {
        setTypewriterText(
            "Good job!<br />Very appropriate choice of these 5 items<br />You made it this far!"
        );
        setShowSkip(false);
        setShowButtons(true);
    };

    return (
        <div className="ending3-success-container">
    {showSkip && (
        <button className="skip-button" onClick={handleSkip}>
            Skip
        </button>
    )}
    <div className="message3">
        {!typewriterText ? (
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Good job!")
                        .pauseFor(500)
                        .typeString("<br />Very appropriate choice of these 5 items")
                        .pauseFor(500)
                        .typeString('<br />You made it this far!')
                        .callFunction(() => {
                            setShowButtons(true); // Tampilkan tombol finish setelah tipewriter selesai
                            setShowSkip(false); // Hilangkan tombol skip
                        })
                        .start();
                }}
                options={{
                    delay: 75,
                }}
            />
        ) : (
            <div className="text-container" dangerouslySetInnerHTML={{ __html: typewriterText }} />
        )}
    </div>
    {showButtons && (
        <div className="popup3-success-buttons">
            <button className="text" onClick={handleFinish}>Finish</button>
        </div>
    )}
</div>

    );
}

export default Chap3Success;
