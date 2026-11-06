import { useState, useEffect } from "react";
import DoctorCard from "../Components/DoctorCard";

// Make text lowercase, turn dots into spaces and remove extra spaces,
// so "Dr. Ananya", "dr.ananya" and "dr ananya" all match
function clean(text) {
  return (text || "")
    .toLowerCase()
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  // This state stores the error message (empty means no error)
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => setDoctors(data))
      .catch((err) => {
        console.log("Error:", err);
        setError("Could not load doctors.");
      });
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const text = clean(search);

    // Search by doctor name, country or specialty (small or capital letters both work)
    const matchSearch =
      clean(doctor.name).includes(text) ||
      clean(doctor.country).includes(text) ||
      clean(doctor.specialty).includes(text);

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
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>

      {/* Show the error if loading failed, otherwise show "No doctors found." when the list is empty */}
      {error ? (
        <p style={{ padding: "0 40px", color: "red" }}>{error}</p>
      ) : (
        filteredDoctors.length === 0 && (
          <p style={{ padding: "0 40px" }}>No doctors found.</p>
        )
      )}
    </div>
  );
}

export default Doctors;