import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  // This state stores the reviews of this doctor
  const [reviews, setReviews] = useState([]);

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

  // Get the reviews of this doctor from the backend
  useEffect(() => {
    fetch("http://localhost:5000/reviews/" + id)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch(() => {
        setReviews([]);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "30px 40px" }}>Loading...</p>;
  }

  if (!doctor) {
    return <p style={{ padding: "30px 40px" }}>Doctor not found.</p>;
  }

  return (
    <div className="details">
      <Link to="/doctors" className="back-link">← Back to doctors</Link>

      <h1>{doctor.name}</h1>
      <p className="details-sub">{doctor.specialty} · {doctor.country}</p>

      <div className="details-box">
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Consultation fee:</strong> ${doctor.fee}</p>
        <p><strong>About:</strong> {doctor.about}</p>
      </div>

      <Link to={"/book/" + doctor._id} className="card-btn">
        Book Appointment
      </Link>

      {/* Reviews section */}
      <h2 style={{ marginTop: "30px" }}>Patient Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="details-box" key={review._id}>
            {/* Old reviews may not have a name, so show Anonymous */}
            <p><strong>{review.patientName || "Anonymous"}</strong></p>

            {/* Show the rating only if this review has one */}
            {review.ratting && (
              <p>
                {"★".repeat(review.ratting)}
                {"☆".repeat(5 - review.ratting)}
              </p>
            )}

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDetails;