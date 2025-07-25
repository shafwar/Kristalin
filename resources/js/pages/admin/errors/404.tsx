import React from 'react';
import { Link } from '@inertiajs/react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">Admin page not found</p>
                <Link
                    href="/admin/dashboard"
                    className="text-blue-600 hover:underline mt-4 inline-block text-lg"
                >
                    Return to Admin Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
