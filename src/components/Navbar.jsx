import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-xl font-semibold text-sky-700">LMS Platform</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50">Login</Link>
                                <Link to="/register" className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">Register</Link>
                            </>
                        ) : (
                            <>
                                <span className="hidden sm:inline text-sm text-gray-600">Welcome, {user?.name}</span>

                                {user?.role === 'Student' && (
                                    <>
                                        <Link to="/student/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                        <Link to="/student/browse-courses" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Browse Courses</Link>
                                        <Link to="/student/my-courses" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">My Courses</Link>
                                        <Link to="/student/my-payments" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">My Payments</Link>
                                    </>
                                )}

                                {user?.role === 'Instructor' && (
                                    <>
                                        <Link to="/instructor/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                        <Link to="/instructor/my-courses" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">My Courses</Link>
                                        <Link to="/instructor/create-course" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Create Course</Link>
                                    </>
                                )}

                                {user?.role === 'Admin' && (
                                    <>
                                        <Link to="/admin/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                        <Link to="/admin/pending-courses" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Pending Courses</Link>
                                        <Link to="/admin/all-users" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">All Users</Link>
                                        <Link to="/admin/reports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Reports</Link>
                                    </>
                                )}

                                <button onClick={handleLogout} className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;