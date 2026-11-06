import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // This state stores the error message (empty means no error)
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // Send the form data to the backend register route
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend sent an error, for example "Email already registered"
        setError(data.message);
        return;
      }

      // Registered successfully, so go to the Login page
      navigate("/login");
    } catch (err) {
      // This happens when the backend server is not running
      setError("Cannot connect to the server. Please try again.");
    }
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

        {/* Show the error message only when there is one */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="form-btn">Register</button>
      </form>

      <p className="form-note">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;