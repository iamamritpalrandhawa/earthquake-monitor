import { MagnitudeFilter } from "../types/earthquake";

export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return "#dc2626"; // red-600
  if (magnitude >= 6) return "#ea580c"; // orange-600
  if (magnitude >= 5) return "#d97706"; // amber-600
  if (magnitude >= 4) return "#eab308"; // yellow-500
  if (magnitude >= 3) return "#65a30d"; // lime-600
  if (magnitude >= 2) return "#16a34a"; // green-600
  return "#059669"; // emerald-600
};

export const getMagnitudeRadius = (magnitude: number): number => {
  return Math.max(4, magnitude * 3);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const formatDistance = (depth: number): string => {
  return `${depth.toFixed(1)} km deep`;
};

export const magnitudeFilters: MagnitudeFilter[] = [
  { min: 0, max: 10, label: "All Earthquakes", color: "#6b7280" },
  { min: 2, max: 10, label: "2.0+ Magnitude", color: "#16a34a" },
  { min: 3, max: 10, label: "3.0+ Magnitude", color: "#65a30d" },
  { min: 4, max: 10, label: "4.0+ Magnitude", color: "#eab308" },
  { min: 5, max: 10, label: "5.0+ Magnitude", color: "#d97706" },
  { min: 6, max: 10, label: "6.0+ Magnitude", color: "#ea580c" },
  { min: 7, max: 10, label: "7.0+ Major", color: "#dc2626" },
];
