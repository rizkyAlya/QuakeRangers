import { useParams, useNavigate } from 'react-router-dom';
import './chapter1-scene1.css';
import Typewriter from 'typewriter-effect';

function Chap1Scene1() {
    const { id } = useParams();
    const navigate = useNavigate();
        const handleFinish = () => {
            navigate(`/quiz/${id}/${id}/ending`);
        };
    return (
        <div className="skenario1-container">
            <div className="message1" >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Good job!")
                            .pauseFor(500)
                            .typeString("<br />Taking shelter under the teacher's desk was the right choice.")
                            .pauseFor(500)
                            .typeString('<br />Now you are safe, wait until the earthquake stops.')
                            .start();
                    }}
                    options={{
                        delay: 75,
                    }}
                />
            </div>
            <div className="popup-buttons1">
                <button className='text' onClick={handleFinish}>Finish</button>
            </div>
        </div>
    )
}

export default Chap1Scene1;