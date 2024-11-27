

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './TypeMaster.css';

function GrievanceTypeMasterPage() {
  const [grievances, setGrievances] = useState([]);
  const [currentGrievance, setCurrentGrievance] = useState(null);
  const [newGrievanceType, setNewGrievanceType] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterErrorMessage, setFilterErrorMessage] = useState('');

  const API_URL = 'http://localhost:8989/grievanceType';
  const navigate = useNavigate(); // Use the navigate function

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(API_URL);
      setGrievances(response.data);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    }
  };

  const handleAddGrievance = async () => {
    const trimmedGrievanceType = newGrievanceType.trim();
    if (validateInput(trimmedGrievanceType)) {
      try {
        const newGrievance = { type: trimmedGrievanceType };
        const response = await axios.post(API_URL, newGrievance);
        setGrievances([...grievances, response.data]);
        resetForm();
      } catch (error) {
        console.error('Error adding grievance:', error);
      }
    }
  };

  const handleDeleteGrievance = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setGrievances(grievances.filter((grievance) => grievance.grievanceTypeId !== id));
    } catch (error) {
      console.error('Error deleting grievance:', error);
    }
  };

  const handleEditClick = (grievance) => {
    setCurrentGrievance(grievance);
    setNewGrievanceType(grievance.type);
    setErrorMessage('');
  };

  const handleUpdateGrievance = async () => {
    const trimmedGrievanceType = newGrievanceType.trim();
    if (validateInput(trimmedGrievanceType)) {
      try {
        const updatedGrievance = { type: trimmedGrievanceType };
        const response = await axios.put(`${API_URL}/${currentGrievance.grievanceTypeId}`, updatedGrievance);
        setGrievances(grievances.map((grievance) =>
          grievance.grievanceTypeId === currentGrievance.grievanceTypeId ? response.data : grievance
        ));
        resetForm();
      } catch (error) {
        console.error('Error updating grievance:', error);
      }
    }
  };

  const resetForm = () => {
    setNewGrievanceType('');
    setCurrentGrievance(null);
    setErrorMessage('');
  };

  const validateInput = (trimmedGrievanceType) => {
    const letterOnlyRegex = /^[a-zA-Z\s]*$/;

    if (!trimmedGrievanceType) {
      setErrorMessage('Grievance type cannot be empty.');
      return false;
    }
    if (!letterOnlyRegex.test(trimmedGrievanceType)) {
      setErrorMessage('Only letters are allowed.');
      return false;
    }
    if (grievances.some((grievance) => grievance.type.toLowerCase() === trimmedGrievanceType.toLowerCase())) {
      setErrorMessage('Grievance type already exists.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const letterOnlyRegex = /^[a-zA-Z\s]*$/;
    if (!letterOnlyRegex.test(value)) {
      setFilterErrorMessage('Only letters are allowed in the search field.');
    } else {
      setFilterErrorMessage('');
    }
    setFilter(value.replace(/[^a-zA-Z\s]/g, ''));
  };

  const filteredGrievances = grievances.filter((grievance) =>
    grievance.type && grievance.type.toLowerCase().includes(filter.toLowerCase())
  );

  // Back button handler
  const handleBack = () => {
    navigate('/grievance-entry', { state: { grievance: currentGrievance } });
  };

  return (
    <div className="container">
      <h2>Grievance Type Master</h2>
      <div className="form" style={{ margin: '5px' }}>
        <input
          type="text"
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          value={newGrievanceType}
          onChange={(e) => setNewGrievanceType(e.target.value.trim())} // Remove spaces on input change
          placeholder="Enter Grievance Type"
        />
        {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
        <button
          className="btn btn-primary"
          onClick={currentGrievance ? handleUpdateGrievance : handleAddGrievance} style={{ marginTop: '5px' }}
        >
          {currentGrievance ? 'Update Grievance Type' : 'Add Grievance Type'}
        </button>
        <button className="btn btn-secondary" onClick={handleBack} style={{ marginTop: '5px' }}>
           Back to Grievance Entry
        </button>
      </div>

      <div className="filter">
        <input
          type="text"
          className={`form-control ${filterErrorMessage ? 'is-invalid' : ''}`}
          placeholder="Search Grievance TypeðŸ”"
          value={filter}
          onChange={handleFilterChange}
        />
        {filterErrorMessage && <div className="invalid-feedback">{filterErrorMessage}</div>}
      </div>

      <div className="grievance-list" style={{ marginTop: '20px' }}>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Grievance Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrievances.map((grievance) => (
              <tr key={grievance.grievanceTypeId}>
                <td>{grievance.type || 'N/A'}</td>
                <td>
                <button style={{ margin: '5px' }}
                    className="btn-delete" 
                    onClick={() => handleDeleteGrievance(grievance.grievanceTypeId)}
                  >
                    Delete
                  </button>
                  <button style={{ margin: '5px' }}
                    className="btn-edit"
                    onClick={() => handleEditClick(grievance)}
                  >
                    Edit
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GrievanceTypeMasterPage;
