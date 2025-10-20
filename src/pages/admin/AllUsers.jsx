import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = filter === 'All' 
        ? users 
        : users.filter(user => user.role === filter);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">All Users</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{users.length}</h3>
                    <p className="mt-2 opacity-90">Total Users</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{users.filter(u => u.role === 'Student').length}</h3>
                    <p className="mt-2 opacity-90">Students</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{users.filter(u => u.role === 'Instructor').length}</h3>
                    <p className="mt-2 opacity-90">Instructors</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{users.filter(u => u.role === 'Admin').length}</h3>
                    <p className="mt-2 opacity-90">Admins</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-semibold">Filter by Role:</label>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="All">All Users</option>
                        <option value="Student">Students</option>
                        <option value="Instructor">Instructors</option>
                        <option value="Admin">Admins</option>
                    </select>
                    <span className="text-gray-600">
                        Showing {filteredUsers.length} users
                    </span>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Name</th>
                                <th className="px-6 py-4 text-left font-semibold">Email</th>
                                <th className="px-6 py-4 text-left font-semibold">Role</th>
                         {/*      { <th className="px-6 py-4 text-left font-semibold">Joined Date</th> }   */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                            user.role === 'Instructor' ? 'bg-purple-100 text-purple-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;