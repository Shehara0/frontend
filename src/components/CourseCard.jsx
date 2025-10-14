import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
    const navigate = useNavigate();

    const handleViewCourse = () => {
        navigate(`/student/course/${course.courseId}`);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{course.category}</p>
            <p className="mt-3 text-gray-700">{course.description}</p>
            <div className="mt-6 flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">${course.price}</span>
                <button onClick={handleViewCourse} className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
                    View Details
                </button>
            </div>
        </div>
    );
}