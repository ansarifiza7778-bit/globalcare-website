import { useState } from "react";
import DoctorCard from "../Components/DoctorCard";
import { doctorsData } from "../Data/doctorsData";

function Doctors() {
  // useState: ye data yaad rakhta hai. Badalne par page apne aap update hota hai.
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");

  // Search aur specialty dono se match hone wale doctors hi rakho
  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.country.toLowerCase().includes(search.toLowerCase());

    const matchSpecialty = specialty === "All" || doctor.specialty === specialty;

    return matchSearch && matchSpecialty;
  });

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by doctor name or country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="All">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
        </select>
      </div>

      <div className="list">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <p style={{ padding: "0 40px" }}>No doctors found.</p>
      )}
    </div>
  );
}

export default Doctors;