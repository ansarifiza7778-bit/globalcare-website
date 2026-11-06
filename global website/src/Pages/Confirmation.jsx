import { useLocation, Link } from "react-router-dom";

function Confirmation() {
  // useLocation: gets the data that the BookAppointment page sent
  const location = useLocation();
  const booking = location.state;

  // If someone opens the /confirmation link directly, there will be no data
  if (!booking) {
    return (
      <div className="details">
        <p>No booking found.</p>
        <Link to="/doctors" className="card-btn">Find a Doctor</Link>
      </div>
    );
  }

  return (
    <div className="details">
      <h1>Appointment Confirmed</h1>
      <p className="details-sub">Thank you, {booking.patientName}. Your appointment is booked.</p>

      <div className="details-box">
        <p><strong>Doctor:</strong> {booking.doctorName}</p>
        <p><strong>Specialty:</strong> {booking.specialty}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Fee:</strong> ${booking.fee}</p>
      </div>

      {/* doctorId tells us which doctor's review page to open */}
      <Link to={"/review/" + booking.doctorId} className="card-btn" style={{ marginRight: 12 }}>
        Rate this doctor
      </Link>
      <Link to="/" className="card-btn">Back to Home</Link>
    </div>
  );
}

export default Confirmation;