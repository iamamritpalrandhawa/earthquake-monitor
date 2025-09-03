import { useState, useEffect, useCallback } from "react";
import { EarthquakeResponse, EarthquakeFeature } from "../types/earthquake";

export const useEarthquakeData = () => {
  const [data, setData] = useState<EarthquakeFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEarthquakeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const earthquakeData: EarthquakeResponse = await response.json();
      setData(earthquakeData.features);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch earthquake data";
      setError(errorMessage);
      console.error("Error fetching earthquake data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakeData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchEarthquakeData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchEarthquakeData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchEarthquakeData,
  };
};
