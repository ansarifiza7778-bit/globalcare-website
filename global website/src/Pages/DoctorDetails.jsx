import { useParams, Link } from "react-router-dom";
import { doctorsData } from "../Data/doctorsData";

function DoctorDetails() {
  // useParams: link se id nikalta hai. /doctors/2 ho to id = "2"
  const { id } = useParams();

  // find: list mein se wo doctor dhundho jiski id match kare
  const doctor = doctorsData.find((d) => d.id === Number(id));

  // Agar doctor nahi mila (galat link), to ye message dikhao
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

      <Link to={"/book/" + doctor.id} className="card-btn">
        Book Appointment
      </Link>
    </div>
  );
}

export default DoctorDetails;