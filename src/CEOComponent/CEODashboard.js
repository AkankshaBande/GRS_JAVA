// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { LineChart, Line } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon

// const CEODashboard = () => {
//   const [pendingGrievanceCount, setPendingGrievanceCount] = useState(0);
//   const [rejectedGrievanceCount, setRejectedGrievanceCount] = useState(0);
//   const [resolvedGrievanceCount, setResolvedGrievanceCount] = useState(0);
//   const [departmentData, setDepartmentData] = useState([]);
//   const [dailyTrendData, setDailyTrendData] = useState([]);
//   const [topEmployees, setTopEmployees] = useState([]);
//   const [username, setUsername] = useState('');

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       position: 'center',
//       icon: 'success',
//       title: 'You have been logged out',
//       showConfirmButton: false,
//       timer: 1500,
//     });
//     setTimeout(() => {
//       navigate('/employee-login');
//     }, 1500);
//   };

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('ceoUsername');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }

//     axios
//       .get('http://localhost:8989/grievance/getAll')
//       .then((response) => {
//         const grievances = response.data;

//         // Count pending grievances
//         const pendingCount = grievances.filter((g) => g.status === 'pending').length;
//         setPendingGrievanceCount(pendingCount);

//         // Count rejected grievances
//         const rejectedCount = grievances.filter((g) => g.status === 'rejected').length;
//         setRejectedGrievanceCount(rejectedCount);

//         // Count resolved grievances
//         const resolvedCount = grievances.filter((g) => g.status === 'resolved').length;
//         setResolvedGrievanceCount(resolvedCount);

//         // Department-wise grievances
//         const departmentMap = {};
//         grievances.forEach((grievance) => {
//           if (departmentMap[grievance.department]) {
//             departmentMap[grievance.department] += 1;
//           } else {
//             departmentMap[grievance.department] = 1;
//           }
//         });
//         const departmentData = Object.keys(departmentMap).map((department) => ({
//           department,
//           grievances: departmentMap[department],
//         }));
//         setDepartmentData(departmentData);

//         // Daily grievance trends
//         const dailyMap = {};
//         grievances.forEach((grievance) => {
//           const date = grievance.date.split('T')[0];
//           if (dailyMap[date]) {
//             dailyMap[date] += 1;
//           } else {
//             dailyMap[date] = 1;
//           }
//         });
//         const dailyTrendData = Object.keys(dailyMap).map((day) => ({
//           day,
//           grievances: dailyMap[day],
//         }));
//         setDailyTrendData(dailyTrendData);

//         // Top employees with pending grievances
//         const employeePendingMap = {};
//         grievances.forEach((grievance) => {
//           if (grievance.status === 'pending') {
//             if (employeePendingMap[grievance.employeeName]) {
//               employeePendingMap[grievance.employeeName] += 1;
//             } else {
//               employeePendingMap[grievance.employeeName] = 1;
//             }
//           }
//         });

//         const sortedEmployees = Object.keys(employeePendingMap)
//           .map((employee) => ({
//             name: employee,
//             pending: employeePendingMap[employee],
//           }))
//           .sort((a, b) => b.pending - a.pending)
//           .slice(0, 10);
//         setTopEmployees(sortedEmployees);
//       })
//       .catch((error) => console.error('Error fetching grievances:', error));
//   }, []);

//   return (
//     <Box sx={{ padding: '20px', position: 'relative' }}>
//       {/* Top Section */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '20px',
//         }}
//       >
//         {/* Greeting with Icon */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <AccountCircleIcon sx={{ fontSize: '30px', marginRight: '10px' }} color="primary" />
//           <Typography variant="h5">Hello, {username}!</Typography>
//         </Box>
//         <Box>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/grievance-report')}
//             sx={{ marginRight: '10px' }}
//           >
//             View Grievance Report
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/ceo-grievance-tracking')}
//             sx={{ marginRight: '10px' }}
//           >
//             View Tracking Report
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleLogout}
//             style={{ backgroundColor: 'darkred' }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Box>

//       {/* Dashboard Content */}
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Pending Grievances</Typography>
//             <Typography variant="body1">Total Pending: {pendingGrievanceCount}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Rejected Grievances</Typography>
//             <Typography variant="body1">Total Rejected: {rejectedGrievanceCount}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Resolved Grievances</Typography>
//             <Typography variant="body1">Total Resolved: {resolvedGrievanceCount}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Department-wise Grievances</Typography>
//             <BarChart width={500} height={300} data={departmentData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="department" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="grievances" fill="#8884d8" />
//             </BarChart>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Daily Grievance Trends</Typography>
//             <LineChart width={500} height={300} data={dailyTrendData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="grievances" stroke="#82ca9d" />
//             </LineChart>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Top Employees with Pending Grievances</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Employee Name</TableCell>
//                     <TableCell>Pending Grievances</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {topEmployees.map((employee, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{employee.name}</TableCell>
//                       <TableCell>{employee.pending}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CEODashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CEODashboard.css';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon

