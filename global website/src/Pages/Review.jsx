import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doctorsData } from "../Data/doctorsData";

function Review() {
  const { id } = useParams();
  const doctor = doctorsData.find((d) => d.id === Number(id));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // submitted: review bhejne ke baad true ho jata hai
  const [submitted, setSubmitted] = useState(false);

  if (!doctor) {
    return <p style={{ padding: "30px 40px" }}>Doctor not found.</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Abhi review sirf screen par dikhega. Save karna backend ke baad judega.
    setSubmitted(true);
  }

  // Review bhejne ke baad thank you message dikhao
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
        <label>Your rating</label>
        <div className="stars">
          {/* 1 se 5 tak har number ke liye ek star button */}
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

        {/* rating 0 hai to button band rahega */}
        <button type="submit" className="form-btn" disabled={rating === 0}>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;