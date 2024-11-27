import React, { useEffect, useState } from 'react'; 
import Filters from './Filters';
import './GrievanceList';
import axios from 'axios';
import './GrievanceReport.css';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';

const GrievanceReport = () => {
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: { start: "", end: "" },
        status: "",
        department: ""
    });

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const response = await axios.get('http://localhost:8989/grievance/getAll'); // Replace with your actual API endpoint
                
                // Sort grievances by date in descending order
                const sortedGrievances = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setGrievances(sortedGrievances);
                setFilteredGrievances(sortedGrievances); // Initially show all grievances sorted by date
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };

        fetchGrievances();
    }, []);

    // Function to format the date as DD-MM-YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Apply filters whenever the filters state changes
    useEffect(() => {
        let filteredData = grievances;

        // Filter by date range
        if (filters.dateRange.start) {
            filteredData = filteredData.filter(grievance =>
                new Date(grievance.date) >= new Date(filters.dateRange.start)
            );
        }
        if (filters.dateRange.end) {
            filteredData = filteredData.filter(grievance =>
                new Date(grievance.date) <= new Date(filters.dateRange.end)
            );
        }

        // Filter by status
        if (filters.status) {
            filteredData = filteredData.filter(grievance => grievance.status === filters.status);
        }

        // Filter by department
        if (filters.department) {
            filteredData = filteredData.filter(grievance => grievance.department === filters.department);
        }

        setFilteredGrievances(filteredData); // Update the filtered data to be displayed
    }, [filters, grievances]);

    return (
        <div>
            <h1>Grievance Report</h1>

            {/* Filters component */}
            <Filters filters={filters} setFilters={setFilters} />

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
                    {filteredGrievances.map(grievance => (
                        <tr key={grievance.grievanceId}>
                            <td>{grievance.grievanceId}</td>
                            <td>{formatDate(grievance.date)}</td> {/* Format date as DD-MM-YYYY */}
                            <td>{grievance.department}</td>
                            <td>{grievance.designation}</td>
                            <td>{grievance.employeeName}</td>
                            <td>{grievance.complainantName}</td>
                            <td>{grievance.type}</td>
                            <td>{grievance.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/user-report">
          <Button variant="primary">View User Report</Button>
        </Link>
      </div>
        </div>
    );
};

export default GrievanceReport;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './grievanceReport.css';
// import { useNavigate } from 'react-router-dom';

// const GrievanceReport = () => {
//     const [grievances, setGrievances] = useState([]);
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         // Logic to clear user session can be added here if needed
//         navigate('/ceo-login'); // Navigate to login page
//     };
//     useEffect(() => {
//         const fetchGrievances = async () => {
//             try {
//                 // Update the URL to match your backend endpoint
//                 const response = await axios.get('http://localhost:8989/grievance/getAll'); // Replace with your actual API endpoint
//                 setGrievances(response.data);
//             } catch (error) {
//                 console.error("Error fetching grievances:", error);
//             }
//         };

//         fetchGrievances();
//     }, []);

//     return (
//         <div>
//             <h1>Grievance Report</h1>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Grievance Id</th>
//                         <th>Date</th>
//                         <th>Department</th>
//                         <th>Designation</th> {/* Added Designation column */}
//                         <th>Employee Name</th>
//                         <th>Complainant Name</th>
//                         <th>Grievance Type</th>
//                         <th>Status</th> {/* Removed Aadhaar Number as per your request */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {grievances.map(grievance => (
//                         <tr key={grievance.grievanceId}>
//                             <td>{grievance.grievanceId}</td> {/* Display Grievance ID */}
//                             <td>{grievance.date}</td>
//                             <td>{grievance.department}</td>
//                             <td>{grievance.designation}</td> {/* Display Designation */}
//                             <td>{grievance.employeeName}</td>
//                             <td>{grievance.complainantName}</td>
//                             <td>{grievance.type}</td>
//                             <td>{grievance.status}</td> {/* Display status */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="logout-button-container">
//                 <button className="btn-danger" onClick={handleLogout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default GrievanceReport;

