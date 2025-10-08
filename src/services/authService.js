import api from './api';

const authService = {
    // Register user
    register: async (userData) => {
        const response = await api.post('/user', userData);
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/user/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    }
};

export default authService;