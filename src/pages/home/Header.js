import React from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";
import "./facts.css"; // Import CSS file
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const userData = useSelector((state) => state.userId.userData);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  return (
    <div className="heading bodys">
      <nav>
        <span className="navitem">
          <img
            src={logo2}
            alt="logo here"
            className="logo"
            width="65rem"
            onClick={() => handleNavigation("/")} // Navigate to home
            style={{ cursor: "pointer" }}
          />
        </span>
        <span>
          <button onClick={() => handleNavigation("/")}>HOME</button>
        </span>

        {!loggedIn ? (
          <span>
            <button onClick={() => handleNavigation("/login")}>LOGIN</button>
          </span>
        ) : (
          <span>
            <button onClick={() => handleNavigation("/dashboard")}>
              DASHBOARD
            </button>
          </span>
        )}
      </nav>
    </div>
  );
}

export default Header;
