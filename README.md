🌱 EcoRoute – Smart Waste Management System

1. Project Overview

EcoRoute is a smart waste management system that monitors dustbin fill levels and helps optimize waste collection routes. It reduces unnecessary trips, saves fuel, and keeps cities clean.

2. Project Structure

ecoroute/
│
├── backend/       # API and database management
├── frontend/      # User interface and dashboard
├── simulator/     # Simulated smart dustbin data
├── shared/        # Common data structures and utilities
│
└── README.md      # Project documentation

3. Reading Data Structure

Every dustbin reading contains:

- "binId" – Unique dustbin ID
- "name" – Dustbin name
- "lat" – Latitude
- "lng" – Longitude
- "fillLevel" – Dustbin fill percentage
- "wasteType" – Type of waste
- "timestamp" – Date and time of reading

4. API Endpoints

Method| Endpoint| Purpose
POST| "/api/readings"| Submit dustbin readings
GET| "/api/bins"| Get all dustbins
GET| "/api/route"| Get optimized collection route
POST| "/api/collections"| Record waste collection
GET| "/api/waste-summary"| Get waste summary

5. Live Updates

- Technology: WebSocket
- Event name: "binUpdate"
- Purpose: Send real-time dustbin fill-level updates.

6. Database

Database: MongoDB (to be confirmed by the team).

7. Team Responsibilities

- Backend: API development and database integration.
- Frontend: Dashboard and user interface.
- Simulator: Generate simulated dustbin readings.
- Shared: Common data structures and utilities.

8. Technologies Used

- Python
- Node.js
- JavaScript
- HTML and CSS
- Git and GitHub
- MongoDB (planned)

9. Project Goal

To develop an intelligent waste management system that improves waste collection efficiency through real-time monitoring and optimized routes.
