import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyBookings(props) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the bookings of the logged-in user from the backend
  useEffect(() => {
    fetch("http://localhost:5000/bookings/user/" + props.user.email)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setBookings([]);
        setLoading(false);
      });
  }, [props.user.email]);

  if (loading) {
    return <p style={{ padding: "30px 40px" }}>Loading...</p>;
  }

  return (
    <div className="details">
      <h1>My Bookings</h1>
      <p className="details-sub">All your appointments in one place.</p>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div className="details-box" key={booking._id}>
            <p><strong>Doctor:</strong> {booking.doctorName}</p>
            <p><strong>Specialty:</strong> {booking.specialty}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Fee:</strong> ${booking.fee}</p>
          </div>
        ))
      )}

      <Link to="/doctors" className="card-btn">Book another appointment</Link>
    </div>
  );
}

export default MyBookings;