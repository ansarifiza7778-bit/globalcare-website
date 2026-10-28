import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Abhi sirf Login page par bhej rahe hain. Asli register backend ke baad judega.
    navigate("/login");
  }

  return (
    <div className="details">
      <h1>Create Account</h1>
      <p className="details-sub">Join GlobalCare International to book appointments.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Full name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="form-btn">Register</button>
      </form>

      <p className="form-note">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;