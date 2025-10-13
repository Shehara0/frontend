import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function EnrolledStudents() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const fetchData = async () => {
        try {
            const courseData = await courseService.getCourseById(courseId);
            setCourse(courseData);

            const enrollmentData = await enrollmentService.getEnrollmentsByCourse(courseData._id);
            setEnrollments(enrollmentData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Enrolled Students</h1>
            <h2 className="text-2xl text-gray-600 mb-8">{course?.title}</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-3xl font-bold text-indigo-600">{enrollments.length}</h3>
                    <p className="text-gray-600 mt-2">Total Enrollments</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-3xl font-bold text-green-600">
                        {enrollments.filter(e => e.paymentStatus === 'paid').length}
                    </h3>
                    <p className="text-gray-600 mt-2">Paid Students</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-3xl font-bold text-yellow-600">
                        {enrollments.filter(e => e.paymentStatus === 'pending').length}
                    </h3>
                    <p className="text-gray-600 mt-2">Pending Payments</p>
                </div>
            </div>

            {/* Students Table */}
            {enrollments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600">No students enrolled yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Student Name</th>
                                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left font-semibold">Enrolled Date</th>
                                    <th className="px-6 py-4 text-left font-semibold">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-gray-800">
                                            {enrollment.studentId?.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {enrollment.studentId?.email}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                enrollment.paymentStatus === 'paid' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {enrollment.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EnrolledStudents;