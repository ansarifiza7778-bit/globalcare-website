import { Link } from "react-router-dom";

// props.user: login hai to user ka data, nahi to null
// props.onLogout: Logout dabane par chalne wala function
function Navbar(props) {
  return (
    <header className="navbar">
      <Link to="/">
        <h2>GlobalCare International</h2>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>

        {/* Login hai to naam aur Logout dikhao, nahi to Login link */}
        {props.user ? (
          <>
            <span style={{ marginLeft: 20 }}>Hi, {props.user.name}</span>
            <Link to="/" onClick={props.onLogout}>Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;