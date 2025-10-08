import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

function Navbar() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">LMS Platform</Link>
            </div>

            <div className="navbar-links">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <span>Welcome, {user?.name}</span>
                        
                        {user?.role === 'Student' && (
                            <>
                                <Link to="/student/dashboard">Dashboard</Link>
                                <Link to="/student/browse-courses">Browse Courses</Link>
                                <Link to="/student/my-courses">My Courses</Link>
                                <Link to="/student/my-payments">My Payments</Link>
                            </>
                        )}

                        {user?.role === 'Instructor' && (
                            <>
                                <Link to="/instructor/dashboard">Dashboard</Link>
                                <Link to="/instructor/my-courses">My Courses</Link>
                                <Link to="/instructor/create-course">Create Course</Link>
                            </>
                        )}

                        {user?.role === 'Admin' && (
                            <>
                                <Link to="/admin/dashboard">Dashboard</Link>
                                <Link to="/admin/pending-courses">Pending Courses</Link>
                                <Link to="/admin/all-users">All Users</Link>
                                <Link to="/admin/reports">Reports</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;