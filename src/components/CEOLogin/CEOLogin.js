import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import styles from './CEOLogin.module.css';
import { AuthContext } from '../EmployeeLogin/AuthContext';  // Correct path to AuthContext

const CEOLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill out all fields.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8989/api/users/login', {
        username,
        password,
        role: 'CEO',  // Ensure role-specific login
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'CEO logged in successfully!',
        });
        localStorage.setItem('user', JSON.stringify({ username, role: 'CEO' }));
        setIsLoggedIn(true);
        navigate('/ceo-dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Invalid username or password.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error logging in: ${error.message}`,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={styles.login__input}
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.login__input}
              />
              <button type="button" onClick={handleTogglePassword} className={styles.passwordToggleIcon} style={{ width: '50px' }}>
                {passwordVisible ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            <button className={`${styles.button} ${styles.login__submit}`} type="submit">
              <span className={styles.button__text}>Log In</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.socialLogin}>
            <h3>CEO Log In</h3>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
        </div>
      </div>
    </div>
  );
};

export default CEOLogin;