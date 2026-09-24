const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN ACCESS CHECK
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    next();
};


// GET ADMIN DASHBOARD DATA
router.get("/dashboard", authMiddleware, adminOnly, async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ date: 1 });

        const totalUsers = users.length;

        const totalOrganizers = users.filter(
            user => user.role === "organizer"
        ).length;

        const totalEvents = events.length;

        const totalBookings = events.reduce(
            (total, event) => total + (event.seatsBooked || 0),
            0
        );

        res.status(200).json({
            stats: {
                totalUsers: totalUsers,
                totalOrganizers: totalOrganizers,
                totalEvents: totalEvents,
                totalBookings: totalBookings
            },
            users: users,
            events: events
        });

    } catch (error) {

        console.error("ADMIN DASHBOARD ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;