const CEODashboard = () => {
  const [pendingGrievanceCount, setPendingGrievanceCount] = useState(0);
  const [rejectedGrievanceCount, setRejectedGrievanceCount] = useState(0);
  const [resolvedGrievanceCount, setResolvedGrievanceCount] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [dailyTrendData, setDailyTrendData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('ceoUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    axios
      .get('http://localhost:8989/grievance/getAll')
      .then((response) => {
        const grievances = response.data;

        // Count pending grievances
        const pendingCount = grievances.filter((g) => g.status === 'pending').length;
        setPendingGrievanceCount(pendingCount);

        // Count rejected grievances
        const rejectedCount = grievances.filter((g) => g.status === 'rejected').length;
        setRejectedGrievanceCount(rejectedCount);

        // Count resolved grievances
        const resolvedCount = grievances.filter((g) => g.status === 'resolved').length;
        setResolvedGrievanceCount(resolvedCount);

        // Department-wise grievances
        const departmentMap = {};

// Log grievances to ensure the data is received correctly
console.log('Received grievances:', grievances);

grievances.forEach((grievance) => {
  // Log the raw department field of the grievance
  console.log('Raw grievance.department:', grievance.department);

  // Extract departmentName safely and log it
  const departmentName = typeof grievance.department === 'object'
    ? grievance.department.departmentName // Adjust this key based on the actual object structure
    : grievance.department;

  console.log('Extracted departmentName:', departmentName);

  // Map department counts
  if (departmentMap[departmentName]) {
    departmentMap[departmentName] += 1;
  } else {
    departmentMap[departmentName] = 1;
  }
});

// Log the departmentMap after processing all grievances
console.log('Constructed departmentMap:', departmentMap);

// Convert departmentMap to departmentData array and log it
const departmentData = Object.keys(departmentMap).map((department) => ({
  department,
  grievances: departmentMap[department],
}));
console.log('Mapped departmentData:', departmentData);

// Set the state
setDepartmentData(departmentData);

        
        // Daily grievance trends
        const dailyMap = {};
        grievances.forEach((grievance) => {
          const date = grievance.date.split('T')[0];
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
          if (grievance.status === 'pending') {
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
      .catch((error) => console.error('Error fetching grievances:', error));
  }, []);

  return (
    <Box sx={{ padding: '20px', position: 'relative' }}>
      {/* Top Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {/* Greeting with Icon */}
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  // Centers horizontally
    backgroundColor: '#FFF0F5',  // Background color
    padding: '10px',  // Adds some padding around the content
    borderRadius: '8px',  // Optional: Adds rounded corners to the box
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Optional: Adds a light shadow
  }}
>
  <AccountCircleIcon sx={{ fontSize: '30px', marginRight: '10px' }} color="primary" />
  <Typography variant="h5">Hello, {username}!</Typography>
</Box>

        <Box>
  <Button
    variant="contained"
    onClick={() => navigate('/grievance-report')}
    sx={{
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#4caf50',
      '&:hover': {
        backgroundColor: '#45a049',
        transform: 'scale(1.05)',
      },
      marginRight: '20px',  // Increase space between buttons
    }}
  >
    View Grievance Report
  </Button>
  <Button
    variant="contained"
    onClick={() => navigate('/ceo-grievance-tracking')}
    sx={{
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#2196f3',
      '&:hover': {
        backgroundColor: '#0b79d0',
        transform: 'scale(1.05)',
      },
    }}
  >
    View Tracking Report
  </Button>
</Box>


      </Box>

      {/* Grievance Boxes */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {['Pending', 'Rejected', 'Resolved'].map((status, index) => {
          const count = {
            Pending: pendingGrievanceCount,
            Rejected: rejectedGrievanceCount,
            Resolved: resolvedGrievanceCount,
          }[status];
          const bgColor = {
            Pending: '#FDCB05',
            Rejected: '#E74C3C',
            Resolved: '#45B649',
          }[status];

          return (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: bgColor,
                  color: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: 3,
                }}
              >
                <Typography variant="h6">{`${status} Grievances`}</Typography>
                <Typography sx={{ fontSize: '32px', marginTop: '10px' }}>{count}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Dashboard Content */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
  {/* Bar Chart Grid item */}
  <Grid item xs={12} md={5}>
    <Paper className="bar-chart-container" elevation={3} sx={{ padding: '0px' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '10px' }}>
        Department-wise Grievances
      </Typography>
      <BarChart width={500} height={335} data={departmentData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="department" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="grievances" fill="#8884d8" />
</BarChart>

    </Paper>
  </Grid>

  {/* Line Chart Grid item */}
  <Grid item xs={12} md={7}> {/* Increased width here from 5 to 7 */}
    <Paper elevation={3} sx={{ padding: '0px' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '10px' }}>
        Daily Grievance Trends
      </Typography>
      <LineChart width={700} height={335} data={dailyTrendData}> {/* Increased width here */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="grievances" stroke="#82ca9d" />
      </LineChart>
    </Paper>
  </Grid>
</Grid>

{/* Top Employees with Pending Grievances */}
<Grid item xs={6} md={2}>
<Paper elevation={3} sx={{ padding: '20px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>    <Typography
      variant="h6"
      sx={{
        textAlign: 'center',  // This centers the title
        marginBottom: '1px',  // Adds space below the title
      }}
    >
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


    </Box>
  );
};

export default CEODashboard;