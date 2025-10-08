import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {
    const navigate = useNavigate();

    const handleViewCourse = () => {
        navigate(`/student/course/${course.courseId}`);
    };

    return (
        <div className="course-card">
            <h3>{course.title}</h3>
            <p className="course-category">{course.category}</p>
            <p className="course-description">{course.description}</p>
            <div className="course-footer">
                <span className="course-price">${course.price}</span>
                <button onClick={handleViewCourse} className="btn-primary">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default CourseCard;