import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await adminService.getDashboard();
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">Welcome to the Admin Panel</p>

            {/* User Statistics */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-4xl font-bold">{dashboardData?.users?.total}</h3>
                        <p className="mt-2 opacity-90">Total Users</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-4xl font-bold">{dashboardData?.users?.students}</h3>
                        <p className="mt-2 opacity-90">Students</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-4xl font-bold">{dashboardData?.users?.instructors}</h3>
                        <p className="mt-2 opacity-90">Instructors</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-4xl font-bold">{dashboardData?.users?.admins}</h3>
                        <p className="mt-2 opacity-90">Admins</p>
                    </div>
                </div>
            </div>

            {/* Course Statistics */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-indigo-600">{dashboardData?.courses?.total}</h3>
                        <p className="text-gray-600 mt-2">Total Courses</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-green-600">{dashboardData?.courses?.approved}</h3>
                        <p className="text-gray-600 mt-2">Approved</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-yellow-600">{dashboardData?.courses?.pending}</h3>
                        <p className="text-gray-600 mt-2">Pending Approval</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-red-600">{dashboardData?.courses?.rejected}</h3>
                        <p className="text-gray-600 mt-2">Rejected</p>
                    </div>
                </div>
            </div>

            {/* Enrollment Statistics */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrollment Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-indigo-600">{dashboardData?.enrollments?.total}</h3>
                        <p className="text-gray-600 mt-2">Total Enrollments</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-green-600">{dashboardData?.enrollments?.paid}</h3>
                        <p className="text-gray-600 mt-2">Paid</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-3xl font-bold text-yellow-600">{dashboardData?.enrollments?.pending}</h3>
                        <p className="text-gray-600 mt-2">Pending Payment</p>
                    </div>
                </div>
            </div>

            

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/admin/pending-courses" 
                        className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-600 transition text-center"
                    >
                        <p className="text-2xl font-bold mb-2">{dashboardData?.courses?.pending}</p>
                        <p className="font-semibold">Pending Courses</p>
                    </Link>
                    <Link to="/admin/all-users" 
                        className="bg-indigo-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 transition text-center"
                    >
                        <p className="font-semibold">View All Users</p>
                    </Link>
                    <Link to="/admin/all-courses" 
                        className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-purple-600 transition text-center"
                    >
                        <p className="font-semibold">View All Courses</p>
                    </Link>
                    <Link to="/admin/reports" 
                        className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transition text-center"
                    >
                        <p className="font-semibold">View Reports</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;