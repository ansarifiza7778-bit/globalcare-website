import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute sends the user here, so after login we go back to that page
  const from = location.state && location.state.from ? location.state.from : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // This state stores the error message (empty means no error)
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // Send email and password to the backend login route
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend sent an error, for example "Invalid email or password"
        setError(data.message);
        return;
      }

      // Login successful: save the user details that came from the backend
      props.onLogin({ name: data.user.name, email: data.user.email });

      navigate(from);
    } catch (err) {
      // This happens when the backend server is not running
      setError("Cannot connect to the server. Please try again.");
    }
  }

  return (
    <div className="details">
      <h1>Login</h1>

      {/* Show this message if the user was sent here from another page */}
      {from !== "/" ? (
        <p className="details-sub">Please login to continue.</p>
      ) : (
        <p className="details-sub">Welcome back. Please login to your account.</p>
      )}

      <form className="form" onSubmit={handleSubmit}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Show the error message only when there is one */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="form-btn">Login</button>
      </form>

      <p className="form-note">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;