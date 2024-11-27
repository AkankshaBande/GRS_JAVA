import React, { useEffect, useState } from "react";
import axios from "axios";
import GrievanceTable from "./GrievanceTable";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the icon
import { useTheme } from "@mui/material/styles"; // Import the theme hook

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.logout {
    background-color: #dc3545; /* Bootstrap danger color */
  }

  &.logout:hover {
    background-color: #c82333; /* Darker shade on hover */
  }

  &.back {
    background-color: #007bff; /* Bootstrap primary color */
  }

  &.back:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Greeting = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
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

  const updateGrievanceStatus = (grievanceId, newStatus, rejectReason = null) => {
    setGrievances((prevGrievances) =>
      prevGrievances.map((g) =>
        g.grievanceId === grievanceId
          ? { ...g, status: newStatus, rejectReason }
          : g
      )
    );
  };

  const handleAccept = async (grievanceId) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = { ...grievance, status: "accepted" };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "accepted");
    } catch (error) {
      console.error("Error accepting grievance:", error);
    }
  };

  const handleReject = async (grievanceId, reason) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = {
        ...grievance,
        status: "rejected",
        rejectReason: reason,
      };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "rejected", reason);
      alert(`Grievance ${grievanceId} rejected with reason: ${reason}`);
    } catch (error) {
      console.error("Error rejecting grievance:", error);
    }
  };

  const handleTransfer = async (grievanceId, transferDetails) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = {
        ...grievance,
        department: transferDetails.department,
        status: "transferred",
        assignedTo: transferDetails.employeeName,
        designation: transferDetails.designation,
      };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      setGrievances((prevGrievances) =>
        prevGrievances.map((g) =>
          g.grievanceId === grievanceId ? updatedGrievance : g
        )
      );
      alert(
        `Grievance ${grievanceId} transferred to ${transferDetails.employeeName} (${transferDetails.designation} in ${transferDetails.department})`
      );
    } catch (error) {
      console.error("Error transferring grievance:", error);
    }
  };

  const handleResolve = async (grievanceId) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = { ...grievance, status: "resolved" };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "resolved");
      alert(`Grievance ${grievanceId} resolved successfully.`);
    } catch (error) {
      console.error("Error resolving grievance:", error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have been logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/employee-login"); // Navigate after the alert
    });
  };

  const handleBack = () => {
    navigate("/employee-grievance-dashboard");
  };

  return (
    <Container>
      <Header>
        <Greeting>
          <AccountCircleIcon
            sx={{
              marginRight: "10px",
              fontSize: "30px",
              color: theme.palette.primary.main,
            }}
          />{" "}
          {/* Primary color */}
          Hello, {username}!
        </Greeting>
        <ButtonGroup>
          <Button className="back" onClick={handleBack}>
            Back
          </Button>
          
        </ButtonGroup>
      </Header>
      <Title>EMPLOYEE GRIEVANCE REPORT</Title>
      <GrievanceTable
        grievances={grievances}
        onAccept={handleAccept}
        onReject={handleReject}
        onTransfer={handleTransfer}
        onResolve={handleResolve}
      />
    </Container>
  );
};

export default EmployeeGrievanceReport;
