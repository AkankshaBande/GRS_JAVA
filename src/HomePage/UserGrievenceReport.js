import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserGrievenceReport.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const UserGrievanceReport = () => {
    const [grievances, setGrievances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [itemsPerPage] = useState(10); // Number of items per page
    const navigate = useNavigate();

    const handleLogout = () => {
        // SweetAlert confirmation before logout
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Your logout logic here (remove token, clear session, etc.)
                navigate('/user-login'); // Navigate to login page
            }
        });
    };

    // Fetch grievances from the backend
    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const response = await axios.get('http://localhost:8989/grievance/getAll'); // Replace with your actual API endpoint
                setGrievances(response.data);
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };

        fetchGrievances();
    }, []);

    // Get the current page's grievances
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGrievances = grievances.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(grievances.length / itemsPerPage);

    return (
        <div className="container">
            <h1 className="text-center">Grievance Report</h1>

            {/* Grievance Table */}
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
                    {currentGrievances.map(grievance => (
                        <tr key={grievance.grievanceId}>
                            <td>{grievance.grievanceId}</td>
                            <td>{grievance.date}</td>
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

            {/* Pagination Controls */}
            <div className="pagination-container">
                <nav aria-label="Pagination">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>

                        {/* Pagination Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Logout Button */}
            {/* <div className="logout-container">
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div> */}
        </div>
    );
};

export default UserGrievanceReport;
