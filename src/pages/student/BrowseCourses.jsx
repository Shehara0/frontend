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
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Browse Courses</h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:max-w-md"
                />

                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:w-56"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm">No courses found.</div>
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