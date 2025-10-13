import React from 'react';

function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
            <p className="mt-3 text-sm text-gray-600">Loading...</p>
        </div>
    );
}

export default LoadingSpinner;