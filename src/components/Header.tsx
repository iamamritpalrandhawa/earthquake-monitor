import React from 'react';
import { Globe, Activity } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Globe className="w-8 h-8 text-orange-500" />
                        <Activity className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Earthquake Monitor</h1>
                        <p className="text-gray-300 text-sm">
                            Real-time seismic activity visualization powered by USGS
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};