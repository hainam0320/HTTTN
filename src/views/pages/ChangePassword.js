import React, { useState } from 'react';
import axios from 'axios';
import {
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const validatePasswordChange = () => {
    let errors = {};
    let isValid = true;

    if (!currentPassword) {
      errors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      isValid = false;
    }

    if (!newPassword) {
      errors.newPassword = 'Vui lòng nhập mật khẩu mới';
      isValid = false;
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();

    if (validatePasswordChange()) {
      setLoading(true);
      try {
        const userId = localStorage.getItem('loggedInUserId'); 
        const userResponse = await axios.get(`http://localhost:9999/users/${userId}`);
        const user = userResponse.data;

        if (user.password !== currentPassword) {
          setErrors({ currentPassword: 'Mật khẩu hiện tại không đúng' });
          setLoading(false);
          return;
        }

        await axios.patch(`http://localhost:9999/users/${userId}`, {
          password: newPassword,
        });

        setMessage('Đổi mật khẩu thành công');
        setLoading(false);
        // Clear form fields after successful password change
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Redirect to a new route after successful password change
        setTimeout(() => {
          navigate('/profile'); 
        }, 2000); 
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data) {
          setMessage(error.response.data.error);
        } else {
          setMessage('Đã xảy ra lỗi khi đổi mật khẩu.');
        }
      }
    }
  };

  return (
    <CContainer className="change-password-container">
      <CRow className="justify-content-center">
        <CCol md="6">
          <h3 className="text-center mb-4">Change Password</h3>
          {message && (
            <CAlert color={message.includes('thành công') ? 'success' : 'danger'} className="alert">
              {message}
            </CAlert>
          )}
          <form onSubmit={submitPasswordChange}>
            <CFormInput
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              placeholder="Mật khẩu hiện tại"
              className={errors.currentPassword ? 'is-invalid' : ''}
            />
            {errors.currentPassword && (
              <span className="text-danger">{errors.currentPassword}</span>
            )}
            <CFormInput
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="Mật khẩu mới"
              className={errors.newPassword ? 'is-invalid' : ''}
            />
            {errors.newPassword && (
              <span className="text-danger">{errors.newPassword}</span>
            )}
            <CFormInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu mới"
              className={errors.confirmPassword ? 'is-invalid' : ''}
            />
            {errors.confirmPassword && (
              <span className="text-danger">{errors.confirmPassword}</span>
            )}
            <div className="text-center mt-4">
              <CButton type="submit" color="primary" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </CButton>
            </div>
          </form>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ChangePassword;
