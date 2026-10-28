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

// ProtectedRoute: agar user login nahi hai to use Login page par bhej do
function ProtectedRoute(props) {
  const location = useLocation();

  if (!props.user) {
    // state={{ from: ... }}: login ke baad wapas isi page par aane ke liye
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return props.children;
}

function App() {
  // user: login hone par user ka data, nahi to null
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

        {/* Ye 3 pages sirf login ke baad khulenge */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute user={user}>
              <BookAppointment />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;