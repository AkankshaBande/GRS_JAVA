import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GrievanceTrackingPage.css";
import { FaUserCircle } from "react-icons/fa"; // For the user icon
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  padding: 20px;
  background-color: #fff; /* White background */
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 800px; /* Limit the width of the tracking section */
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const GrievanceTrackingPage = () => {
  const [searchId, setSearchId] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Assume username is stored in localStorage
  const username = localStorage.getItem("ceoUsername") || "User";

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8989/grievance/${searchId}`
      );
      setGrievance(response.data);
    } catch (err) {
      setError("Failed to fetch grievance. Please check the ID and try again.");
      setGrievance(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/ceo-dashboard");
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar>
        <Greeting>
          <FaUserCircle
            style={{ marginRight: "10px", fontSize: "30px", color: "#007bff" }}
          />
          Hello, {username}!
        </Greeting>
        <Button onClick={handleBack}>Back</Button>
      </Navbar>

      {/* Grievance Tracking Section */}
      <Container>
        <Title>Grievance Tracking</Title>

        <div className="search-container">
          <input
            type="number"
            placeholder="Enter Grievance Number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="input"
          />
          <button onClick={handleSearch} className="button">
            Search
          </button>
        </div>

        {loading && <p className="loading-message">Loading grievance...</p>}
        {error && <p className="error-message">{error}</p>}

        {grievance ? (
          <div className="grievance-container">
            <h2 className="grievance-title">Grievance Details</h2>
            <table className="grievance-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Grievance ID</strong>
                  </td>
                  <td>{grievance.grievanceId}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Date</strong>
                  </td>
                  <td>{grievance.date}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Department</strong>
                  </td>
                  <td>{grievance.department}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Designation</strong>
                  </td>
                  <td>{grievance.designation}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Employee Name</strong>
                  </td>
                  <td>{grievance.employeeName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Complainant Name</strong>
                  </td>
                  <td>{grievance.complainantName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Aadhaar No</strong>
                  </td>
                  <td>{grievance.aadhaarNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mobile No</strong>
                  </td>
                  <td>{grievance.mobileNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Taluka</strong>
                  </td>
                  <td>{grievance.taluka}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Village</strong>
                  </td>
                  <td>{grievance.village}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Type</strong>
                  </td>
                  <td>{grievance.type}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Status</strong>
                  </td>
                  <td>{grievance.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          searchId && <p className="no-grievance-message"></p>
        )}
      </Container>
    </>
  );
};

export default GrievanceTrackingPage;
