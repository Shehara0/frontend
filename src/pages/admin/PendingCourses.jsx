import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

function PendingCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingCourses();
    }, []);

    const fetchPendingCourses = async () => {
        try {
            const data = await adminService.getPendingCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching pending courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (courseId) => {
        if (window.confirm('Are you sure you want to approve this course?')) {
            try {
                await adminService.approveCourse(courseId);
                alert('Course approved successfully!');
                fetchPendingCourses();
            } catch (error) {
                alert('Failed to approve course: ' + error.response?.data?.message);
            }
        }
    };

    const handleReject = async (courseId) => {
        if (window.confirm('Are you sure you want to reject this course?')) {
            try {
                await adminService.rejectCourse(courseId);
                alert('Course rejected successfully!');
                fetchPendingCourses();
            } catch (error) {
                alert('Failed to reject course: ' + error.response?.data?.message);
            }
        }
    };

   if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pending Courses</h1>
            <p className="text-gray-600 mb-8">Review and approve/reject courses</p>

            {courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-gray-600 text-lg">No pending courses at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                            {/* Header */}
                            <div className="bg-yellow-500 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold">{course.title}</h3>
                                    <span className="bg-yellow-600 text-xs px-3 py-1 rounded-full font-semibold">
                                        Pending
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Course ID:</span>
                                        <span className="text-sm font-semibold text-gray-800">{course.courseId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Category:</span>
                                        <span className="text-sm font-semibold text-gray-800">{course.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Price:</span>
                                        <span className="text-sm font-semibold text-indigo-600">${course.price}</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <p className="text-sm text-gray-600 mb-1">Instructor:</p>
                                        <p className="font-semibold text-gray-800">{course.instructorId?.name}</p>
                                        <p className="text-sm text-gray-600">{course.instructorId?.email}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Description:</p>
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleApprove(course.courseId)}
                                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                                    >
                                        <span>✓</span> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleReject(course.courseId)}
                                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                                    >
                                        <span>✗</span> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PendingCourses;