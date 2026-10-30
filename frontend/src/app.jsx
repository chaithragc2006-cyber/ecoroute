import React, { useState } from "react";
import "./app.css";
import "leaflet/dist/leaflet.css";
import CollectionMap from "./CollectionMap";
import CollectionTracking from "./CollectionTracking";
import Reports from "./Reports";

const initialBins = [
  { id: "BIN001", area: "Main Road", type: "Wet Waste", fill: 92 },
  { id: "BIN002", area: "Bus Stand", type: "Dry Waste", fill: 65 },
  { id: "BIN003", area: "City Park", type: "Mixed Waste", fill: 38 },
  { id: "BIN004", area: "Market Area", type: "Wet Waste", fill: 85 },
  { id: "BIN005", area: "College Road", type: "Dry Waste", fill: 25 },
  { id: "BIN006", area: "Railway Road", type: "Mixed Waste", fill: 74 },
];

const menu = [
  { name: "Dashboard", icon: "▦" },
  { name: "Bin Monitoring", icon: "▣" },
  { name: "Collection Map", icon: "⌖" },
  { name: "Alerts", icon: "♧" },
  { name: "Collection Tracking", icon: "▤" },
  { name: "Reports", icon: "▥" },
];

function getStatus(fill) {
  if (fill >= 85) return "Overflow Risk";
  if (fill >= 60) return "Nearly Full";
  return "Normal";
}

