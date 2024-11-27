import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeLogin.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Employee', // Default role set to Employee
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, role } = formData;

    // Form validation
    if (!username || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8989/api/users/login`, {
        username,
        password,
        role,
      });

      if (response.status === 200) {
        // Save username in local storage or session storage
        localStorage.setItem(`${role.toLowerCase()}Username`, username);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${role} logged in successfully`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate based on role
        navigate(role === 'CEO' ? '/ceo-dashboard' : '/employee-grievance-dashboard');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        console.error('Error logging in:', error);
        setErrorMessage('Error logging in: ' + error.message);
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
              <button
                type="button"
                onClick={handleTogglePassword}
                className={styles.passwordToggleIcon}
                style={{ width: '50px' }}
              >
                {passwordVisible ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-users`}></i>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.login__input}
              >
                <option value="Employee">Employee</option>
                <option value="CEO">CEO</option>
              </select>
            </div>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <button className={`${styles.button} ${styles.login__submit}`}>
              <span className={styles.button__text}>Log In</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.socialLogin}>
            <h3>Log In</h3>
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

export default EmployeeLogin;
