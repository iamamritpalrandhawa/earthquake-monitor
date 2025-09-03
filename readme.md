# Earthquake Monitor

A real-time seismic activity visualization dashboard powered by USGS earthquake data.
Built with React, React Leaflet, Tailwind CSS, and Lucide Icons.

## Features

- **Interactive Map:** Displays recent earthquakes as scalable circle markers based on magnitude.
- **Magnitude Filters:** Quickly filter earthquakes by magnitude ranges.
- **Detailed Popups:** View precise location, depth, time, and magnitude details.
- **Statistics Panel:** Summarizes 24-hour seismic activity (max/avg magnitude, significant events, most recent quake).
- **Tsunami Warnings:** Visual alerts for tsunami-related seismic events.
- **Legend & Controls:** Intuitive controls for filtering and refreshing data.
- **Error Handling:** Graceful UI feedback when data fails to load.

## Project Structure

```
src/
├─ components/
│  ├─ EarthquakeMap.tsx       # Interactive map using React Leaflet
│  ├─ EarthquakePopup.tsx     # Popup with quake details
│  ├─ ErrorMessage.tsx        # Error display with retry option
│  ├─ FilterControls.tsx      # Magnitude filter buttons & refresh
│  ├─ Header.tsx              # Application header
│  ├─ Legend.tsx              # Magnitude color legend
│  ├─ StatsPanel.tsx          # Seismic summary statistics
│
├─ utils/
│  ├─ earthquakeUtils.ts      # Color, radius, formatting helpers
│
├─ types/
│  ├─ earthquake.ts           # Earthquake feature and filter types

```

## Installation

Clone this repository:

```bash
git clone https://github.com/your-username/earthquake-monitor.git
cd earthquake-monitor
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser at:

```bash
http://localhost:5173
```

## Tech Stack

- React 18+
- TypeScript
- React Leaflet (map rendering)
- Lucide React Icons (UI icons)
- Tailwind CSS (styling)

## Customization

- Adjust color scale or radius scaling in **earthquakeUtils.ts**.
- Add new filters in **magnitudeFilters** to match your needs.
- Modify popup details or map behavior directly in **EarthquakePopup.tsx** and **EarthquakeMap.tsx**.

## Data Source

This app uses the USGS Earthquake API for real-time seismic data:
https://earthquake.usgs.gov/
