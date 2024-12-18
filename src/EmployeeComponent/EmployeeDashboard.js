import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the icon
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #fff; /* White background */
  border: 1px solid #ddd;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 1200px; /* Limit the width of the dashboard section */
`;

const Title = styled.h4`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const EmployeeDashboard = () => {
  const [data, setData] = useState([
    { name: "pending", count: 0 },
    { name: "resolved", count: 0 },
    { name: "rejected", count: 0 },
  ]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8989/grievance/getAll"
        );
        const fetchedGrievances = response.data;

        const pendingCount = fetchedGrievances.filter(
          (grievance) => grievance.status === "pending"
        ).length;
        const resolvedCount = fetchedGrievances.filter(
          (grievance) => grievance.status === "resolved"
        ).length;
        const rejectedCount = fetchedGrievances.filter(
          (grievance) => grievance.status === "rejected"
        ).length;

        setData([
          { name: "pending", count: pendingCount },
          { name: "resolved", count: resolvedCount },
          { name: "rejected", count: rejectedCount },
        ]);
      } catch (error) {
        console.error("Error fetching grievance data:", error);
      }
    };

    fetchGrievanceData();

    // Get username from local storage
    const storedUsername = localStorage.getItem("employeeUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleReportClick = () => {
    navigate("/employee-grievancereport");
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar>
        <Greeting>
          <AccountCircleIcon
            sx={{ fontSize: "30px", marginRight: "10px" }}
            color="primary"
          />
          Hello, {username}!
        </Greeting>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReportClick}
          >
            Employee Grievance Report
          </Button>
        </ButtonGroup>
      </Navbar>

      {/* Dashboard Content */}
      <Container>
        <Title>Employee Dashboard</Title>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickCount={6} domain={[0, "dataMax + 1"]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </>
  );
};

export default EmployeeDashboard;
