import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#199FD9", color: "#fff", fontWeight: "bold" }}>
      <div className="container-fluid">
        <span className="navbar-brand text-white">🏥 OPD Management</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#fff" }}
        >
          <span className="navbar-toggler-icon" style={{ color: "#fff" }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/register-patient" className="nav-link text-white">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/patient-list" className="nav-link text-white">Patients</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
