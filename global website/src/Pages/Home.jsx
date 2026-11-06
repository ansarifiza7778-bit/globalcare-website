import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorCard from "../Components/DoctorCard";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => setError(err.message));
  }, []);

  const featuredDoctors = doctors.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>Find the right doctor, from anywhere in the world</h1>
        <p>
          Connect with doctors from different countries from the comfort of
          your home.
        </p>
        <Link to="/doctors" className="hero-btn">
          Find a Doctor
        </Link>
      </section>

      <h2 className="section-title">Featured Doctors</h2>

      {error && <p style={{ padding: "0 40px" }}>Error: {error}</p>}

      <div className="list">
        {featuredDoctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default Home;