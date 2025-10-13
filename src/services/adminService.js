import api from './api';

const adminService = {
    // Get dashboard overview
    getDashboard: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    // Get pending courses
    getPendingCourses: async () => {
        const response = await api.get('/admin/courses/pending');
        return response.data;
    },

    // Approve course
    approveCourse: async (courseId) => {
        const response = await api.put(`/admin/courses/${courseId}/approve`);
        return response.data;
    },

    // Reject course
    rejectCourse: async (courseId) => {
        const response = await api.put(`/admin/courses/${courseId}/reject`);
        return response.data;
    },

    // Get all users
    getAllUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    // Get revenue by course
    getRevenueByCourse: async () => {
        const response = await api.get('/admin/revenue/by-course');
        return response.data;
    },

    // Get top enrolled courses
    getTopEnrolledCourses: async () => {
        const response = await api.get('/admin/courses/top-enrolled');
        return response.data;
    },

    // Get recent activities
    getRecentActivities: async () => {
        const response = await api.get('/admin/activities/recent');
        return response.data;
    }
};

export default adminService;