function App() {
  const [page, setPage] = useState("Dashboard");
  const [bins] = useState(initialBins);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedBin, setSelectedBin] = useState(null);

  const filteredBins = bins.filter((bin) => {
    const matchesSearch =
      bin.id.toLowerCase().includes(search.toLowerCase()) ||
      bin.area.toLowerCase().includes(search.toLowerCase());

    const status = getStatus(bin.fill);
    const matchesFilter =
      filter === "All" ||
      (filter === "Normal" && status === "Normal") ||
      (filter === "Nearly Full" && status === "Nearly Full") ||
      (filter === "Overflow Risk" && status === "Overflow Risk");

    return matchesSearch && matchesFilter;
  });

  const priorityBins = bins.filter((bin) => bin.fill >= 85);
  const nearlyFull = bins.filter((bin) => bin.fill >= 60).length;

  function BinList() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Waste Bin Monitoring</h2>
            <p>Monitor bin capacity and collection status</p>
          </div>
          <span className="live">● Monitoring</span>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search bin ID or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Normal</option>
            <option>Nearly Full</option>
            <option>Overflow Risk</option>
          </select>
        </div>

        <div className="bin-list">
          {filteredBins.map((bin) => {
            const status = getStatus(bin.fill);
            const color =
              bin.fill >= 85 ? "red" : bin.fill >= 60 ? "yellow" : "green";

            return (
              <div className="bin-row" key={bin.id}>
                <div className="bin-info">
                  <div>
                    <strong>{bin.id}</strong>
                    <p>{bin.area} · {bin.type}</p>
                  </div>
                  <strong>{bin.fill}%</strong>
                </div>
                <div className="progress">
                  <div
                    className={`progress-fill ${
                      bin.fill >= 85 ? "danger" : bin.fill >= 60 ? "warning" : ""
                    }`}
                    style={{ width: `${bin.fill}%` }}
                  />
                </div>
                <div className="bin-actions">
                  <span className={`status ${color}`}>{status}</span>
                  <button onClick={() => setSelectedBin(bin)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}

          {filteredBins.length === 0 && (
            <p className="empty-message">No matching bins found.</p>
          )}
        </div>
      </div>
    );
  }

  function Dashboard() {
    return (
      <>
        <section className="welcome">
          <div>
            <h2>Welcome to EcoRoute 🌱</h2>
            <p>Cleaner cities through smart waste collection.</p>
          </div>
          <span>LIVE MONITORING</span>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Bins</span>
            <h2>{bins.length}</h2>
            <p>Registered demonstration bins</p>
          </div>
          <div className="stat-card">
            <span>Nearly Full</span>
            <h2>{nearlyFull}</h2>
            <p>Require collection attention</p>
          </div>
          <div className="stat-card">
            <span>Overflow Risk</span>
            <h2>{priorityBins.length}</h2>
            <p>Priority collection bins</p>
          </div>
          <div className="stat-card">
            <span>Collected Today</span>
            <h2>2.4 T</h2>
            <p>Sample collection data</p>
          </div>
        </section>

        <section className="content-grid">
          <BinList />

          <div className="panel">
            <h2>Collection Overview</h2>
            <p>Today's sample collection summary</p>
            <div className="collection-number">2.4 T</div>
            <p className="muted">Total waste collected today</p>
            <div className="waste-item">
              <span>Wet Waste</span><strong>1.2 T</strong>
            </div>
            <div className="waste-item">
              <span>Dry Waste</span><strong>0.9 T</strong>
            </div>
            <div className="waste-item">
              <span>Mixed Waste</span><strong>0.3 T</strong>
            </div>
            <div className="route-box">
              <strong>🚛 Collection Priority</strong>
              <p>{priorityBins.length} bins need priority collection.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  function Alerts() {
    return (
      <div className="panel">
        <h2>Waste Collection Alerts</h2>
        <p>Bins requiring attention</p>
        {bins.filter((bin) => bin.fill >= 60).map((bin) => (
          <div className="alert-item" key={bin.id}>
            <span>{bin.fill >= 85 ? "🔴" : "🟠"}</span>
            <div>
              <strong>{bin.id} - {bin.area}</strong>
              <p>{bin.fill}% full · {getStatus(bin.fill)}</p>
            </div>
          </div>
        ))}
        {nearlyFull === 0 && <p>No alerts currently.</p>}
      </div>
    );
  }

  function OtherPage() {
    const descriptions = {
      "Collection Map": "Bin locations will be displayed on an interactive city map.",
      "Collection Tracking": "Track assigned vehicles and completed waste collections.",
      "Reports": "View wet, dry and mixed waste collection summaries.",
    };

    return (
      <div className="panel feature-panel">
        <h2>{page}</h2>
        <p>{descriptions[page]}</p>
        <div className="route-box">
          <strong>Module setup</strong>
          <p>This section is prepared for the next development stage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>♻ EcoRoute</h2>
        <p className="side-label">MAIN MENU</p>

        {menu.map((item) => (
          <a
            key={item.name}
            className={page === item.name ? "active" : ""}
            onClick={() => {
              setPage(item.name);
              setSearch("");
              setFilter("All");
            }}
          >
            {item.icon} &nbsp; {item.name}
          </a>
        ))}

        <div className="sidebar-bottom">Smart Waste Management</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{page}</h1>
            <p>EcoRoute Smart Waste Management System</p>
          </div>
          <span className="admin">● Admin</span>
        </header>

       {page === "Dashboard" && <Dashboard />}

{page === "Bin Monitoring" && <BinList />}

{page === "Collection Map" && <CollectionMap />}

{page === "Alerts" && <Alerts />}

{page === "Collection Tracking" && <CollectionTracking />}

{page === "Reports" && <Reports />}

        <footer>© 2026 EcoRoute | Smart Waste Management System</footer>
      </main>

      {selectedBin && (
        <div className="modal-backdrop" onClick={() => setSelectedBin(null)}>
          <div className="bin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedBin(null)}>
              ×
            </button>
            <h2>{selectedBin.id}</h2>
            <p>{selectedBin.area}</p>
            <div className="collection-number">{selectedBin.fill}%</div>
            <p>Current sample bin fill level</p>
            <div className="waste-item">
              <span>Waste type</span><strong>{selectedBin.type}</strong>
            </div>
            <div className="waste-item">
              <span>Status</span><strong>{getStatus(selectedBin.fill)}</strong>
            </div>
            <button className="close-action" onClick={() => setSelectedBin(null)}>
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;