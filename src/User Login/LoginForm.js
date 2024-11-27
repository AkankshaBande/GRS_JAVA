import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'User', // Default role
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, password } = formData;
    const errors = {};
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fix the errors before submitting the form.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8989/api/users/login', formData);

      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${formData.role} logged in successfully`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate to the appropriate dashboard based on the role
        if (formData.role === 'User') navigate('/grievance-entry');
        else if (formData.role === 'Employee') navigate('/employee-grievance-dashboard');
        else if (formData.role === 'CEO') navigate('/ceo-dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.response?.data?.message || 'Login failed. Please try again.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  return (
    <div className="container" style={{ width: '450px' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="User">User</option>
            <option value="Employee">Employee</option>
            <option value="CEO">CEO</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">
            <FontAwesomeIcon icon={faEnvelope} /> Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button
              type="button"
              style={{ width: '50px' }}
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="register-link">
        <p>Not registered yet? <a href="/sign-up">Click here to register</a></p>
      </div>
      <div className="forgot-password-link">
        <p><a href="/forgot-password">Forgot Password?</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
