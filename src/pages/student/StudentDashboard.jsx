import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function StudentDashboard() {
    const { user } = useContext(AuthContext);
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

    const getStatusClasses = (status) => {
        const normalized = (status || '').toLowerCase();
        if (normalized === 'paid' || normalized === 'completed') {
            return 'inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200';
        }
        if (normalized === 'pending') {
            return 'inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200';
        }
        return 'inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200';
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="mt-1 text-gray-600">Student Dashboard</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="text-3xl font-bold text-gray-900">{enrollments.length}</div>
                    <div className="mt-1 text-sm text-gray-600">Enrolled Courses</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="text-3xl font-bold text-gray-900">{enrollments.filter(e => e.paymentStatus === 'paid').length}</div>
                    <div className="mt-1 text-sm text-gray-600">Completed Payments</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link to="/student/browse-courses" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                        Browse Courses
                    </Link>
                    <Link to="/student/my-courses" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        My Courses
                    </Link>
                    <Link to="/student/my-payments" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Payment History
                    </Link>
                </div>
            </div>

            {/* Recent Courses */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900">My Recent Courses</h2>
                {enrollments.length === 0 ? (
                    <p className="mt-2 text-gray-600">You haven't enrolled in any courses yet.</p>
                ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {enrollments.slice(0, 3).map((enrollment) => (
                            <div key={enrollment._id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="text-base font-semibold text-gray-900">{enrollment.courseId?.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{enrollment.courseId?.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className={getStatusClasses(enrollment.paymentStatus)}>
                                        {enrollment.paymentStatus || 'unknown'}
                                    </span>
                                    <Link 
                                        to={`/student/course/${enrollment.courseId?.courseId || enrollment.courseId?._id}`}
                                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                    >
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
