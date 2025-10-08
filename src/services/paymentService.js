import api from './api';

const paymentService = {
    // Make payment (Student)
    makePayment: async (paymentData) => {
        const response = await api.post('/payments', paymentData);
        return response.data;
    },

    // Get student's payments
    getMyPayments: async () => {
        const response = await api.get('/payments/student');
        return response.data;
    },

    // Get payment summary (Admin)
    getPaymentSummary: async () => {
        const response = await api.get('/payments/summary');
        return response.data;
    },

    // Get all payments (Admin)
    getAllPayments: async () => {
        const response = await api.get('/payments');
        return response.data;
    }
};

export default paymentService;