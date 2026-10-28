import { useLocation, Link } from "react-router-dom";

function Confirmation() {
  // useLocation: BookAppointment page ne jo data bheja tha, wo yahan milta hai
  const location = useLocation();
  const booking = location.state;

  // Agar koi seedha /confirmation link kholta hai, to data nahi hoga
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

      {/* doctorId se pata chalta hai ki kis doctor ka review page kholna hai */}
      <Link to={"/review/" + booking.doctorId} className="card-btn" style={{ marginRight: 12 }}>
        Rate this doctor
      </Link>
      <Link to="/" className="card-btn">Back to Home</Link>
    </div>
  );
}

export default Confirmation;