import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import contentService from '../../services/contentService';

function UploadContent() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        type: 'pdf',
        fileUrl: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const data = await courseService.getCourseById(courseId);
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

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
            const contentData = {
                ...formData,
                courseId: course._id
            };

            await contentService.uploadContent(contentData);
            alert('Content uploaded successfully!');
            navigate(`/instructor/course/${courseId}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Upload Content</h1>
            <p className="text-gray-600 mb-8">Course: {course?.title}</p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Content Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Week 1 - Introduction"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Content Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="pdf">PDF Document</option>
                        <option value="video">Video</option>
                        <option value="link">External Link</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">File URL:</label>
                    <input
                        type="url"
                        name="fileUrl"
                        value={formData.fileUrl}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/file.pdf"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                        Enter the URL where the file is hosted (Google Drive, Dropbox, YouTube, etc.)
                    </p>
                </div>

                <div className="flex gap-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Uploading...' : 'Upload Content'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate(`/instructor/course/${courseId}`)}
                        className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadContent;