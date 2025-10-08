import React from 'react';
import '../styles/Dashboard.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}

export default LoadingSpinner;