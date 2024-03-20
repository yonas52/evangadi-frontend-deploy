import React, { useContext } from "react";
import Classes from "../Header/Header.module.css";
import logo from "../../Assets/Images/logo.png";
import { Appstate } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, setuser } = useContext(Appstate);
  console.log(user);

  const token = localStorage.getItem("token");
  console.log(token);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    setuser(" ");
    navigate("/login");
  };

  const isUserLoggedIn = !!localStorage.getItem("token");
  console.log(isUserLoggedIn);

  return (
    <section className={Classes.site_header}>
      <div className={Classes.logo}>
        {isUserLoggedIn ? (
          <Link to="/">
            <img src={logo} alt="Your Logo" width={100} />
          </Link>
        ) : (
          <img src={logo} alt="Your Logo" width={100} />
        )}
      </div>
      <nav className={Classes.main_nav}>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="how-it-works.html">How it works</a>
          </li>
        </ul>
      </nav>
      <div className={Classes.signin_btn}>
        {isUserLoggedIn ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <button>Sign In</button>
        )}
      </div>
    </section>
  );
}

export default Header;
