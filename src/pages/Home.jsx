import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to LMS Platform</h1>
                <p>Learn, Teach, and Grow Together</p>
                
                {!isAuthenticated ? (
                    <div className="hero-buttons">
                        <Link to="/register" className="btn-primary">Get Started</Link>
                        <Link to="/login" className="btn-secondary">Login</Link>
                    </div>
                ) : (
                    <div className="hero-buttons">
                        {user?.role === 'Student' && (
                            <Link to="/student/dashboard" className="btn-primary">
                                Go to Dashboard
                            </Link>
                        )}
                        {user?.role === 'Instructor' && (
                            <Link to="/instructor/dashboard" className="btn-primary">
                                Go to Dashboard
                            </Link>
                        )}
                        {user?.role === 'Admin' && (
                            <Link to="/admin/dashboard" className="btn-primary">
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h3>📚 Learn</h3>
                    <p>Access quality courses from expert instructors</p>
                </div>
                <div className="feature-card">
                    <h3>🎓 Teach</h3>
                    <p>Share your knowledge and create courses</p>
                </div>
                <div className="feature-card">
                    <h3>📊 Track</h3>
                    <p>Monitor your progress and achievements</p>
                </div>
            </div>
        </div>
    );
}

export default Home;