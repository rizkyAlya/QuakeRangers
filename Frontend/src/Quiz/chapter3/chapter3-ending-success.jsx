import { useParams, useNavigate } from 'react-router-dom';
import './chapter3-ending-success.css';
import Typewriter from 'typewriter-effect';

function Chap3Success() {
    const { id } = useParams();
    const navigate = useNavigate();
        const handleFinish = () => {
            navigate(`/quiz`);
        };
    return (
        <div className="ending3-success-container">
            <div className="message3" >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Good job!")
                            .pauseFor(500)
                            .typeString("<br />Very appropriate choice of these 5 items")
                            .pauseFor(500)
                            .typeString('<br />You made it this far!')
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>
            <div className="popup3-success-buttons">
                <button className='text' onClick={handleFinish}>Finish</button>
            </div>
        </div>
    )
}

export default Chap3Success;