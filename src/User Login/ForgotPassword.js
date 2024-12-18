import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  
  const isPasswordValid = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordPattern.test(password);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(emailOrPhone)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8989/forgot-password', {
        email: emailOrPhone,
        occupation: occupation
      });
  
      if (response.status === 200 && response.data) {
        setStep(2); // Move to step 2 for password reset
      } else {
        alert('Email and occupation do not match.');
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid(newPassword)) {
      alert('Password must be at least 12 characters, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }
  
    if (newPassword === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:8989/reset-password', {
          email: emailOrPhone,
          password: newPassword
        });
  
        console.log('Password reset successful:', response.data);
        alert('Password reset successfully.');
  
        // Reset form data
        setEmailOrPhone('');
        setOccupation('');
        setNewPassword('');
        setConfirmPassword('');
        setStep(1); // Go back to step 1 after successful reset
        
        // Navigate to login page
        navigate('/user-login');
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Failed to reset password. Please try again.');
      }
    } else {
      alert('Passwords do not match.');
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev); // Toggle the new password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev); // Toggle the confirm password visibility
  };

  return (
    <div className="wrapper">
      <div className="title"><span>Forgot Password</span></div>
      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Email"
              value={emailOrPhone}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-briefcase"></i>
            <input
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={handleOccupationChange}
              required
            />
          </div>
          <div className="row button">
            <input type="submit" value="Verify Details" />
          </div>
          <div className="pass" style={{ marginTop: '20px' }}>
            <a href="/user-login">Remembered your password?</a>
          </div>
          <div className="signup-link">Not a member? <a href="/sign-up">Signup now</a></div>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <div className="row">
            <i className="fas fa-lock"></i>
            <div className="password-field">
              <input
                type={showNewPassword ? 'text' : 'password'} // Toggle input type based on showNewPassword state
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <button
                type="button"
                style={{width: '50px'}}
                className="password-toggle"
                onClick={toggleNewPasswordVisibility}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <div className="password-field">
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Toggle input type based on showConfirmPassword state
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <button
                type="button"
                style={{width: '50px'}}
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="row button">
            <input type="submit" value="Reset Password" />
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
