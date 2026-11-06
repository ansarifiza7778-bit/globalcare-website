import { Link } from "react-router-dom";

// Props: data comes here from the parent (page).
// props.doctor = data of one doctor
function DoctorCard(props) {
  return (
    <div className="card">
      <h3>{props.doctor.name}</h3>
      <p>{props.doctor.specialty} · {props.doctor.country}</p>
      <p>{props.doctor.experience} years experience</p>
      <p>Fee: ${props.doctor.fee}</p>

      {/* Clicking this opens the profile page of that doctor */}
      <Link to={"/doctors/" + props.doctor._id} className="card-btn">
        View Profile
      </Link>
    </div>
  );
}

export default DoctorCard;