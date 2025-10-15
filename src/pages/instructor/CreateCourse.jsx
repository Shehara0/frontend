import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';

function CreateCourse() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseId: '',
        title: '',
        description: '',
        category: '',
        price: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await courseService.createCourse(formData);
            alert('Course created successfully! Waiting for admin approval.');
            navigate('/instructor/my-courses');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Create New Course</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Course ID:</label>
                    <input
                        type="text"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                        placeholder="e.g., CS101"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Course Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Introduction to Programming"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Describe your course..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="">Select Category</option>
                        <option value="Computer Science">Science</option>
                        <option value="Business">Mathematics</option>
                        <option value="Design">History</option>
                        <option value="Marketing">Econ</option>
                        <option value="Mathematics">Commerce</option>
                        <option value="Science">Ict</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Price ($):</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="e.g., 99.99"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="flex gap-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/instructor/dashboard')}
                        className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCourse;