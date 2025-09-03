import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-center text-gray-600 font-medium">
                    Loading earthquake data...
                </div>
            </div>
        </div>
    );
};