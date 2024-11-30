import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GrievanceReport.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

// Styled Components for Navbar and Header
const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
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

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
  padding: 10px;
`;

const FilterInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const FilterSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 15px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
    color: white;
  }
`;

const GrievanceReport = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    status: "",
    department: "",
  });

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 8; // Number of items per page
  const navigate = useNavigate();

  // Assume username is stored in localStorage
  const username = localStorage.getItem("ceoUsername") || "User";

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8989/grievance/getAll"
        );
        const sortedGrievances = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setGrievances(sortedGrievances);
        setFilteredGrievances(sortedGrievances);
      } catch (error) {
        console.error("Error fetching grievances:", error);
      }
    };

    fetchGrievances();
  }, []);

  // Format the date as DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Apply filters whenever the filters state changes
  useEffect(() => {
    let filteredData = grievances;

    // Filter by date range
    if (filters.dateRange.start) {
      filteredData = filteredData.filter(
        (grievance) =>
          new Date(grievance.date) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filteredData = filteredData.filter(
        (grievance) =>
          new Date(grievance.date) <= new Date(filters.dateRange.end)
      );
    }

    // Filter by status (case-insensitive)
    if (filters.status) {
      filteredData = filteredData.filter(
        (grievance) =>
          grievance.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Filter by department (case-insensitive)
    if (filters.department) {
      filteredData = filteredData.filter(
        (grievance) =>
          grievance.department?.toLowerCase() ===
          filters.department.toLowerCase()
      );
    }

    setFilteredGrievances(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, grievances]);

  // Handle pagination
  const indexOfLastGrievance = currentPage * itemsPerPage;
  const indexOfFirstGrievance = indexOfLastGrievance - itemsPerPage;
  const currentGrievances = filteredGrievances.slice(
    indexOfFirstGrievance,
    indexOfLastGrievance
  );

  const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate back to CEO Dashboard
  const handleBack = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Returning to CEO Dashboard",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/ceo-dashboard");
    });
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

      {/* Grievance Report Section */}
      <Container>
        <Title>Grievance Report</Title>

        {/* Filters */}
        <FiltersContainer>
          <div>
            <label>Date From:</label>
            <FilterInput
              type="date"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label>Date To:</label>
            <FilterInput
              type="date"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label>Status:</label>
            <FilterSelect
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="Pending">pending</option>
              <option value="Transferred">transferred</option>
              <option value="Resolved">resolved</option>
              <option value="Rejected">rejected</option>
            </FilterSelect>
          </div>
          <div>
            <label>Department:</label>
            <FilterSelect
              value={filters.department}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, department: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="Health">health</option>
              <option value="Education">education</option>
              <option value="Finance">finance</option>
              <option value="IT">IT</option>
              <option value="Operations">operations</option>
            </FilterSelect>
          </div>
        </FiltersContainer>

        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Grievance Id</th>
              <th>Date</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Employee Name</th>
              <th>Complainant Name</th>
              <th>Grievance Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentGrievances.length > 0 ? (
              currentGrievances.map((grievance) => (
                <tr key={grievance.grievanceId}>
                  <td>{grievance.grievanceId}</td>
                  <td>{formatDate(grievance.date)}</td>
                  <td>{grievance.department}</td>
                  <td>{grievance.designation}</td>
                  <td>{grievance.employeeName}</td>
                  <td>{grievance.complainantName}</td>
                  <td>{grievance.type}</td>
                  <td>{grievance.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No grievances found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      </Container>
    </>
  );
};

export default GrievanceReport;
