require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const readingRoutes = require("./routes/readingRoutes");
const binRoutes = require("./routes/binRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const routeRoutes = require("./routes/routeRoutes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.set("io", io);

// API routes
app.use("/api/readings", readingRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/waste-summary", summaryRoutes);
app.use("/api/route", routeRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("EcoRoute Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`EcoRoute server running on port ${PORT}`);
    });
});