import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import contentService from '../../services/contentService';
import paymentService from '../../services/paymentService';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [progress, setProgress] = useState(null);
    const [completedContentIds, setCompletedContentIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourseDetails();
        checkEnrollment();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const courseData = await courseService.getCourseById(courseId);
            setCourse(courseData);

            const contentData = await contentService.getContentByCourse(courseData._id);
            setContents(contentData);
        } catch (error) {
            console.error('Error fetching course:', error);
            setError('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollment = async () => {
        try {
            const enrollments = await enrollmentService.getMyEnrollments();
            const enrollment = enrollments.find(e => (e.courseId?.courseId || e.courseId?._id?.toString()) === courseId);
            
            if (enrollment) {
                setIsEnrolled(true);
                setEnrollmentData(enrollment);
                
                // Fetch progress
                const courseData = await courseService.getCourseById(courseId);
                const progressData = await enrollmentService.getStudentProgress(courseData._id);
                setProgress(progressData);
                setCompletedContentIds(progressData.completedContentIds);
            }
        } catch (error) {
            console.error('Error checking enrollment:', error);
        }
    };

    const handleEnroll = async () => {
        setPaymentLoading(true);
        setError('');

        try {
            const paymentData = {
                courseId: course._id,
                paymentMethod: 'credit_card'
            };

            const response = await paymentService.makePayment(paymentData);

            if (response.enrolled) {
                alert('Payment successful! You are now enrolled in this course.');
                setIsEnrolled(true);
                checkEnrollment(); // Refresh enrollment data
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Payment failed. Please try again.');
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleMarkComplete = async (contentId) => {
        try {
            await enrollmentService.markContentComplete(enrollmentData._id, contentId);
            
            // Update local state
            setCompletedContentIds([...completedContentIds, contentId]);
            
            // Refresh progress
            const courseData = await courseService.getCourseById(courseId);
            const progressData = await enrollmentService.getStudentProgress(courseData._id);
            setProgress(progressData);
            
            alert('Content marked as completed!');
        } catch (error) {
            alert('Failed to update progress');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error && !course) return <div className="text-center text-red-600 py-8">{error}</div>;

    const isContentCompleted = (contentId) => {
        return completedContentIds.includes(contentId);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <span className="inline-block bg-indigo-600 text-white text-sm px-4 py-2 rounded-full font-semibold">
                        {course?.category}
                    </span>
                    <span className="text-3xl font-bold text-indigo-600">${course?.price}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">About This Course</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{course?.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">Instructor</h3>
                    <p className="text-gray-700">{course?.instructorId?.name}</p>
                    <p className="text-gray-600 text-sm">{course?.instructorId?.email}</p>
                </div>

                {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}

                {!isEnrolled ? (
                    <button 
                        onClick={() => navigate(`/student/checkout/${courseId}`)}
                        className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition"
                    >
                        {`Enroll Now - $${course?.price}`}
                    </button>
                ) : (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <p className="text-green-800 font-semibold">✓ You are enrolled in this course</p>
                    </div>
                )}
            </div>

            {/* Progress Bar (Only if enrolled) */}
            {isEnrolled && progress && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
                        <span className="text-2xl font-bold text-indigo-600">{progress.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${progress.progress}%` }}
                        ></div>
                    </div>
                    
                    <p className="text-gray-600">
                        {progress.completedContents} of {progress.totalContents} materials completed
                    </p>
                </div>
            )}

            {/* Course Materials */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Materials</h2>
                
                {!isEnrolled ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔒</div>
                        <p className="text-gray-600 text-lg">Enroll in this course to access materials</p>
                    </div>
                ) : contents.length === 0 ? (
                    <p className="text-gray-600">No materials available yet.</p>
                ) : (
                    <div className="space-y-4">
                        {contents.map((content, index) => {
                            const completed = isContentCompleted(content._id);
                            
                            return (
                                <div 
                                    key={content._id} 
                                    className={`flex items-center justify-between p-6 rounded-lg border-2 transition ${
                                        completed 
                                            ? 'bg-green-50 border-green-500' 
                                            : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                                            completed 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-gray-300 text-gray-700'
                                        }`}>
                                            {completed ? '✓' : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
                                            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold mt-2">
                                                {content.type}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <a 
                                            href={content.fileUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                        >
                                            {content.type === 'video' ? '▶ Watch' : '📄 View'}
                                        </a>
                                        {!completed && (
                                            <button
                                                onClick={() => handleMarkComplete(content._id)}
                                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDetails;