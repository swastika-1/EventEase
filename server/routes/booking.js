const express = require("express");
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// BOOK AN EVENT
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingBooking = await Booking.findOne({
            user: req.user.id,
            event: eventId,
            status: "confirmed"
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "You have already booked this event"
            });
        }

        if (event.seatsBooked >= event.capacity) {
            return res.status(400).json({
                message: "Event is fully booked"
            });
        }

        const booking = await Booking.create({
            user: req.user.id,
            event: eventId
        });

        event.seatsBooked += 1;
        await event.save();

        res.status(201).json({
            message: "Event booked successfully",
            booking: booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// GET MY BOOKINGS
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id
        })
            .populate("event")
            .sort({ createdAt: -1 });

        res.set("Cache-Control", "no-store");

        res.status(200).json({
            bookings: bookings
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// CANCEL A BOOKING
router.put("/:id/cancel", authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Make sure the booking belongs to the logged-in user
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to cancel this booking"
            });
        }

        // Prevent cancelling an already cancelled booking
        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        const event = await Event.findById(booking.event);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Cancel the booking
        booking.status = "cancelled";
        await booking.save();

        // Free the seat
        if (event.seatsBooked > 0) {
            event.seatsBooked -= 1;
            await event.save();
        }

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking: booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;