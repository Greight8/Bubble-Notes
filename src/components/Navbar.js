import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import darkContext from '../context/darkmode/darkContext';

export default function Navbar(props) {
  // getting notes from context api
  const context = useContext(darkContext);
  const { mode, img, toggleMode } = context;

  // making useNavigate hook to redirect
  let navigate = useNavigate();

  // using uselocation hok
  const location = useLocation();

  // making hnadleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  const { title, home, about } = props;

  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: mode === "light" ? "lightskyblue" : "lightskyblue" }}><strong>{title}</strong></Link>
        <img className='mx-4' src={img} onClick={toggleMode} alt=".." style={{
          width: "28px",
        }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "fw-bolder" : ""}`} aria-current="page" to="/" style={{ color: mode === "light" ? "#1597ea" : "#1597ea" }}>{home}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "fw-bolder" : ""}`} to="/about" style={{ color: mode === "light" ? "#1597ea" : "#1597ea" }}>{about}</Link>
            </li>
          </ul>
        </div>

        <div>
          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn btn-info mx-3" to="/login" role="button" style={{ borderRadius: "10px" }}>Login</Link>

            <Link className="btn btn-info mx-2" to="/signin" role="button" style={{ borderRadius: "10px" }}>Sign in</Link>

          </form> : <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link mx-3 ${location.pathname === "/myAccount" ? "fw-bolder" : ""}`} to="/myAccount" style={{ color: mode === "light" ? "#1597ea" : "#1597ea" }}>Account</Link>
            </li>
            <button className="btn btn-sm btn-info mx-2" onClick={handleLogout} style={{ borderRadius: "10px" }}>Logout</button>
          </ul>}
        </div>

      </div>
    </nav>
  )
}
