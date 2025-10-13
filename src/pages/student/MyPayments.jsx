import React, { useState, useEffect } from 'react';
import paymentService from '../../services/paymentService';
import LoadingSpinner from '../../components/LoadingSpinner';

function MyPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const data = await paymentService.getMyPayments();
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        return status === 'success' ? 'status-success' : 'status-failed';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="my-payments-container">
            <h1>My Payment History</h1>

            {payments.length === 0 ? (
                <div className="empty-state">
                    <p>No payment history yet.</p>
                </div>
            ) : (
                <div className="payments-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Course</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td>{payment.courseId?.title}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td className="transaction-id">{payment.transactionId}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="payment-summary">
                <h2>Summary</h2>
                <div className="summary-stats">
                    <div className="stat">
                        <span>Total Payments:</span>
                        <strong>{payments.length}</strong>
                    </div>
                    <div className="stat">
                        <span>Successful:</span>
                        <strong className="success">
                            {payments.filter(p => p.status === 'success').length}
                        </strong>
                    </div>
                    <div className="stat">
                        <span>Failed:</span>
                        <strong className="failed">
                            {payments.filter(p => p.status === 'failed').length}
                        </strong>
                    </div>
                    <div className="stat">
                        <span>Total Spent:</span>
                        <strong>
                            ${payments.filter(p => p.status === 'success')
                                .reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPayments;