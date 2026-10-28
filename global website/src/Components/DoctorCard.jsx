import { Link } from "react-router-dom";

// Props: parent (page) se data yahan aata hai.
// props.doctor = ek doctor ka data
function DoctorCard(props) {
  return (
    <div className="card">
      <h3>{props.doctor.name}</h3>
      <p>{props.doctor.specialty} · {props.doctor.country}</p>
      <p>{props.doctor.experience} years experience</p>
      <p>Fee: ${props.doctor.fee}</p>

      {/* Click karne par us doctor ka profile page khulega */}
      <Link to={"/doctors/" + props.doctor.id} className="card-btn">
        View Profile
      </Link>
    </div>
  );
}

export default DoctorCard;