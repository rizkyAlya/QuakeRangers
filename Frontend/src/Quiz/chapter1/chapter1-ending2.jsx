import './chapter1-ending2.css';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chap1Ending2() {
    const user = useContext(UserContext);
    const userId = user.user;
    const navigate = useNavigate();

    useEffect(() => {
        const userProgress = async () => {
            try {
                const response = await axios.put(`${url}/user/progress/${userId}`, {
                    lives: 3
                });
                
                console.log('Progress successfully updated:', response.data.data);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        };

        userProgress();
    }, [userId]);

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="ending2-container">
            <div className="popup-buttons-ending2">
                <button className='text-ending2' onClick={handleHome}>Home</button>
            </div>
        </div>
    )
}

export default Chap1Ending2;