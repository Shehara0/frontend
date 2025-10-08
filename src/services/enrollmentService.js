import api from './api';

const enrollmentService = {
    // Get student's enrollments
    getMyEnrollments: async () => {
        const response = await api.get('/enrollments/student');
        return response.data;
    },

    // Get enrollments by course (Instructor)
    getEnrollmentsByCourse: async (courseId) => {
        const response = await api.get(`/enrollments/course/${courseId}`);
        return response.data;
    },

    // Get all enrollments (Admin)
    getAllEnrollments: async () => {
        const response = await api.get('/enrollments');
        return response.data;
    }
};

export default enrollmentService;