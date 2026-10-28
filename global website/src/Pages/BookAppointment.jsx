import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctorsData } from "../Data/doctorsData";

function BookAppointment() {
  const { id } = useParams();
  // useNavigate: code se dusre page par bhejne ke liye
  const navigate = useNavigate();

  const doctor = doctorsData.find((d) => d.id === Number(id));

  // Form ke har box ke liye ek useState
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!doctor) {
    return <p style={{ padding: "30px 40px" }}>Doctor not found.</p>;
  }

  function handleSubmit(e) {
    // preventDefault: form submit par page reload hone se rokta hai
    e.preventDefault();

    // Confirmation page par data bhejo
    navigate("/confirmation", {
      state: {
        patientName: patientName,
        date: date,
        time: time,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        fee: doctor.fee,
        doctorId: doctor.id,
      },
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

        <button type="submit" className="form-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;

