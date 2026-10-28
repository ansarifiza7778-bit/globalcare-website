import { Link } from "react-router-dom";
import DoctorCard from "../Components/DoctorCard";
import { doctorsData } from "../Data/doctorsData";

function Home() {
  // slice(0, 3): list ke sirf pehle 3 doctors lo
  const featuredDoctors = doctorsData.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>Find the right doctor, from anywhere in the world</h1>
        <p>
          Connect with doctors from different countries from the comfort of
          your home.
        </p>
        {/* Link: click karne par Doctors page khulta hai */}
        <Link to="/doctors" className="hero-btn">
          Find a Doctor
        </Link>
      </section>

      <h2 className="section-title">Featured Doctors</h2>

      <div className="list">
        {featuredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default Home;