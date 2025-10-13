import api from './api';

const enrollmentService = {
    // Existing methods...
    getMyEnrollments: async () => {
        const response = await api.get('/enrollments/student');
        return response.data;
    },

    getEnrollmentsByCourse: async (courseId) => {
        const response = await api.get(`/enrollments/course/${courseId}`);
        return response.data;
    },

    getAllEnrollments: async () => {
        const response = await api.get('/enrollments');
        return response.data;
    },

    // NEW: Mark content as completed
    markContentComplete: async (enrollmentId, contentId) => {
        const response = await api.post('/enrollments/mark-complete', {
            enrollmentId,
            contentId
        });
        return response.data;
    },

    // NEW: Get student progress for a course
    getStudentProgress: async (courseId) => {
        const response = await api.get(`/enrollments/progress/${courseId}`);
        return response.data;
    }
};

export default enrollmentService;