import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

function Reports() {
    const [topCourses, setTopCourses] = useState([]);
    const [revenueByCourse, setRevenueByCourse] = useState([]);
    const [recentActivities, setRecentActivities] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const [topCoursesData, revenueData, activitiesData] = await Promise.all([
                adminService.getTopEnrolledCourses(),
                adminService.getRevenueByCourse(),
                adminService.getRecentActivities()
            ]);

            setTopCourses(topCoursesData);
            setRevenueByCourse(revenueData);
            setRecentActivities(activitiesData);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Reports & Analytics</h1>

            {/* Top Enrolled Courses */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Top 10 Enrolled Courses</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Rank</th>
                                <th className="px-6 py-4 text-left font-semibold">Course Title</th>
                                <th className="px-6 py-4 text-left font-semibold">Course ID</th>
                                <th className="px-6 py-4 text-left font-semibold">Total Enrollments</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {topCourses.map((course, index) => (
                                <tr key={course._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                            index === 1 ? 'bg-gray-300 text-gray-700' :
                                            index === 2 ? 'bg-orange-400 text-orange-900' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {course.courseTitle}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                        {course.courseId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full font-bold">
                                            {course.totalEnrollments}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue by Course */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Revenue by Course</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Course Title</th>
                                <th className="px-6 py-4 text-left font-semibold">Course ID</th>
                                <th className="px-6 py-4 text-left font-semibold">Total Payments</th>
                                <th className="px-6 py-4 text-left font-semibold">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {revenueByCourse.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {course.courseTitle}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                        {course.courseId}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {course.totalPayments}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-green-600 text-lg">
                                            ${course.totalRevenue.toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Enrollments */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Enrollments</h2>
                    <div className="space-y-4">
                        {recentActivities?.recentEnrollments?.map((enrollment) => (
                            <div key={enrollment._id} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                <p className="text-gray-800">
                                    <span className="font-bold">{enrollment.studentId?.name}</span> enrolled in{' '}
                                    <span className="font-bold text-indigo-600">{enrollment.courseId?.title}</span>
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {new Date(enrollment.enrolledAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Payments</h2>
                    <div className="space-y-4">
                        {recentActivities?.recentPayments?.map((payment) => (
                            <div key={payment._id} className={`border-l-4 p-4 rounded ${
                                payment.status === 'success' 
                                    ? 'bg-green-50 border-green-500' 
                                    : 'bg-red-50 border-red-500'
                            }`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-gray-800">
                                            <span className="font-bold">{payment.studentId?.name}</span> paid{' '}
                                            <span className="font-bold text-green-600">${payment.amount}</span> for{' '}
                                            <span className="font-bold text-indigo-600">{payment.courseId?.title}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {new Date(payment.paymentDate).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                        payment.status === 'success' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {payment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;