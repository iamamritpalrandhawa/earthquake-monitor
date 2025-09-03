import { useState } from 'react';
import { EarthquakeMap } from './components/EarthquakeMap';
import { FilterControls } from './components/FilterControls';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import { magnitudeFilters } from './utils/earthquakeUtils';
import { MagnitudeFilter } from './types/earthquake';

function App() {
    const { data: earthquakes, loading, error, lastUpdated, refetch } = useEarthquakeData();
    const [selectedFilter, setSelectedFilter] = useState<MagnitudeFilter>(magnitudeFilters[0]);

    const filteredCount = earthquakes.filter(
        (eq) => eq.properties.mag >= selectedFilter.min && eq.properties.mag <= selectedFilter.max
    ).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="max-w-7xl mx-auto p-4">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="max-w-7xl mx-auto p-4">
                    <ErrorMessage message={error} onRetry={refetch} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <main className="max-w-[90rem] mx-auto p-4 space-y-4">
                {/* Controls and Stats */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <FilterControls
                        selectedFilter={selectedFilter}
                        onFilterChange={setSelectedFilter}
                        onRefresh={refetch}
                        isRefreshing={loading}
                        earthquakeCount={filteredCount}
                        lastUpdated={lastUpdated}
                    />
                    <StatsPanel earthquakes={earthquakes} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px] lg:h-[700px]">
                    {/* Map */}
                    <div className="lg:col-span-3 h-full">
                        <EarthquakeMap
                            earthquakes={earthquakes}
                            selectedFilter={selectedFilter}
                        />
                    </div>

                    {/* Legend */}
                    <div className="lg:col-span-1 flex lg:flex-col">
                        <div className="w-full">
                            <Legend />
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center text-xs text-gray-500 bg-white/50 rounded-lg p-3">
                    Data provided by the{' '}
                    <a
                        href="https://earthquake.usgs.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 underline"
                    >
                        United States Geological Survey (USGS)
                    </a>
                    {' '}• Updated every minute • Click markers for detailed information
                </div>
            </main>
        </div>
    );
}

export default App;