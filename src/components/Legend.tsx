import React from 'react';
import { magnitudeFilters } from '../utils/earthquakeUtils';

export const Legend: React.FC = () => {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Magnitude Scale</h3>
            <div className="space-y-2">
                {magnitudeFilters.slice(1).map((filter) => (
                    <div key={filter.label} className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full border border-white"
                            style={{ backgroundColor: filter.color }}
                        />
                        <span className="text-xs text-gray-600">{filter.label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
                Circle size indicates magnitude strength
            </div>
        </div>
    );
};