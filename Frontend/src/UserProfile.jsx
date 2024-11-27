import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import closeIcon from './assets/icons/close.svg';
import { useParams } from 'react-router-dom';
const url = import.meta.env.VITE_BACKEND_URL;
import gifImage from './assets/gif/hi.gif';

function ProfilePage() {
  const { userID } = useParams();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token or UserID not found');
        }

        const response = await axios.get(`${url}/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.data);
        setEditedProfile(response.data.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Add the edited profile data to FormData
      Object.keys(editedProfile).forEach((key) => {
        formData.append(key, editedProfile[key]);
      });

      const response = await axios.put(`${url}/user/updateProfile/${userID}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile updated successfully:', response.data);

      // Update profile data in the UI
      setProfile((prevProfile) => ({
        ...prevProfile,
        user: {
          ...prevProfile.user,
          ...response.data.updatedUser,
        },
      }));

      // Close modal
      handleCloseModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdateProfilePicture = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('photo', editedProfile.profile);

      const response = await axios.put(`${url}/user/updateProfile/${userID}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile picture updated successfully:', response.data);

      // Update avatar in UI
      setProfile((prevProfile) => ({
        ...prevProfile,
        user: {
          ...prevProfile.user,
          profile: response.data.updatedProfilePicture, // New URL from server
        },
      }));

      // Close photo modal
      setIsPhotoModalOpen(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      profile: file,
    }));
  };

  const handleAvatarClick = () => {
    setIsPhotoModalOpen(true);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Link to="/home">
        <button className="close-btn-main" onClick={() => console.log("Close button clicked")}>
          <img src={closeIcon} alt="Close Icon" />
        </button>
      </Link>
      <div className="profile-left">
        <div className="avatar" onClick={handleAvatarClick}>
          {profile.user.profile ? (
            <img src={`${url}${profile.user.profile}`} alt="User Avatar" />
          ) : (
            <div className="avatar-placeholder">{getInitials(profile.user.username)}</div>
          )}
        </div>

        <h2>{profile.user.username || "No Username"}</h2>
        <div className="info">
          <p>Points: <span>{profile.user.score}</span></p>
          <p>Ranking: <span>{profile.rank || "N/A"}</span></p>
        </div>
      </div>

      <div className="profile-right">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={profile.user.name} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" value={profile.user.email} readOnly />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" value={profile.user.gender} readOnly />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="text" value={profile.user.age} readOnly />
          <div className="gif-container" style={{ position: 'relative' }}>
            <img className="profile-gif" src={gifImage} alt="GIF" style={{
              position: 'absolute',
              left: '750px',
              bottom: '-480px',
              width: '500px',
              height: 'auto'
            }} />
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="edit-profile-btn">Edit Profile</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              <img src={closeIcon} alt="Close Icon" />
            </button>
            <h2 className="edit-text">Edit Profile</h2>
            <div className="form-group-edit">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedProfile.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-edit">
              <label>Gender:</label>
              <select
                name="gender"
                value={editedProfile.gender || ''}
                onChange={handleInputChange}
                className="dropdown"
              >
                <option value="">Select Gender</option>
                <option value="Girl">Girl</option>
                <option value="Boy">Boy</option>
              </select>
            </div>
            <div className="form-group-edit">
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={editedProfile.age || ''}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleUpdate} className="edit-profile-btn">Save Changes</button>
          </div>
        </div>
      )}

      {isPhotoModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsPhotoModalOpen(false)}>
              <img src={closeIcon} alt="Close Icon" />
            </button>
            <h2 className="edit-text">Update Profile Picture</h2>
            <div className="form-group-edit">
              <input
                type="file"
                name="photo"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button onClick={handleUpdateProfilePicture} className="edit-profile-btn">
              Upload Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
