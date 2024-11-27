import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import './GrievanceTrackingPage.css'; // Import the CSS file
import { FaUserCircle } from 'react-icons/fa'; // For the user icon

const GrievanceTrackingPage = () => {
  const [searchId, setSearchId] = useState('');
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Assume username is stored in localStorage
  const username = localStorage.getItem('ceoUsername') || 'User';

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      // Correct URL for fetching grievance by ID
      const response = await axios.get(`http://localhost:8989/grievance/${searchId}`);
      setGrievance(response.data);
    } catch (err) {
      setError('Failed to fetch grievance. Please check the ID and try again.');
      setGrievance(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/ceo-dashboard'); // Navigate to the CEO dashboard
  };

  return (
    <div>
      {/* Header Section with "Back" button and username outside the container */}
      <div className="header">
        <div className="greeting">
          <FaUserCircle className="user-icon" />
          <span>Hello, {username}!</span>
        </div>
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      </div>

      <div className="container">
        <h1 className="title">Grievance Tracking</h1>

        <div className="search-container">
          <input
            type="number"
            placeholder="Enter Grievance Number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="input"
          />
          <button onClick={handleSearch} className="button">Search</button>
        </div>

        {loading && <p className="loading-message">Loading grievance...</p>}
        {error && <p className="error-message">{error}</p>}

        {grievance ? (
          <div className="grievance-container">
            <h2 className="grievance-title">Grievance Details</h2>
            <table className="grievance-table">
              <tbody>
                <tr>
                  <td><strong>Grievance ID</strong></td>
                  <td>{grievance.grievanceId}</td>
                </tr>
                <tr>
                  <td><strong>Date</strong></td>
                  <td>{grievance.date}</td>
                </tr>
                <tr>
                  <td><strong>Department</strong></td>
                  <td>{grievance.department}</td>
                </tr>
                <tr>
                  <td><strong>Designation</strong></td>
                  <td>{grievance.designation}</td>
                </tr>
                <tr>
                  <td><strong>Employee Name</strong></td>
                  <td>{grievance.employeeName}</td>
                </tr>
                <tr>
                  <td><strong>Complainant Name</strong></td>
                  <td>{grievance.complainantName}</td>
                </tr>
                <tr>
                  <td><strong>Aadhaar No</strong></td>
                  <td>{grievance.aadhaarNo}</td>
                </tr>
                <tr>
                  <td><strong>Mobile No</strong></td>
                  <td>{grievance.mobileNo}</td>
                </tr>
                <tr>
                  <td><strong>Taluka</strong></td>
                  <td>{grievance.taluka}</td>
                </tr>
                <tr>
                  <td><strong>Village</strong></td>
                  <td>{grievance.village}</td>
                </tr>
                <tr>
                  <td><strong>Type</strong></td>
                  <td>{grievance.type}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>{grievance.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          searchId && <p className="no-grievance-message">No grievance found with this number.</p>
        )}
      </div>
    </div>
  );
};

export default GrievanceTrackingPage;
