import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import DoctorDetails from "./Pages/DoctorDetails";
import BookAppointment from "./Pages/BookAppointment";
import Confirmation from "./Pages/Confirmation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Review from "./Pages/Review";
import MyBookings from "./Pages/MyBookings";

// ProtectedRoute: if the user is not logged in, send them to the Login page
function ProtectedRoute(props) {
  const location = useLocation();

  if (!props.user) {
    // state={{ from: ... }}: so we can come back to this page after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return props.children;
}

function App() {
  // user: user data after login, otherwise null
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* These pages open only after login */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute user={user}>
              <BookAppointment user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute user={user}>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review/:id"
          element={
            <ProtectedRoute user={user}>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute user={user}>
              <MyBookings user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;