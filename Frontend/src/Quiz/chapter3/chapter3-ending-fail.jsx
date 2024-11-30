import { useParams, useNavigate } from 'react-router-dom';
import './chapter3-ending-fail.css';

function Chap3Fail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(`/quiz`);
    };

    const handleReplay = () => {
        navigate(`/quiz/674abb8d3771c421e3a88b3d/${id}`); 
    };

    return (
        <div className="ending3-fail-container">
            {/* Tombol Finish */}
            <div className="popup3-fail-buttons">
                <button className='text' onClick={handleFinish}>Finish</button>
            </div>
            
            {/* Tombol Replay */}
            <div className="popup3-fail-replay-buttons">
                <button className='text' onClick={handleReplay}>Replay</button>
            </div>
        </div> 
    );
}

export default Chap3Fail;
