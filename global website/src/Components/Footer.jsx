import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h3>GlobalCare International</h3>
          <p>Find trusted doctors and book appointments from anywhere.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          {/* Link: page reload kiye bina dusre page par jaata hai */}
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/login">Login</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>support@globalcare.com</p>
          <p>Mon - Sat, 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 GlobalCare International. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;