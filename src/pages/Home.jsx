import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <div>
            <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to LMS Platform</h1>
                        <p className="mt-5 text-lg leading-8 text-gray-600">Learn, Teach, and Grow Together</p>

                        {!isAuthenticated ? (
                            <div className="mt-8 flex items-center justify-center gap-4">
                                <Link to="/register" className="rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Get Started</Link>
                                <Link to="/login" className="rounded-md px-6 py-3 text-sm font-semibold text-sky-600 ring-1 ring-inset ring-sky-200 hover:bg-sky-50">Login</Link>
                            </div>
                        ) : (
                            <div className="mt-8 flex items-center justify-center gap-4">
                                {user?.role === 'Student' && (
                                    <Link to="/student/dashboard" className="rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Go to Dashboard</Link>
                                )}
                                {user?.role === 'Instructor' && (
                                    <Link to="/instructor/dashboard" className="rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Go to Dashboard</Link>
                                )}
                                {user?.role === 'Admin' && (
                                    <Link to="/admin/dashboard" className="rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Go to Dashboard</Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold"> Learn</h3>
                        <p className="mt-2 text-gray-600">Access quality courses from expert instructors</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold"> Teach</h3>
                        <p className="mt-2 text-gray-600">Share your knowledge and create courses</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold"> Track</h3>
                        <p className="mt-2 text-gray-600">Monitor your progress and achievements</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;