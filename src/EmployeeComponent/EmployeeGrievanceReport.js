import React, { useEffect, useState } from "react";
import axios from "axios";
import GrievanceTable from "./GrievanceTable";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the icon
import Swal from "sweetalert2"; // Import SweetAlert2

// Styled Components
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

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff; /* Primary color */
  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  min-height: 100vh;
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

  const updateGrievanceStatus = (
    grievanceId,
    newStatus,
    rejectReason = null
  ) => {
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
      Swal.fire({
        icon: "success",
        title: "Grievance Accepted",
        text: `Grievance ${grievanceId} has been accepted successfully.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to accept grievance ${grievanceId}.`,
      });
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
      Swal.fire({
        icon: "success",
        title: "Grievance Rejected",
        text: `Grievance ${grievanceId} has been rejected with reason: ${reason}.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to reject grievance ${grievanceId}.`,
      });
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
      Swal.fire({
        icon: "success",
        title: "Grievance Transferred",
        text: `Grievance ${grievanceId} has been transferred to ${transferDetails.employeeName} (${transferDetails.designation} in ${transferDetails.department}).`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to transfer grievance ${grievanceId}.`,
      });
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
      Swal.fire({
        icon: "success",
        title: "Grievance Resolved",
        text: `Grievance ${grievanceId} has been resolved successfully.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to resolve grievance ${grievanceId}.`,
      });
      console.error("Error resolving grievance:", error);
    }
  };

  const handleBack = () => {
    Swal.fire({
      icon: "info",
      title: "Redirecting",
      text: "Returning to Employee Grievance Dashboard.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/employee-grievance-dashboard");
    });
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar>
        <Greeting>
          <AccountCircleIcon
            sx={{
              fontSize: "30px",
              marginRight: "10px",
              color: "#007bff",
            }}
          />
          Hello, {username}!
        </Greeting>
        <ButtonGroup>
          <Button onClick={handleBack}>Back</Button>
        </ButtonGroup>
      </Navbar>

      <Container>
        <Title>EMPLOYEE GRIEVANCE REPORT</Title>
        <GrievanceTable
          grievances={grievances}
          onAccept={handleAccept}
          onReject={handleReject}
          onTransfer={handleTransfer}
          onResolve={handleResolve}
        />
      </Container>
    </>
  );
};

export default EmployeeGrievanceReport;
