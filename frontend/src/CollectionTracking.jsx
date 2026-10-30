import React, { useState } from "react";

const initialCollections = [
  {
    id: "TRK001",
    vehicle: "KA-06-AB-1234",
    driver: "Driver 01",
    area: "Main Road",
    waste: "Wet Waste",
    quantity: 0.8,
    status: "In Progress",
  },
  {
    id: "TRK002",
    vehicle: "KA-06-CD-5678",
    driver: "Driver 02",
    area: "Bus Stand",
    waste: "Dry Waste",
    quantity: 0.5,
    status: "Pending",
  },
  {
    id: "TRK003",
    vehicle: "KA-06-EF-9012",
    driver: "Driver 03",
    area: "Market Area",
    waste: "Mixed Waste",
    quantity: 1.1,
    status: "Completed",
  },
];

export default function CollectionTracking() {
  const [collections, setCollections] = useState(initialCollections);

  const completed = collections.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = collections.filter(
    (item) => item.status === "In Progress"
  ).length;

  const pending = collections.filter(
    (item) => item.status === "Pending"
  ).length;

  const totalWaste = collections
    .filter((item) => item.status === "Completed")
    .reduce((total, item) => total + item.quantity, 0);

  function updateStatus(id) {
    setCollections((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Pending"
                  ? "In Progress"
                  : item.status === "In Progress"
                  ? "Completed"
                  : "Completed",
            }
          : item
      )
    );
  }

  return (
    <div className="tracking-page">
      <section className="tracking-intro">
        <div>
          <h2>Collection Tracking 🚛</h2>
          <p>Monitor waste collection vehicles and daily progress.</p>
        </div>
        <span>DAILY OPERATIONS</span>
      </section>

      <section className="tracking-stats">
        <div className="tracking-card">
          <span>Total Vehicles</span>
          <h2>{collections.length}</h2>
        </div>

        <div className="tracking-card">
          <span>Completed</span>
          <h2>{completed}</h2>
        </div>

        <div className="tracking-card">
          <span>In Progress</span>
          <h2>{inProgress}</h2>
        </div>

        <div className="tracking-card">
          <span>Pending</span>
          <h2>{pending}</h2>
        </div>
      </section>

      <section className="panel tracking-panel">
        <div className="panel-heading">
          <div>
            <h2>Vehicle Collection Details</h2>
            <p>Assigned vehicles and collection status</p>
          </div>
          <span className="live">● Tracking</span>
        </div>

        <div className="tracking-list">
          {collections.map((item) => (
            <div className="tracking-item" key={item.id}>
              <div className="tracking-item-top">
                <div>
                  <h3>{item.id}</h3>
                  <p>{item.vehicle}</p>
                </div>

                <span className={`tracking-status ${
                  item.status === "Completed"
                    ? "completed"
                    : item.status === "In Progress"
                    ? "progressing"
                    : "pending"
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="tracking-details">
                <p><strong>Driver:</strong> {item.driver}</p>
                <p><strong>Area:</strong> {item.area}</p>
                <p><strong>Waste:</strong> {item.waste}</p>
                <p><strong>Quantity:</strong> {item.quantity} tonnes</p>
              </div>

              <button
                className="tracking-button"
                onClick={() => updateStatus(item.id)}
                disabled={item.status === "Completed"}
              >
                {item.status === "Pending"
                  ? "Start Collection"
                  : item.status === "In Progress"
                  ? "Mark Completed"
                  : "Collection Completed"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="panel tracking-summary">
        <h2>Today's Collection Summary</h2>
        <div className="collection-number">
          {totalWaste.toFixed(1)} T
        </div>
        <p className="muted">Waste collected from completed trips</p>

        <div className="tracking-progress">
          <div
            className="tracking-progress-fill"
            style={{
              width: `${(completed / collections.length) * 100}%`,
            }}
          />
        </div>

        <p className="tracking-summary-text">
          {completed} of {collections.length} vehicle collections completed.
        </p>
      </section>
    </div>
  );
}