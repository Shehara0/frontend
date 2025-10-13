import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import courseService from '../../services/courseService';
import contentService from '../../services/contentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function InstructorCourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const courseData = await courseService.getCourseById(courseId);
            setCourse(courseData);

            const contentData = await contentService.getContentByCourse(courseData._id);
            setContents(contentData);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContent = async (contentId) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await contentService.deleteContent(contentId);
                alert('Content deleted successfully');
                fetchCourseDetails();
            } catch (error) {
                alert('Failed to delete content');
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl font-bold text-gray-800">{course?.title}</h1>
                    <span className={`text-sm px-4 py-2 rounded-full font-semibold ${
                        course?.status === 'approved' ? 'bg-green-100 text-green-800' :
                        course?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {course?.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Course ID</p>
                        <p className="text-lg font-semibold text-gray-800">{course?.courseId}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="text-lg font-semibold text-gray-800">{course?.category}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-lg font-semibold text-indigo-600">${course?.price}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">{course?.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link 
                        to={`/instructor/edit-course/${course?.courseId}`}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Edit Course
                    </Link>
                    <Link 
                        to={`/instructor/upload-content/${course?.courseId}`}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Upload Content
                    </Link>
                    <Link 
                        to={`/instructor/enrolled-students/${course?.courseId}`}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        View Enrolled Students
                    </Link>
                </div>
            </div>

            {/* Course Materials */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Course Materials ({contents.length})
                </h2>
                
                {contents.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No materials uploaded yet.</p>
                        <Link 
                            to={`/instructor/upload-content/${course?.courseId}`}
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Upload First Material
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {contents.map((content) => (
                            <div key={content._id} className="flex items-center justify-between bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{content.title}</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold">
                                            {content.type}
                                        </span>
                                        <p className="text-sm text-gray-600">
                                            Uploaded: {new Date(content.uploadedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a 
                                        href={content.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                    >
                                        View
                                    </a>
                                    <button 
                                        onClick={() => handleDeleteContent(content._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InstructorCourseDetails;