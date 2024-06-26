import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';

const getLoggedInUserId = () => {
  return localStorage.getItem('loggedInUserId'); 
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedProfilePicture, setEditedProfilePicture] = useState(null);
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedUsername, setEditedUsername] = useState('');

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId) {
      fetchUserProfile(userId);
    } else {
      console.error('No user ID found. Please log in.');
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9999/users/${userId}`);
      setUserProfile(response.data);
      setEditedFullName(response.data.fullName);
      setEditedEmail(response.data.email);
      setEditedPhone(response.data.telephone);
      setEditedUsername(response.data.username);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const userId = getLoggedInUserId();
    
    // Fetch current user data to preserve other fields
    let currentUserData;
    try {
      const response = await axios.get(`http://localhost:9999/users/${userId}`);
      currentUserData = response.data;
    } catch (error) {
      console.error('Error fetching current user data:', error);
      return;
    }

    const updatedProfile = {
      ...currentUserData, // Keep all existing data
      fullName: editedFullName,
      email: editedEmail,
      telephone: editedPhone,
    };

    if (editedProfilePicture) {
      updatedProfile.profilePicture = editedProfilePicture;
    }

    try {
      await axios.put(`http://localhost:9999/users/${userId}`, updatedProfile);
      fetchUserProfile(userId); 
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>Not found profile user.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img src={userProfile.profilePicture} alt="Avatar" />
      </div>
      <div className="profile-details">
        <div className="profile-item">
          <label>Username:</label>
          <span>{editedUsername}</span>
        </div>
        <div className="profile-item">
          <label>Full Name:</label>
          <span>{editedFullName}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{editedEmail}</span>
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          <span>{editedPhone}</span>
        </div>
      </div>
      <button className="edit-button" onClick={() => setShowModal(true)}>Edit Profile</button>

      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <div className="edit-form">
              <h2>Edit Profile</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="profilePicture">Avatar:</label>
                  <input type="file" id="profilePicture" onChange={handleFileInputChange} accept="image/*" />
                </div>
                {editedProfilePicture && (
                  <div className="preview-image">
                    <img src={editedProfilePicture} alt="Preview Avatar" />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name:</label>
                  <input type="text" id="fullName" value={editedFullName} onChange={(e) => setEditedFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" id="phone" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} required />
                </div>
                <div className="form-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
