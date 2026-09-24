require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("EventEase API is running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(
                `EventEase server running on http://localhost:${PORT}`
            );
        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error
        );

    });