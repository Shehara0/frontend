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

            // Fetch course contents
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
            const enrolled = enrollments.some(e => e.courseId?.courseId === courseId);
            setIsEnrolled(enrolled);
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
                fetchCourseDetails(); // Refresh to show content
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Payment failed. Please try again.');
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error && !course) return <div className="error-message">{error}</div>;

    return (
        <div className="course-details-container">
            <div className="course-header">
                <h1>{course?.title}</h1>
                <div className="course-meta">
                    <span className="category">{course?.category}</span>
                    <span className="price">${course?.price}</span>
                </div>
            </div>

            <div className="course-content">
                <div className="course-info">
                    <h2>About This Course</h2>
                    <p>{course?.description}</p>

                    <div className="instructor-info">
                        <h3>Instructor</h3>
                        <p>{course?.instructorId?.name}</p>
                        <p>{course?.instructorId?.email}</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    {!isEnrolled ? (
                        <button 
                            onClick={handleEnroll} 
                            disabled={paymentLoading}
                            className="btn-primary enroll-btn"
                        >
                            {paymentLoading ? 'Processing Payment...' : `Enroll Now - $${course?.price}`}
                        </button>
                    ) : (
                        <div className="enrolled-badge">
                            ✓ You are enrolled in this course
                        </div>
                    )}
                </div>

                <div className="course-materials">
                    <h2>Course Materials</h2>
                    
                    {!isEnrolled ? (
                        <div className="locked-content">
                            <p>🔒 Enroll in this course to access materials</p>
                        </div>
                    ) : contents.length === 0 ? (
                        <p>No materials available yet.</p>
                    ) : (
                        <div className="content-list">
                            {contents.map((content) => (
                                <div key={content._id} className="content-item">
                                    <div className="content-info">
                                        <h3>{content.title}</h3>
                                        <span className="content-type">{content.type}</span>
                                    </div>
                                    <a 
                                        href={content.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                    >
                                        {content.type === 'video' ? '▶ Watch' : '📄 View'}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;