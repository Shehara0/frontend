import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import paymentService from '../../services/paymentService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Checkout() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null); 

    useEffect(() => {
        const run = async () => {
            try {
                const data = await courseService.getCourseById(courseId);
                setCourse(data);
            } catch (e) {
                setError('Failed to load course');
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [courseId]);

    const priceLabel = useMemo(() => (course ? `$${course.price}` : ''), [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!course) return;
        setError('');
        setIsProcessing(true);
        setProgress(0);
        setResult(null);

        
        const start = Date.now();
        const timer = setInterval(() => {
            const pct = Math.min(100, Math.round((Date.now() - start) / 20));
            setProgress(pct);
        }, 40);

        try {
            
            const response = await paymentService.makePayment({
                courseId: course._id,
                paymentMethod: 'card',
                cardLast4: cardNumber.slice(-4),
            });
            setResult(response.enrolled ? 'success' : 'failed');
        } catch (err) {
            setResult('failed');
            setError(err.response?.data?.message || 'Payment failed');
        } finally {
            clearInterval(timer);
            setProgress(100);
            setTimeout(() => {
                setIsProcessing(false);
            }, 300);
        }
    };

    const goToCourse = () => {
        navigate(`/student/course/${courseId}`);
    };

    if (loading) return <LoadingSpinner />;
    if (error && !course) return <div className="text-center text-red-600 py-8">{error}</div>;

    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>

            <div className="mt-6 grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name on card</label>
                            <input
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                placeholder="Visa"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card number</label>
                            <input
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                inputMode="numeric"
                                pattern="[0-9\s]{12,19}"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                placeholder="4242 4242 4242 4242"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Expiry</label>
                                <input
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    placeholder="MM/YY"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CVC</label>
                                <input
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    inputMode="numeric"
                                    pattern="[0-9]{3,4}"
                                    placeholder="123"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-50"
                        >
                            {isProcessing ? 'Processing...' : `Pay ${priceLabel}`}
                        </button>

                        {isProcessing && (
                            <div className="mt-4">
                                <div className="h-2 w-full rounded bg-gray-200">
                                    <div className="h-2 rounded bg-sky-600 transition-all" style={{ width: `${progress}%` }} />
                                </div>
                                <p className="mt-2 text-center text-sm text-gray-600">Processing payment... {progress}%</p>
                            </div>
                        )}

                        {result && (
                            <div className={`mt-4 rounded-md px-4 py-3 ${result === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {result === 'success' ? 'Payment successful! You are enrolled.' : (error || 'Payment failed. Please try again.')}
                            </div>
                        )}

                        {result === 'success' && (
                            <button type="button" onClick={goToCourse} className="mt-4 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Continue to course
                            </button>
                        )}
                    </form>
                </div>

                <aside className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex items-center justify-between"><span>Course</span><span className="font-medium">{course?.title}</span></div>
                        <div className="flex items-center justify-between"><span>Category</span><span>{course?.category}</span></div>
                        <div className="flex items-center justify-between"><span>Price</span><span className="font-semibold">{priceLabel}</span></div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

