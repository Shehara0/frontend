import api from './api';

const contentService = {
    // Get content by course
    getContentByCourse: async (courseId) => {
        const response = await api.get(`/contents/course/${courseId}`);
        return response.data;
    },

    // Upload content (Instructor)
    uploadContent: async (contentData) => {
        const response = await api.post('/contents', contentData);
        return response.data;
    },

    // Update content (Instructor)
    updateContent: async (contentId, contentData) => {
        const response = await api.put(`/contents/${contentId}`, contentData);
        return response.data;
    },

    // Delete content (Instructor)
    deleteContent: async (contentId) => {
        const response = await api.delete(`/contents/${contentId}`);
        return response.data;
    },

    // Get all content (Admin)
    getAllContent: async () => {
        const response = await api.get('/contents');
        return response.data;
    }
};

export default contentService;