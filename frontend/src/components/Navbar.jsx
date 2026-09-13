
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("nextstepAssessment");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">
        NEXTSTEP<span>AI</span>
      </div>

      <nav>
        <a href="#home">HOME</a>
        <a href="#careers">CAREERS</a>
        <a href="#about">ABOUT</a>
      </nav>

      <div className="nav-actions">
        {token ? (
          <button className="logout" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <Link to="/login" className="login">
            LOGIN
          </Link>
        )}

        <button className="menu">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

