import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing the Back Arrow Icon
import { useTheme } from '@mui/material/styles';

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

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: #007bff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &.back {
    font-weight: bold;
    font-size: 16px;
  }

  &.back:hover {
    background-color: #0056b3;
  }
`;

const CEOGrievanceReport = () => {
  const [grievances, setGrievances] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: '',
    department: '',
  });
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get('http://localhost:8989/api/grievances');
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();

    const storedUsername = localStorage.getItem('ceoUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredGrievances = grievances.filter((grievance) => {
    const formattedGrievanceDate = format(new Date(grievance.date), 'yyyy-MM-dd');
    const matchesDateFrom = !filters.dateFrom || formattedGrievanceDate >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || formattedGrievanceDate <= filters.dateTo;
    const matchesStatus = !filters.status || grievance.status === filters.status;
    const matchesDepartment = !filters.department || grievance.department === filters.department;

    return matchesDateFrom && matchesDateTo && matchesStatus && matchesDepartment;
  });

  return (
    <Container>
      <Header>
        <Greeting>
          <AccountCircleIcon
            sx={{
              marginRight: '10px',
              fontSize: '30px',
              color: theme.palette.primary.main,
            }}
          />
          Hello, {username}!
        </Greeting>
        <ButtonGroup>
          <Button className="back" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </ButtonGroup>
      </Header>

      <Typography variant="h4" gutterBottom>
        CEO Grievance Report
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            label="Date From"
            type="date"
            fullWidth
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            label="Date To"
            type="date"
            fullWidth
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            label="Status"
            select
            fullWidth
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            label="Department"
            select
            fullWidth
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Grievance Table */}
      <TableContainer component={Paper}>
        <Table aria-label="grievance table">
          <TableHead>
            <TableRow>
              <TableCell>Grievance Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Employee Assigned</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrievances.length > 0 ? (
              filteredGrievances.map((grievance) => (
                <TableRow key={grievance.id}>
                  <TableCell>{grievance.grievanceNumber}</TableCell>
                  <TableCell>{format(new Date(grievance.date), 'dd-MM-yyyy')}</TableCell>
                  <TableCell>{grievance.department}</TableCell>
                  <TableCell>{grievance.employee}</TableCell>
                  <TableCell>{grievance.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No grievances found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CEOGrievanceReport;
