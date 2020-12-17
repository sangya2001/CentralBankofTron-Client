import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo.webp";

// material components
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";

export default function Navbar({ page }) {
  return (
    <div className="navbar">
      {/* logo */}
      <Link to='/' className="logo">
        <img src={Logo} alt="Central Bank of Tron" /> Central Bank of Tron
      </Link>

      {/* nav socials */}
      <div className="navSocial">
        <ul>
          <li>
            {page == "home" ? <Link to="/dashboard">
              <b>Dashboard</b>
            </Link> : <Link to="/">
                <b>Logout</b>
              </Link>}
          </li>

          <li>
            <Link to="">
              <FacebookIcon />
            </Link>
          </li>
          <li>
            <Link to="">
              <TelegramIcon />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
