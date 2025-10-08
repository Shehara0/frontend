import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';

function BrowseCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

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

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || course.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    if (loading) return <LoadingSpinner />;

    return (
        <div className="browse-courses-container">
            <h1>Browse Courses</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="courses-grid">
                {filteredCourses.length === 0 ? (
                    <p>No courses found.</p>
                ) : (
                    filteredCourses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))
                )}
            </div>
        </div>
    );
}

export default BrowseCourses;