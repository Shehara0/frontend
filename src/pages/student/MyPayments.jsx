import React, { useState, useEffect } from 'react';
import paymentService from '../../services/paymentService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function MyPayments() {
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

    const getStatusBadge = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'success' || s === 'paid') return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
        if (s === 'pending') return 'bg-amber-50 text-amber-700 ring-amber-200';
        return 'bg-rose-50 text-rose-700 ring-rose-200';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Payment History</h1>
            </div>

            {payments.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-gray-600">No payment history yet.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Course</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Method</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Transaction ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50/60">
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.courseId?.title}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">${payment.amount}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{payment.paymentMethod}</td>
                                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{payment.transactionId}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadge(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">Total Payments</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900">{payments.length}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">Successful</div>
                        <div className="mt-1 text-2xl font-bold text-emerald-700">{payments.filter(p => p.status === 'success').length}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">Failed</div>
                        <div className="mt-1 text-2xl font-bold text-rose-700">{payments.filter(p => p.status === 'failed').length}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600">Total Spent</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900">${payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}