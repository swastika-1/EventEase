const express = require("express");
const Event = require("../models/Event");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// GET ALL EVENTS
// ==========================================

router.get("/", async (req, res) => {
    try {
        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ date: 1 });

        res.status(200).json({
            events: events
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==========================================
// CREATE EVENT
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
    try {

        if (
            req.user.role !== "organizer" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Only organizers and admins can create events"
            });
        }

        const {
            title,
            description,
            category,
            venue,
            date,
            time,
            capacity,
            image
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !venue ||
            !date ||
            !time ||
            !capacity
        ) {
            return res.status(400).json({
                message: "All required event fields must be provided"
            });
        }

        const event = await Event.create({
            title,
            description,
            category,
            venue,
            date,
            time,
            capacity,
            seatsBooked: 0,
            organizer: req.user.id,
            image: image || ""
        });

        res.status(201).json({
            message: "Event created successfully",
            event: event
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
// ==========================================
// GET MY EVENTS - ORGANIZER DASHBOARD
// ==========================================

router.get("/organizer/my-events", authMiddleware, async (req, res) => {
    try {

        if (
            req.user.role !== "organizer" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Only organizers and admins can access this"
            });
        }

        const events = await Event.find({
            organizer: req.user.id
        })
            .populate("organizer", "name email")
            .sort({ date: 1 });

        const totalEvents = events.length;

        const totalBookings = events.reduce(
            (total, event) => total + event.seatsBooked,
            0
        );

        const totalCapacity = events.reduce(
            (total, event) => total + event.capacity,
            0
        );

        const availableSeats = totalCapacity - totalBookings;

        res.status(200).json({
            events: events,
            stats: {
                totalEvents: totalEvents,
                totalBookings: totalBookings,
                availableSeats: availableSeats
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==========================================
// GET EVENT BY ID
// ==========================================

router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("organizer", "name email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.set("Cache-Control", "no-store");

        res.status(200).json({
            event: event
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// ==========================================
// UPDATE EVENT
// ==========================================

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Only the organizer who created the event or admin can update
        if (
            req.user.role !== "admin" &&
            event.organizer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not allowed to update this event"
            });
        }

        const {
            title,
            description,
            category,
            venue,
            date,
            time,
            capacity,
            image
        } = req.body;

        // Update only provided fields
        if (title !== undefined) event.title = title;
        if (description !== undefined) event.description = description;
        if (category !== undefined) event.category = category;
        if (venue !== undefined) event.venue = venue;
        if (date !== undefined) event.date = date;
        if (time !== undefined) event.time = time;
        if (capacity !== undefined) event.capacity = capacity;
        if (image !== undefined) event.image = image;

        await event.save();

        res.status(200).json({
            message: "Event updated successfully",
            event: event
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// DELETE AN EVENT
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Only the event organizer or admin can delete it
        if (
            req.user.role !== "admin" &&
            event.organizer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this event"
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// GET EVENT ATTENDEES
router.get("/:id/bookings", authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Only the event organizer or admin can view attendees
        if (
            req.user.role !== "admin" &&
            event.organizer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not allowed to view attendees for this event"
            });
        }

        const bookings = await Booking.find({
            event: req.params.id
        })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            event: {
                id: event._id,
                title: event.title,
                capacity: event.capacity,
                seatsBooked: event.seatsBooked
            },
            attendees: bookings
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;