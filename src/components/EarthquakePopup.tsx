import React from 'react';
import { MapPin, Clock, Layers, ExternalLink } from 'lucide-react';
import { EarthquakeFeature } from '../types/earthquake';
import { formatDate, formatDistance, getMagnitudeColor } from '../utils/earthquakeUtils';

interface EarthquakePopupProps {
    earthquake: EarthquakeFeature;
}

export const EarthquakePopup: React.FC<EarthquakePopupProps> = ({ earthquake }) => {
    const { properties, geometry } = earthquake;
    const magnitudeColor = getMagnitudeColor(properties.mag);

    return (
        <div className="p-2 min-w-64 max-w-sm">
            <div className="flex items-start gap-3 mb-3">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: magnitudeColor }}
                >
                    {properties.mag.toFixed(1)}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {properties.place}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {properties.magType.toUpperCase()} magnitude
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(properties.time)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>
                        {geometry.coordinates[1].toFixed(3)}°N, {geometry.coordinates[0].toFixed(3)}°W
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Layers className="w-3 h-3" />
                    <span>{formatDistance(geometry.coordinates[2])}</span>
                </div>

                {properties.tsunami === 1 && (
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        🌊 Tsunami Warning
                    </div>
                )}

                {properties.felt && (
                    <div className="text-gray-600">
                        <span className="font-medium">{properties.felt}</span> people reported feeling it
                    </div>
                )}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-200">
                <a
                    href={properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                >
                    <ExternalLink className="w-3 h-3" />
                    View Details
                </a>
            </div>
        </div>
    );
};