import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute ne jo page bheja tha, login ke baad wahi par jaana hai
  const from = location.state && location.state.from ? location.state.from : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Abhi backend nahi hai, isliye koi bhi email aur password chalega.
    // Naam email ke @ se pehle wale hisse se banta hai.
    props.onLogin({ name: email.split("@")[0], email: email });

    navigate(from);
  }

  return (
    <div className="details">
      <h1>Login</h1>

      {/* Agar kisi page se bheja gaya hai to ye message dikhao */}
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

        <button type="submit" className="form-btn">Login</button>
      </form>

      <p className="form-note">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;