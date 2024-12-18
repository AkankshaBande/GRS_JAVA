import React, { useEffect, useState } from "react";
import axios from "axios";
import GrievanceTable from "./GrievanceTable";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

  useEffect(() => {
    const normalizeEmployeeName = (name) => {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    const fetchGrievances = async () => {
      try {
        const storedUsername = localStorage.getItem("employeeUsername");
        if (storedUsername) {
          setUsername(storedUsername);
          const normalizedEmployeeName = normalizeEmployeeName(storedUsername);
          const response = await axios.get(
            `http://localhost:8989/grievance/employee/${normalizedEmployeeName}`
          );
          console.log("Fetched grievances:", response.data);
          setGrievances(response.data);
        }
      } catch (error) {
        console.error("Error fetching grievances:", error);
        Swal.fire("Error", "There was an issue fetching grievances.", "error");
      }
    };
    fetchGrievances();
  }, []); // Run once when component mounts

  // Function to update grievance status in state
  const updateGrievanceStatus = (grievanceId, status) => {
    setGrievances((prevGrievances) =>
      prevGrievances.map((grievance) =>
        grievance.id === grievanceId
          ? { ...grievance, status } // Update the status of the grievance
          : grievance
      )
    );
  };

  const acceptGrievance = async (grievanceId) => {
    const newStatus = "accepted"; // Set the status to "accepted"

    try {
      // Send the new status as a query parameter
      await axios.put(
        `http://localhost:8989/grievance/status/${grievanceId}`,
        null, // No body in the request
        {
          params: {
            newStatus: newStatus, // Include the newStatus as a query parameter
          },
        }
      );

      updateGrievanceStatus(grievanceId, "accepted");
      Swal.fire("Success!", "Grievance accepted.", "success");
    } catch (error) {
      if (error.response) {
        console.error("Error accepting grievance:", error.response.data);
        Swal.fire(
          "Error",
          error.response.data.message || "Could not accept grievance.",
          "error"
        );
      } else {
        console.error("Error details:", error.message);
        Swal.fire(
          "Error",
          error.message || "An unknown error occurred.",
          "error"
        );
      }
    }
  };

  const handleReject = async (grievanceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this grievance!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = "Reason for rejection"; // Replace with actual reason from user input or prompt

        const newStatus = "rejected"; // Set the status to "rejected"

        // Find the grievance to get its current data
        const grievance = grievances.find((g) => g.id === grievanceId);

        // Create the updated grievance object (optional for frontend state updates)
        const updatedGrievance = {
          ...grievance,
          status: newStatus,
          rejectReason: reason,
        };

        // Log the data being sent to the backend
        console.log("Grievance Data Sent to Backend:", updatedGrievance);

        try {
          await axios.put(
            `http://localhost:8989/grievance/status/${grievanceId}`,
            null, // No body in the request
            {
              params: {
                newStatus: newStatus, // Include the newStatus as a query parameter
              },
            }
          );

          // Update state on successful rejection
          updateGrievanceStatus(grievanceId, newStatus);
          Swal.fire({
            title: "Rejected!",
            text: "The grievance has been successfully rejected.",
            icon: "success", // Use "success" for the green checkmark icon
            confirmButtonText: "OK", // Adds an OK button
          });
        } catch (error) {
          // Log detailed error information
          console.error(
            "Error rejecting grievance:",
            error.response ? error.response.data : error.message
          );
          Swal.fire(
            "Error",
            error.response?.data?.message || "Could not reject grievance.",
            "error"
          );
        }
      }
    });
  };

  const handleResolve = async (grievanceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to resolve grievance ${grievanceId}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Resolve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Find the grievance to get its current data
        const grievance = grievances.find((g) => g.id === grievanceId);

        // Create the updated grievance object
        const updatedGrievance = {
          ...grievance,
          status: "resolved", // Set the status to "resolved"
        };

        // Log the data being sent to the backend
        console.log("Grievance Data Sent to Backend:", updatedGrievance);

        try {
          // Send the request with new status as a parameter
          await axios.put(
            `http://localhost:8989/grievance/status/${grievanceId}`,
            null, // No body content in the request
            {
              params: {
                newStatus: "resolved", // Send the status as a query parameter
              },
            }
          );

          // Update state on successful resolution
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
      }
    });
  };

  // const handleTransfer = async (grievanceId, transferDetails) => {
  //   try {
  //     console.log('Transfer details:', transferDetails);
  //   console.log('Grievance ID:', grievanceId);
  //   console.log('New Employee ID:', transferDetails.newEmployeeId); // Check if this value is present

  //     // Send transfer data to the backend
  //     await axios.put(`http://localhost:8989/grievance/transfer`, {
  //       grievanceId: grievanceId,
  //       newEmployeeId: transferDetails.newEmployeeId, // Assuming this is part of transferDetails
  //     });

  //     // Update local state
  //     setGrievances((prevGrievances) =>
  //       prevGrievances.map((g) =>
  //         g.id === grievanceId
  //           ? { ...g, status: 'transferred', assignedTo: transferDetails.employeeName }
  //           : g
  //       )
  //     );

  //     // Show success notification
  //     Swal.fire({
  //       title: 'Transferred!',
  //       text: `Grievance ${grievanceId} has been transferred to ${transferDetails.employeeName}.`,
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     });
  //   } catch (error) {
  //     // Show error notification
  //     Swal.fire({
  //       title: 'Error!',
  //       text: `Failed to transfer grievance ${grievanceId}.`,
  //       icon: 'error',
  //       confirmButtonText: 'Try Again',
  //     });
  //     console.error('Error transferring grievance:', error);
  //   }
  // };
  const handleTransfer = async (grievanceId, transferDetails) => {
    try {
      const grievance = grievances.find((g) => g.id === grievanceId);
      const updatedGrievance = {
        ...grievance,
        department: transferDetails.department,
        status: "Transferred",
        assignedTo: transferDetails.employeeName,
        designation: transferDetails.designation,
      };

      // Use the status "transferred" directly instead of newStatus
      await axios.put(
        `http://localhost:8989/grievance/s/${grievanceId}`,
        null, // No body content in the request
        {
          params: {
            newStatus: "Transferred", // Correctly pass the new status
            newEmployeeName: transferDetails.employeeName, // Pass employee name
          },
        }
      );

      setGrievances((prevGrievances) =>
        prevGrievances.map((g) => (g.id === grievanceId ? updatedGrievance : g))
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

  return (
    <Container>
      <Header>
        <Greeting>
          <AccountCircleIcon style={{ marginRight: "8px", fontSize: "2rem" }} />
          Hello, {username}
        </Greeting>
        <ButtonGroup>
          <Button
            className="back"
            onClick={() => navigate("/employee-grievance-dashboard")}
          >
            Back
          </Button>
        </ButtonGroup>
      </Header>
      <Title>Grievance Report</Title>
      {grievances.length === 0 ? (
        <p>No grievances found.</p>
      ) : (
        <GrievanceTable
          grievances={grievances}
          onAccept={acceptGrievance}
          onReject={handleReject}
          onResolve={handleResolve}
          onTransfer={handleTransfer}
        />
      )}
    </Container>
  );
};

export default EmployeeGrievanceReport;
