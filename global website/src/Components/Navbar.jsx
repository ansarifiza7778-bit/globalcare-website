import { Link } from "react-router-dom";

// props.user: user data if logged in, otherwise null
// props.onLogout: function that runs when Logout is clicked
function Navbar(props) {
  return (
    <header className="navbar">
      <Link to="/">
        <h2>GlobalCare International</h2>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>

        {/* If logged in, show My Bookings, name and Logout. Otherwise show Login */}
        {props.user ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>
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