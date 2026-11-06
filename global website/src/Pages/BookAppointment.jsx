import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookAppointment(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/doctors/" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(() => {
        setDoctor(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "30px 40px" }}>Loading...</p>;
  }

  if (!doctor) {
    return <p style={{ padding: "30px 40px" }}>Doctor not found.</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const bookingData = {
      patientName: patientName,
      date: date,
      time: time,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      doctorId: doctor._id,
      // Email of the logged-in user, so we can show only their bookings later
      userEmail: props.user.email,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Booking failed");
        }
        return res.json();
      })
      .then(() => {
        navigate("/confirmation", { state: bookingData });
      })
      .catch(() => {
        setError("Could not save your booking. Please try again.");
      });
  }

  return (
    <div className="details">
      <h1>Book Appointment</h1>
      <p className="details-sub">
        with {doctor.name} · {doctor.specialty}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Your name</label>
        <input
          type="text"
          required
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <label>Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time</label>
        <select required value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select a time</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="05:30 PM">05:30 PM</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="form-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;