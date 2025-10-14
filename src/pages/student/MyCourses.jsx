import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function MyCourses() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const data = await enrollmentService.getMyEnrollments();
            setEnrollments(data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Enrolled Courses</h1>

            {enrollments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
                    <Link 
                        to="/student/browse-courses" 
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment) => (
                        <div key={enrollment._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{enrollment.courseId?.title}</h3>
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                        enrollment.paymentStatus === 'paid' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {enrollment.paymentStatus}
                                    </span>
                                </div>
                                
                                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                                    {enrollment.courseId?.category}
                                </span>
                                
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {enrollment.courseId?.description}
                                </p>
                                
                                {/* Progress Bar */}
                                {enrollment.progress !== undefined && (
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">Progress</span>
                                            <span className="text-sm font-bold text-indigo-600">
                                                {enrollment.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all"
                                                style={{ width: `${enrollment.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${enrollment.courseId?.price}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <Link 
                                    to={`/student/course/${enrollment.courseId?.courseId || enrollment.courseId?._id}`}
                                    className="block w-full bg-indigo-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    {enrollment.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}