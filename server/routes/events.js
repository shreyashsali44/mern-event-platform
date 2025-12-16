const router = require("express").Router();
const Event = require("../models/Event");
const mongoose = require("mongoose");

// Create event
router.post("/create", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json("Event created");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// RSVP with capacity + concurrency handling
router.post("/rsvp/:id", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findById(req.params.id).session(session);

    if (!event) throw new Error("Event not found");

    if (event.attendees.includes(req.body.userId)) {
      throw new Error("Already RSVPed");
    }

    if (event.attendees.length >= event.capacity) {
      throw new Error("Event is full");
    }

    event.attendees.push(req.body.userId);
    await event.save();

    await session.commitTransaction();
    res.json("RSVP successful");
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json(err.message);
  } finally {
    session.endSession();
  }
});

module.exports = router;
