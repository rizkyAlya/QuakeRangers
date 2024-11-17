import React, { useState } from 'react';
import './UserProfile.css';
import closeIcon from './assets/icons/close.svg'; // Import ikon close

function ProfilePage() {
  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState({
    username: "",
    photo: "", 
    points: "",
    ranking: "",
  });

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

  return (
    <div className="profile-page">
      {/* Close Icon */}
      <button className="close-icon" onClick={handleClose}>
        <img src={closeIcon} alt="Close Icon" />
      </button>

      {/* Left Section */}
      <div className="profile-left">
        <div className="avatar">
          {userData.photo ? (
            // Jika ada foto profil, tampilkan gambar
            <img src={userData.photo} alt="User Avatar" />
          ) : (
            // Jika tidak ada foto, tampilkan inisial
            <div className="avatar-placeholder">
              {getInitials(userData.username)}
            </div>
          )}
        </div>
        <h2>{userData.username || "No Username"}</h2>
        <div className="info">
          <p>Points: <span>{userData.points || "N/A"}</span></p>
          <p>Ranking: <span>{userData.ranking || "N/A"}</span></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        <h3>Edit Profile</h3>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={userData.username} readOnly />
        </div>
        <div className="form-group">
          <label>Points:</label>
          <input type="text" value={userData.points} readOnly />
        </div>
        <div className="form-group">
          <label>Ranking:</label>
          <input type="text" value={userData.ranking} readOnly />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
