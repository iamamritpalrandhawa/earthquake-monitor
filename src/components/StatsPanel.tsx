import React from 'react';
import { Activity, TrendingUp, MapPin, Clock } from 'lucide-react';
import { EarthquakeFeature } from '../types/earthquake';

interface StatsPanelProps {
    earthquakes: EarthquakeFeature[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ earthquakes }) => {
    const stats = React.useMemo(() => {
        if (earthquakes.length === 0) {
            return {
                total: 0,
                maxMagnitude: 0,
                avgMagnitude: 0,
                significantCount: 0,
                mostRecent: null,
            };
        }

        const magnitudes = earthquakes.map((eq) => eq.properties.mag);
        const maxMagnitude = Math.max(...magnitudes);
        const avgMagnitude = magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length;
        const significantCount = earthquakes.filter((eq) => eq.properties.mag >= 4.5).length;

        const mostRecent = earthquakes.reduce((recent, current) =>
            current.properties.time > recent.properties.time ? current : recent
        );

        return {
            total: earthquakes.length,
            maxMagnitude,
            avgMagnitude,
            significantCount,
            mostRecent,
        };
    }, [earthquakes]);

    const statItems = [
        {
            label: 'Total Earthquakes',
            value: stats.total.toLocaleString(),
            icon: Activity,
            color: 'text-blue-600',
        },
        {
            label: 'Largest Magnitude',
            value: stats.maxMagnitude.toFixed(1),
            icon: TrendingUp,
            color: 'text-red-600',
        },
        {
            label: 'Average Magnitude',
            value: stats.avgMagnitude.toFixed(1),
            icon: MapPin,
            color: 'text-green-600',
        },
        {
            label: 'Significant (4.5+)',
            value: stats.significantCount.toString(),
            icon: Clock,
            color: 'text-orange-600',
        },
    ];

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">24-Hour Summary</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {statItems.map((item) => (
                    <div key={item.label} className="text-center">
                        <div className="flex justify-center mb-2">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{item.value}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                ))}
            </div>

            {stats.mostRecent && (
                <div className="border-t border-gray-200 pt-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Most Recent</h4>
                    <div className="text-sm text-gray-600">
                        <div className="font-medium">M{stats.mostRecent.properties.mag.toFixed(1)} - {stats.mostRecent.properties.place}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(stats.mostRecent.properties.time).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};