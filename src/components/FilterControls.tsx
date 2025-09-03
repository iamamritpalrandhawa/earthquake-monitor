import React from 'react';
import { RefreshCw } from 'lucide-react';
import { MagnitudeFilter } from '../types/earthquake';
import { magnitudeFilters } from '../utils/earthquakeUtils';

interface FilterControlsProps {
    selectedFilter: MagnitudeFilter;
    onFilterChange: (filter: MagnitudeFilter) => void;
    onRefresh: () => void;
    isRefreshing: boolean;
    earthquakeCount: number;
    lastUpdated: Date | null;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    selectedFilter,
    onFilterChange,
    onRefresh,
    isRefreshing,
    earthquakeCount,
    lastUpdated,
}) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Magnitude</h3>
                    <div className="flex flex-wrap gap-2">
                        {magnitudeFilters.map((filter) => (
                            <button
                                key={filter.label}
                                onClick={() => onFilterChange(filter)}
                                className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${selectedFilter.label === filter.label
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{earthquakeCount}</div>
                        <div className="text-xs text-gray-500">earthquakes</div>
                    </div>

                    <button
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {lastUpdated && (
                <div className="mt-3 text-xs text-gray-500 border-t border-gray-200 pt-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};