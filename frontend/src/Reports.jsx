import React from "react";

const wasteData = [
  { type: "Wet Waste", quantity: 1.2, percent: 50, color: "#45d985" },
  { type: "Dry Waste", quantity: 0.9, percent: 37.5, color: "#f0b84b" },
  { type: "Mixed Waste", quantity: 0.3, percent: 12.5, color: "#6da9ff" },
];

const weeklyData = [
  { day: "Mon", value: 1.5 },
  { day: "Tue", value: 2.0 },
  { day: "Wed", value: 1.8 },
  { day: "Thu", value: 2.4 },
  { day: "Fri", value: 2.1 },
  { day: "Sat", value: 2.8 },
  { day: "Sun", value: 2.4 },
];

export default function Reports() {
  const totalWaste = wasteData.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const highestDay = weeklyData.reduce(
    (highest, item) => item.value > highest.value ? item : highest
  );

  return (
    <div className="reports-page">

      <section className="reports-intro">
        <div>
          <h2>Reports & Analytics 📊</h2>
          <p>Understand waste collection performance and trends.</p>
        </div>
        <span>DEMO REPORT</span>
      </section>

      <section className="reports-stats">
        <div className="report-card">
          <span>Total Waste Collected</span>
          <h2>{totalWaste.toFixed(1)} T</h2>
          <p>Sample daily collection</p>
        </div>

        <div className="report-card">
          <span>Wet Waste</span>
          <h2>1.2 T</h2>
          <p>50% of total waste</p>
        </div>

        <div className="report-card">
          <span>Dry Waste</span>
          <h2>0.9 T</h2>
          <p>37.5% of total waste</p>
        </div>

        <div className="report-card">
          <span>Mixed Waste</span>
          <h2>0.3 T</h2>
          <p>12.5% of total waste</p>
        </div>
      </section>

      <section className="reports-grid">

        <div className="panel">
          <h2>Waste Type Analysis</h2>
          <p>Distribution of collected waste</p>

          <div className="waste-analysis">
            {wasteData.map((item) => (
              <div className="analysis-item" key={item.type}>
                <div className="analysis-heading">
                  <span>{item.type}</span>
                  <strong>{item.quantity} T</strong>
                </div>

                <div className="analysis-bar">
                  <div
                    style={{
                      width: `${item.percent}%`,
                      background: item.color,
                    }}
                  />
                </div>

                <small>{item.percent}% of total collection</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Collection Summary</h2>
          <p>Daily waste collection overview</p>

          <div className="collection-number">
            {totalWaste.toFixed(1)} T
          </div>

          <p className="muted">Total collected waste</p>

          <div className="waste-item">
            <span>Wet Waste</span>
            <strong>1.2 T</strong>
          </div>

          <div className="waste-item">
            <span>Dry Waste</span>
            <strong>0.9 T</strong>
          </div>

          <div className="waste-item">
            <span>Mixed Waste</span>
            <strong>0.3 T</strong>
          </div>
        </div>

      </section>

      <section className="panel weekly-panel">
        <h2>Weekly Collection Performance</h2>
        <p>Sample waste collection by day (tonnes)</p>

        <div className="weekly-chart">
          {weeklyData.map((item) => (
            <div className="chart-column" key={item.day}>
              <strong>{item.value} T</strong>

              <div className="chart-bar-area">
                <div
                  className="chart-bar"
                  style={{ height: `${(item.value / 3) * 100}%` }}
                />
              </div>

              <span>{item.day}</span>
            </div>
          ))}
        </div>

        <div className="best-day">
          <strong>Highest collection day:</strong>
          <span>{highestDay.day} – {highestDay.value} tonnes</span>
        </div>
      </section>

    </div>
  );
}