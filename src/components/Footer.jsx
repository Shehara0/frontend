import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-10 border-t border-gray-200 bg-white/80 backdrop-blur-lg shadow-inner">
            <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
                <p>© 2025 E-Learnning Platform. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4">
                    <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
                    <a href="#" className="hover:text-indigo-600 transition">Contact</a>
                </div>
            </div>
        </footer>
    );
}
