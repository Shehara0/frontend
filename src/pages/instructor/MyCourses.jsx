import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';
import LoadingSpinner from '../../components/LoadingSpinner';

function InstructorMyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await courseService.deleteCourse(courseId);
                alert('Course deleted successfully');
                fetchCourses();
            } catch (error) {
                alert('Failed to delete course: ' + error.response?.data?.message);
            }
        }
    };

     if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">My Courses</h1>
                <Link 
                    to="/instructor/create-course" 
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Create New Course
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600 mb-6">You haven't created any courses yet.</p>
                    <Link 
                        to="/instructor/create-course" 
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Create Your First Course
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                                <span className={`text-xs px-3 py-1 rounded-full ${
                                    course.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    course.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {course.status}
                                </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">ID: {course.courseId}</p>
                            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full mb-3">
                                {course.category}
                            </span>
                            <p className="text-gray-700 mb-4 line-clamp-3">{course.description}</p>
                            <p className="text-2xl font-bold text-indigo-600 mb-4">${course.price}</p>

                            <div className="flex flex-col gap-2">
                                <Link 
                                    to={`/instructor/course/${course.courseId}`}
                                    className="w-full bg-indigo-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    View Details
                                </Link>
                                <div className="flex gap-2">
                                    <Link 
                                        to={`/instructor/edit-course/${course.courseId}`}
                                        className="flex-1 bg-gray-200 text-gray-800 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                    >
                                        Edit
                                    </Link>
                                    <Link 
                                        to={`/instructor/upload-content/${course.courseId}`}
                                        className="flex-1 bg-gray-200 text-gray-800 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                    >
                                        Content
                                    </Link>
                                </div>
                                <button 
                                    onClick={() => handleDelete(course.courseId)}
                                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InstructorMyCourses;