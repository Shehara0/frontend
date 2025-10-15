import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import courseService from '../../services/courseService';
import LoadingSpinner from '../../components/LoadingSpinner';

function InstructorDashboard() {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            
            // Try multiple matching strategies
            const myCourses = data.filter(course => {
                // Strategy 1: Compare _id as strings
                if (course.instructorId?._id && user?._id) {
                    return String(course.instructorId._id) === String(user._id);
                }
                
                // Strategy 2: Compare emails
                if (course.instructorId?.email && user?.email) {
                    return course.instructorId.email === user.email;
                }
                
                // Strategy 3: If instructorId is just a string (not populated)
                if (typeof course.instructorId === 'string' && user?._id) {
                    return course.instructorId === user._id;
                }
                
                return false;
            });
            
            setCourses(myCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    const pendingCourses = courses.filter(c => c.status === 'pending').length;
    const approvedCourses = courses.filter(c => c.status === 'approved').length;
    const rejectedCourses = courses.filter(c => c.status === 'rejected').length;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mb-8">Instructor Dashboard</p>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-indigo-600">{courses.length}</h3>
                    <p className="text-gray-600 mt-2">Total Courses</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-green-600">{approvedCourses}</h3>
                    <p className="text-gray-600 mt-2">Approved Courses</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-yellow-600">{pendingCourses}</h3>
                    <p className="text-gray-600 mt-2">Pending Approval</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-red-600">{rejectedCourses}</h3>
                    <p className="text-gray-600 mt-2">Rejected Courses</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link 
                        to="/instructor/create-course" 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Create New Course
                    </Link>
                    <Link 
                        to="/instructor/my-courses" 
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        View My Courses
                    </Link>
                </div>
            </div>

            {/* Recent Courses */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Courses</h2>
                {courses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
                        <Link 
                            to="/instructor/create-course"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Create Your First Course
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.slice(0, 3).map((course) => (
                            <div key={course._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                                <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                                    {course.category}
                                </span>
                                <span className={`inline-block ml-2 text-xs px-3 py-1 rounded-full ${
                                    course.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    course.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {course.status}
                                </span>
                                <div className="mt-4">
                                    <Link 
                                        to={`/instructor/course/${course.courseId}`}
                                        className="block w-full bg-indigo-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                    >
                                        View Details
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

export default InstructorDashboard;