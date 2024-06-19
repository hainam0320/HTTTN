import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const usersData = [
    { id: 1, fullName: 'admin', username: 'admin', email: 'admin@example.com', status: true, dateCreated: '2024-06-17' },
    { id: 2, fullName: 'Jane Smith', username: 'jane.smith', email: 'jane.smith@example.com', status: false, dateCreated: '2024-06-16' },
    { id: 3, fullName: 'Alice Johnson', username: 'alice.johnson', email: 'alice.johnson@example.com', status: true, dateCreated: '2024-06-15' },
    { id: 4, fullName: 'Bob Brown', username: 'bob.brown', email: 'bob.brown@example.com', status: false, dateCreated: '2024-06-14' },
    { id: 5, fullName: 'Eve Wilson', username: 'eve.wilson', email: 'eve.wilson@example.com', status: true, dateCreated: '2024-06-13' },
    { id: 6, fullName: 'Michael Davis', username: 'michael.davis', email: 'michael.davis@example.com', status: false, dateCreated: '2024-06-12' },
    { id: 7, fullName: 'Sophia Garcia', username: 'sophia.garcia', email: 'sophia.garcia@example.com', status: true, dateCreated: '2024-06-11' },
    { id: 8, fullName: 'David Rodriguez', username: 'david.rodriguez', email: 'david.rodriguez@example.com', status: false, dateCreated: '2024-06-10' },
    { id: 9, fullName: 'Olivia Martinez', username: 'olivia.martinez', email: 'olivia.martinez@example.com', status: true, dateCreated: '2024-06-09' },
    { id: 10, fullName: 'William Hernandez', username: 'william.hernandez', email: 'william.hernandez@example.com', status: false, dateCreated: '2024-06-08' },
    { id: 11, fullName: 'Emma Lopez', username: 'emma.lopez', email: 'emma.lopez@example.com', status: true, dateCreated: '2024-06-07' },
  ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }, [setIsAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Username và password là bắt buộc.');
      return;
    }

    const user = usersData.find(user => user.username === username);

    if (!user) {
      setError('User không tồn tại.');
      return;
    }

    if (!user.status) {
      setError('User đang chờ duyệt.');
      return;
    }

    if (password !== '123') { // Password cố định
      setError('Password không đúng.');
      return;
    }

    // Nếu hợp lệ, thực hiện đăng nhập
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
