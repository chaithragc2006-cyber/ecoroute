import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample bin locations around Tumakuru
const bins = [
  { id: "BIN001", area: "Main Road", position: [13.3409, 77.1010], fill: 92 },
  { id: "BIN002", area: "Bus Stand", position: [13.3375, 77.1170], fill: 65 },
  { id: "BIN003", area: "City Park", position: [13.3450, 77.1050], fill: 38 },
  { id: "BIN004", area: "Market Area", position: [13.3420, 77.1120], fill: 85 },
  { id: "BIN005", area: "College Road", position: [13.3300, 77.1100], fill: 25 },
  { id: "BIN006", area: "Railway Road", position: [13.3350, 77.0950], fill: 74 },
];

function getColor(fill) {
  if (fill >= 85) return "#ef6565";
  if (fill >= 60) return "#f0b84b";
  return "#45d985";
}

function createIcon(fill) {
  return L.divIcon({
    className: "custom-bin-marker",
    html: `<div style="
      background:${getColor(fill)};
      width:18px;
      height:18px;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 10px #000;
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function CollectionMap() {
  return (
    <div className="panel map-panel">
      <h2>Collection Map</h2>
      <p>View waste bin locations and their current fill levels.</p>

      <div className="map-legend">
        <span>🟢 Normal</span>
        <span>🟡 Nearly Full</span>
        <span>🔴 Overflow Risk</span>
      </div>

      <MapContainer
        center={[13.3409, 77.1010]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "450px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bins.map((bin) => (
          <Marker
            key={bin.id}
            position={bin.position}
            icon={createIcon(bin.fill)}
          >
            <Popup>
              <strong>{bin.id}</strong>
              <br />
              Location: {bin.area}
              <br />
              Fill Level: {bin.fill}%
              <br />
              Status: {bin.fill >= 85 ? "Overflow Risk" : bin.fill >= 60 ? "Nearly Full" : "Normal"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}