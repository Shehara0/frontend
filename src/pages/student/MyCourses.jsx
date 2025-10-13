import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function MyCourses() {
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
        <div className="my-courses-container">
            <h1>My Enrolled Courses</h1>

            {enrollments.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't enrolled in any courses yet.</p>
                    <Link to="/student/browse-courses" className="btn-primary">
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="courses-grid">
                    {enrollments.map((enrollment) => (
                        <div key={enrollment._id} className="course-card enrolled">
                            <div className="course-header">
                                <h3>{enrollment.courseId?.title}</h3>
                                <span className={`badge ${enrollment.paymentStatus}`}>
                                    {enrollment.paymentStatus}
                                </span>
                            </div>
                            
                            <p className="course-category">{enrollment.courseId?.category}</p>
                            <p className="course-description">
                                {enrollment.courseId?.description}
                            </p>
                            
                            <div className="course-info">
                                <span className="price">${enrollment.courseId?.price}</span>
                                <span className="enrolled-date">
                                    Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="course-actions">
                                <Link 
                                    to={`/student/course/${enrollment.courseId?.courseId}`}
                                    className="btn-primary"
                                >
                                    View Course
                                </Link>
                                {enrollment.paymentStatus === 'paid' && (
                                    <span className="access-granted">✓ Access Granted</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCourses;