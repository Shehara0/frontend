import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import enrollmentService from '../../services/enrollmentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentDashboard() {
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

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.name}!</h1>
            <p>Student Dashboard</p>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>{enrollments.length}</h3>
                    <p>Enrolled Courses</p>
                </div>
                <div className="stat-card">
                    <h3>{enrollments.filter(e => e.paymentStatus === 'paid').length}</h3>
                    <p>Completed Payments</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <Link to="/student/browse-courses" className="btn-primary">
                    Browse Courses
                </Link>
                <Link to="/student/my-courses" className="btn-secondary">
                    My Courses
                </Link>
                <Link to="/student/my-payments" className="btn-secondary">
                    Payment History
                </Link>
            </div>

            <div className="recent-courses">
                <h2>My Recent Courses</h2>
                {enrollments.length === 0 ? (
                    <p>You haven't enrolled in any courses yet.</p>
                ) : (
                    <div className="courses-grid">
                        {enrollments.slice(0, 3).map((enrollment) => (
                            <div key={enrollment._id} className="course-card">
                                <h3>{enrollment.courseId?.title}</h3>
                                <p>{enrollment.courseId?.description}</p>
                                <span className={`status ${enrollment.paymentStatus}`}>
                                    {enrollment.paymentStatus}
                                </span>
                                <Link 
                                    to={`/student/course/${enrollment.courseId?.courseId}`}
                                    className="btn-primary"
                                >
                                    View Course
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;