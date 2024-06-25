import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [editedProfile, setEditedProfile] = useState({
    editedFullName: '',
    editedEmail: '',
    editedPhone: ''
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch user data from API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:9999/users'); // Adjust endpoint as necessary
      const userData = response.data.users[0]; // Adjust to fetch the specific user data
      setProfile({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.telephone
      });
      setEditedProfile({
        editedFullName: userData.fullName,
        editedEmail: userData.email,
        editedPhone: userData.telephone
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setEditedProfile({
      ...editedProfile,
      editedProfilePicture: URL.createObjectURL(file)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profilePicture', editedProfile.editedProfilePicture);
      formData.append('fullName', editedProfile.editedFullName);
      formData.append('email', editedProfile.editedEmail);
      formData.append('phone', editedProfile.editedPhone);

      await axios.post('http://localhost:9999/users', formData); // Adjust endpoint as necessary

      setProfile({
        profilePicture: editedProfile.editedProfilePicture,
        fullName: editedProfile.editedFullName,
        email: editedProfile.editedEmail,
        phone: editedProfile.editedPhone
      });
      closeModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img src={profile.profilePicture} alt="Profile Picture" />
      </div>
      <div className="profile-details">
        <div className="profile-item">
          <label>Full Name:</label>
          <span>{profile.fullName}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{profile.email}</span>
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          <span>{profile.phone}</span>
        </div>
      </div>
      <button onClick={openModal}>Edit Profile</button>

      {showModal && (
        <div className={`modal ${showModal ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="edit-form">
              <h2>Edit Profile</h2>
              <form onSubmit={submitEdit}>
                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture:</label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="editedProfilePicture"
                    onChange={handleFileInputChange}
                    accept="image/*"
                  />
                </div>
                {editedProfile.editedProfilePicture && (
                  <div className="preview-image">
                    <img
                      src={editedProfile.editedProfilePicture}
                      alt="Profile Picture Preview"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    id="fullName"
                    name="editedFullName"
                    value={editedProfile.editedFullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="editedEmail"
                    value={editedProfile.editedEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="editedPhone"
                    value={editedProfile.editedPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
