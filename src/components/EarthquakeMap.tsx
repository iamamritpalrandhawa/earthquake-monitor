import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { EarthquakeFeature, MagnitudeFilter } from '../types/earthquake';
import { getMagnitudeColor, getMagnitudeRadius } from '../utils/earthquakeUtils';
import { EarthquakePopup } from './EarthquakePopup';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import L from 'leaflet';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface EarthquakeMapProps {
    earthquakes: EarthquakeFeature[];
    selectedFilter: MagnitudeFilter;
}

export const EarthquakeMap: React.FC<EarthquakeMapProps> = ({
    earthquakes,
    selectedFilter,
}) => {
    const filteredEarthquakes = useMemo(() => {
        return earthquakes.filter(
            (earthquake) =>
                earthquake.properties.mag >= selectedFilter.min &&
                earthquake.properties.mag <= selectedFilter.max
        );
    }, [earthquakes, selectedFilter]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {filteredEarthquakes.map((earthquake) => {
                    const [longitude, latitude] = earthquake.geometry.coordinates;
                    const magnitude = earthquake.properties.mag;

                    return (
                        <CircleMarker
                            key={earthquake.id}
                            center={[latitude, longitude]}
                            radius={getMagnitudeRadius(magnitude)}
                            fillColor={getMagnitudeColor(magnitude)}
                            color="white"
                            weight={1}
                            opacity={0.9}
                            fillOpacity={0.7}
                        >
                            <Popup
                                maxWidth={300}
                                minWidth={250}
                            >
                                <EarthquakePopup earthquake={earthquake} />
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};