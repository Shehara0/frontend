import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';
import LoadingSpinner from '../../components/LoadingSpinner';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = filter === 'All' 
        ? courses 
        : courses.filter(course => course.status === filter.toLowerCase());

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">All Courses</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{courses.length}</h3>
                    <p className="mt-2 opacity-90">Total Courses</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{courses.filter(c => c.status === 'approved').length}</h3>
                    <p className="mt-2 opacity-90">Approved</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{courses.filter(c => c.status === 'pending').length}</h3>
                    <p className="mt-2 opacity-90">Pending</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
                    <h3 className="text-4xl font-bold">{courses.filter(c => c.status === 'rejected').length}</h3>
                    <p className="mt-2 opacity-90">Rejected</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-semibold">Filter by Status:</label>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="All">All Courses</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <span className="text-gray-600">
                        Showing {filteredCourses.length} courses
                    </span>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Course ID</th>
                                <th className="px-6 py-4 text-left font-semibold">Title</th>
                                <th className="px-6 py-4 text-left font-semibold">Instructor</th>
                                <th className="px-6 py-4 text-left font-semibold">Category</th>
                                <th className="px-6 py-4 text-left font-semibold">Price</th>
                                <th className="px-6 py-4 text-left font-semibold">Status</th>
                                <th className="px-6 py-4 text-left font-semibold">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCourses.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-800">
                                        {course.courseId}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {course.instructorId?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-indigo-600">
                                        ${course.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            course.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            course.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(course.createdAt).toLocaleDateString()}
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

export default AllCourses;