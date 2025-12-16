import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  // Fetch all events
  const fetchEvents = async () => {
    const res = await fetch("http://localhost:5000/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create event
  const createEvent = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date,
        location,
        capacity,
      }),
    });

    alert("Event created");

    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setCapacity("");

    fetchEvents();
  };

  return (
    <div className="container">
      <h1>MERN Event Platform</h1>

      <h2>Create Event</h2>

      <form onSubmit={createEvent}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <button type="submit">Create Event</button>
      </form>

      <h2>All Events</h2>

      {events.length === 0 ? (
        <p className="no-events">No events available</p>
      ) : (
        events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleString()}
            </p>
            <p>
              <strong>Capacity:</strong> {event.capacity}
            </p>
            <p>
              <strong>Attendees:</strong> {event.attendees.length}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
