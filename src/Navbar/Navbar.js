import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../HomePage/HomePage.css'; // Custom styles

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in (e.g., by checking local storage)
        const username = localStorage.getItem('ceoUsername') || localStorage.getItem('employeeUsername');
        setIsLoggedIn(!!username); // Set to true if username exists, false otherwise
    }, []);

    const handleLogout = () => {
        // Clear the session and redirect to the login page
        localStorage.removeItem('ceoUsername');
        localStorage.removeItem('employeeUsername');
        setIsLoggedIn(false);
        navigate('/employee-login'); // Redirect to the login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid" id="nav_home">
                <a className="navbar-brand" href="/">Grievance Redressal System</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <img src="/Home.png" alt="Home icon" className="nav-icon" /> Home
                            </Link>
                        </li>

                        {/* Conditionally render Login or Logout */}
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link"
                                    onClick={handleLogout}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <img src="/logouticon (2).png" alt="Logout icon" className="nav-icon" /> Logout
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/employee-login">
                                    <img src="/login.png" alt="Login icon" className="nav-icon" /> Login
                                </Link>
                            </li>
                        )}

                        {['About Us'].map((item, index) => {
                            let iconPath;
                            switch (item) {
                                case 'About Us':
                                    iconPath = '/info.png'; // Add an icon for About Us if desired
                                    break;
                                default:
                                    iconPath = '';
                            }
                            return (
                                <li className="nav-item" key={index}>
                                    {item === 'About Us' ? (
                                        <Link className="nav-link" to="/about-us">
                                            <img src={iconPath} alt={`${item} icon`} className="nav-icon" /> {item}
                                        </Link>
                                    ) : (
                                        <Link
                                            className="nav-link"
                                            to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                                        >
                                            <img src={iconPath} alt={`${item} icon`} className="nav-icon" /> {item}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
