import api from './api';

const courseService = {
    // Get all courses
    getAllCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    },

    // Get course by ID
    getCourseById: async (courseId) => {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    },

    // Create course (Instructor)
    createCourse: async (courseData) => {
        const response = await api.post('/courses', courseData);
        return response.data;
    },

    // Update course (Instructor)
    updateCourse: async (courseId, courseData) => {
        const response = await api.put(`/courses/${courseId}`, courseData);
        return response.data;
    },

    // Delete course (Instructor)
    deleteCourse: async (courseId) => {
        const response = await api.delete(`/courses/${courseId}`);
        return response.data;
    }
};

export default courseService;