import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the icon

const CEODashboard = () => {
  const [pendingGrievanceCount, setPendingGrievanceCount] = useState(0);
  const [rejectedGrievanceCount, setRejectedGrievanceCount] = useState(0);
  const [resolvedGrievanceCount, setResolvedGrievanceCount] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [dailyTrendData, setDailyTrendData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have been logged out",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate("/employee-login");
    }, 1500);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("ceoUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    axios
      .get("http://localhost:8989/grievance/getAll")
      .then((response) => {
        const grievances = response.data;

        // Count pending grievances
        const pendingCount = grievances.filter(
          (g) => g.status === "pending"
        ).length;
        setPendingGrievanceCount(pendingCount);

        // Count rejected grievances
        const rejectedCount = grievances.filter(
          (g) => g.status === "rejected"
        ).length;
        setRejectedGrievanceCount(rejectedCount);

        // Count resolved grievances
        const resolvedCount = grievances.filter(
          (g) => g.status === "resolved"
        ).length;
        setResolvedGrievanceCount(resolvedCount);

        // Department-wise grievances
        const departmentMap = {};
        grievances.forEach((grievance) => {
          if (departmentMap[grievance.department]) {
            departmentMap[grievance.department] += 1;
          } else {
            departmentMap[grievance.department] = 1;
          }
        });
        const departmentData = Object.keys(departmentMap).map((department) => ({
          department,
          grievances: departmentMap[department],
        }));
        setDepartmentData(departmentData);

        // Daily grievance trends
        const dailyMap = {};
        grievances.forEach((grievance) => {
          const date = grievance.date.split("T")[0];
          if (dailyMap[date]) {
            dailyMap[date] += 1;
          } else {
            dailyMap[date] = 1;
          }
        });
        const dailyTrendData = Object.keys(dailyMap).map((day) => ({
          day,
          grievances: dailyMap[day],
        }));
        setDailyTrendData(dailyTrendData);

        // Top employees with pending grievances
        const employeePendingMap = {};
        grievances.forEach((grievance) => {
          if (grievance.status === "pending") {
            if (employeePendingMap[grievance.employeeName]) {
              employeePendingMap[grievance.employeeName] += 1;
            } else {
              employeePendingMap[grievance.employeeName] = 1;
            }
          }
        });

        const sortedEmployees = Object.keys(employeePendingMap)
          .map((employee) => ({
            name: employee,
            pending: employeePendingMap[employee],
          }))
          .sort((a, b) => b.pending - a.pending)
          .slice(0, 10);
        setTopEmployees(sortedEmployees);
      })
      .catch((error) => console.error("Error fetching grievances:", error));
  }, []);

  return (
    <Box sx={{ padding: "20px", position: "relative" }}>
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Greeting with Icon */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon
            sx={{ fontSize: "30px", marginRight: "10px" }}
            color="primary"
          />
          <Typography variant="h5">Hello, {username}!</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/grievance-report")}
            sx={{ marginRight: "10px" }}
          >
            View Grievance Report
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/ceo-grievance-tracking")}
            sx={{ marginRight: "10px" }}
          >
            View Tracking Report
          </Button>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">Pending Grievances</Typography>
            <Typography variant="body1">
              Total Pending: {pendingGrievanceCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">Rejected Grievances</Typography>
            <Typography variant="body1">
              Total Rejected: {rejectedGrievanceCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">Resolved Grievances</Typography>
            <Typography variant="body1">
              Total Resolved: {resolvedGrievanceCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">Department-wise Grievances</Typography>
            <BarChart width={500} height={300} data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="grievances" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">Daily Grievance Trends</Typography>
            <LineChart width={500} height={300} data={dailyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="grievances" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h6">
              Top Employees with Pending Grievances
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Pending Grievances</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topEmployees.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.pending}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CEODashboard;
