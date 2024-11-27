import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import './chapter1.css';
import deskImage from '../../assets/chapter1/Elemen-Skenario1.png'; // Gambar meja terpisah
import tableImage from '../../assets/chapter1/Elemen-Skenario2.png';
import doorImage from '../../assets/chapter1/Elemen-Skenario3.jpeg';
import cupboardImage from '../../assets/chapter1/Elemen-Skenario4.jpeg';
import { UserContext } from '../../UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function Chapter1() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [isWindowMaximized, setIsWindowMaximized] = useState(true);
    const [warningMessage, setWarningMessage] = useState('');
    const [showTips, setShowTips] = useState(false);

    const handleSubmit = async (answer) => {
        console.log(user, answer);
        try {
            const userId = user.user;

            const response = await axios.post(`${url}/quiz/submit/${id}`, {
                userId,  // Pastikan user.id sudah valid dan dalam format string 24 karakter
                userAnswer: answer
            });

            if (response.status === 200) {
                console.log('Submit successful:', response.data);
                if (answer == "meja_guru") {
                    navigate(`/quiz/${id}/scene1`); // Arahkan ke halaman tujuan
                } else if (answer == "meja_murid") {
                    navigate(`/quiz/${id}/scene2`);
                } else if (answer == "pintu") {
                    navigate(`/quiz/${id}/scene3`);
                } else {
                    navigate(`/quiz/${id}/scene4`);
                }
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('Submit error:', error);
            console.log(user);
        }
    }

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
            <div className="message" >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString('You are at school.')
                            .pauseFor(500) // Pause sebelum melanjutkan ke teks berikutnya
                            .typeString('<br />Suddenly an earthquake occurs!')
                            .pauseFor(500)
                            .typeString('<br />Quick! You must take shelter.')
                            .pauseFor(1000) // Pause lebih lama setelah selesai
                            .callFunction(() => {
                                setShowTips(true); // Setel state showTip menjadi true setelah pengetikan selesai
                            })
                            .start();
                    }}
                    options={{
                        delay: 75,  // Mengatur kecepatan pengetikan lebih cepat
                    }}
                />
                {showTips && <h4 className='tips'>Move your cursor across the page and select a shelter</h4>}
            </div>
            <img
                src={deskImage}
                alt="Meja Guru"
                className="desk-button"
                onClick={() => handleSubmit('meja_guru')}
            />
            <img
                src={tableImage}
                alt="Meja Murid"
                className='table-button'
                onClick={() => handleSubmit('meja_murid')}
            />
            <img
                src={doorImage}
                alt="Pintu"
                className='door-button'
                onClick={() => handleSubmit('pintu')}
            />
            <img
                src={cupboardImage}
                alt="Lemari"
                className="cupboard-button"
                onClick={() => handleSubmit('lemari')}
            />
        </div>
    );
}

export default Chapter1;
