import React, { useEffect, useState } from 'react'; 
import Filters from './Filters';
import './GrievanceList';
import axios from 'axios';
import './GrievanceReport.css';
import Swal from 'sweetalert2'; // Import Swal for alert messages
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GrievanceReport = () => {
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: { start: "", end: "" },
        status: "",
        department: ""
    });

    const navigate = useNavigate(); // Use navigate for routing

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

    // Navigate back to CEO Dashboard
    const handleBack = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Returning to CEO Dashboard",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/ceo-dashboard');
        });
    };

    return (
        <div>
            <button onClick={handleBack} style={{ position: 'top-end', top: '10px', right: '10px' }}>
                Back
            </button>

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
        </div>
    );
};

export default GrievanceReport;
