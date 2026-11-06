import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Review() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [patientName, setPatientName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

    // The backend saves "rating" as "ratting" and uses "patientName" for the name
    const reviewData = {
      doctorId: doctor._id,
      patientName: patientName,
      rating: rating,
      comment: comment,
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Review failed");
        }
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch(() => {
        setError("Could not save your review. Please try again.");
      });
  }

  if (submitted) {
    return (
      <div className="details">
        <h1>Thank you!</h1>
        <p className="details-sub">Your review for {doctor.name} has been submitted.</p>
        <p>Rating: {rating} / 5</p>
        <Link to="/" className="card-btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details">
      <h1>Rate your visit</h1>
      <p className="details-sub">{doctor.name} · {doctor.specialty}</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Your name</label>
        <input
          type="text"
          required
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <label>Your rating</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={star <= rating ? "star-btn on" : "star-btn"}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        <label>Your review</label>
        <textarea
          rows="4"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="form-btn" disabled={rating === 0}>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;