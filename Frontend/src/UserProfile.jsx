import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './UserProfile.css';
import closeIcon from './assets/icons/close.svg'; // Import ikon close
import { useParams } from 'react-router-dom';
const url = import.meta.env.VITE_BACKEND_URL;

function ProfilePage() {
  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState({
    username: "",
    photo: "", 
    email:"",
    points: "",
    ranking: "",
    gender:"",
    age:"",
  });
  const { userID } = useParams();
  const [profile, setProfile] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token || !userID) {
          throw new Error('Token or UserID not found');
        }

        const response = await axios.get(`${url}/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Mendapatkan inisial dari nama
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  // Fungsi untuk close action (misalnya, redirect atau popup close)
  const handleClose = () => {
    console.log("Close button clicked"); // Anda bisa mengganti log ini dengan fungsi lain
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      {/* Close Icon */}
      <button className="close-icon" onClick={handleClose}>
        <img src={closeIcon} alt="Close Icon" />
      </button>

      {/* Left Section */}
      <div className="profile-left">
        <div className="avatar">
          {profile.user.profile ? (
            // Jika ada foto profil, tampilkan gambar
            <img src={profile.user.profile} alt="User Avatar" />
          ) : (
            // Jika tidak ada foto, tampilkan inisial
            <div className="avatar-placeholder">
              {getInitials(profile.user.username)}
            </div>
          )}
        </div>
        <h2>{profile.user.username || "No Username"}</h2>
        <div className="info">
          <p>Points: <span>{profile.user.score || "N/A"}</span></p>
          <p>Ranking: <span>{profile.rank || "N/A"}</span></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={profile.user.username} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" value={userData.email} readOnly />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" value={userData.gender} readOnly />
          <label>Points:</label>
          <input type="text" value={profile.user.score} readOnly />
        </div>
        <div className="form-group">
          <label>Ranking:</label>
          <input type="text" value={profile.rank} readOnly />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="text" value={userData.age} readOnly />
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default ProfilePage;
