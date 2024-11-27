import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import GrievanceEntry from './HomePage/grievance-entry'; //
import EmployeeGrievanceReport from './EmployeeComponent/EmployeeGrievanceReport';
import GrievanceTypeMasterPage from './HomePage/TypeMaster';
import CEODashboard from './CEOComponent/CEODashboard';
import CEOGrievanceReport from './CEOComponent/CEOGrievanceReport';
import EmployeeDashboard from './EmployeeComponent/EmployeeDashboard';
import GrievanceTrackingPage from './CEOComponent/GrievanceTrackingPage';

import AboutUs from './AboutUS/AboutUs';
import CEOLogin from './components/CEOLogin/CEOLogin';
import EmployeeLogin from './components/EmployeeLogin/EmployeeLogin';
import Navbar from './Navbar/Navbar';
//import GrievanceReportPage from './Grievance Report/GrievanceReportPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './User Login/LoginForm';
import RegistrationForm from './User Login/RegistrationForm';
import ForgotPassword from './User Login/ForgotPassword';

import GrievanceReportPage from './CEOComponent/GrievanceReportPage';
import GrievanceList from './CEOComponent/GrievanceList';
import Filters from './CEOComponent/Filters';
import NotfoundPage from './components/notFound/NotFound';
import UserGrievanceReport from './HomePage/UserGrievenceReport';

import { AuthProvider } from './components/EmployeeLogin/AuthContext';

const App = () => {
    return (
        <AuthProvider>

        <div className="App">

            <Navbar />
            <Routes>
            <Route path="/" element={<HomePage />} /> 
                <Route path="/grievance-type" element={<GrievanceTypeMasterPage />} />
                <Route path="/grievance-entry" element={<GrievanceEntry />} />
                <Route path="/grievance-report" element={<GrievanceReportPage />} />
                <Route path="*" element={<NotfoundPage />} />

                <Route path="/user-login" element={<LoginForm />} />
                <Route path="/sign-up" element={<RegistrationForm />} /> 
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/ceo-login" element={<CEOLogin />} />
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/about-us" element={<AboutUs />} />

                <Route path="/employee-grievancereport" element={<EmployeeGrievanceReport />} />
                <Route path="/employee-grievance-dashboard" element={<EmployeeDashboard />} />

                <Route path="/ceo-dashboard" element={<CEODashboard />} />
                <Route path="/ceo-grievance-report" element={<CEOGrievanceReport />} />
                <Route path="/grievance-list" element={<GrievanceList />} />
                <Route path="/filters" element={<Filters />} />
                <Route path="/ceo-grievance-tracking" element={<GrievanceTrackingPage />} />
                
                <Route path="/user-report" element={<UserGrievanceReport />} />
                
            </Routes>
        </div>
        </AuthProvider>
    );
};

export default App;