import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the icon
import styled from "styled-components";
import { useTheme } from "@mui/material/styles"; // Import the theme hook
import GrievanceTable from "./GrievanceTable"; // Assuming GrievanceTable is already set up

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff; /* Primary color */

  &.back:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff; /* White background */
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 1200px; /* Limit the width of the report section */
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const EmployeeGrievanceReport = () => {
  const [grievances, setGrievances] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const theme = useTheme(); // Access Material-UI theme

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8989/grievance/getAll"
        );
        console.log("Fetched grievances:", response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error("Error fetching grievances:", error);
      }
    };

    fetchGrievances();

    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("employeeUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleBack = () => {
    navigate("/employee-grievance-dashboard");
  };

  return (
    <>
      <Navbar>
        <Greeting>
          <AccountCircleIcon
            sx={{
              fontSize: "30px",
              marginRight: "10px",
              color: theme.palette.primary.main,
            }}
          />
          Hello, {username}!
        </Greeting>
        <ButtonGroup>
          <Button className="back" onClick={handleBack}>
            Back
          </Button>
        </ButtonGroup>
      </Navbar>

      <Container>
        <Title>EMPLOYEE GRIEVANCE REPORT</Title>

        {/* Grievance Table: Reusing GrievanceTable component */}
        <GrievanceTable grievances={grievances} />
      </Container>
    </>
  );
};

export default EmployeeGrievanceReport;
