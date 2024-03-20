import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Classes from "../Footer/Footer.module.css";
import logo2 from "../../Assets/Images/logo2.png";

function Footer() {
  return (
    <div>
      <footer className={Classes.footer}>
        <div className={Classes.footer_content}>
          <div className={Classes.footer_logo}>
            <img src={logo2} alt="Logo" />
            <div className={Classes.footer_Icons}>
              <div>
                <FaFacebook size={40} color="white" />
              </div>
              <div>
                {" "}
                <FaInstagram size={40} color="white" />
              </div>
              <div>
                <FaYoutube size={40} color="white" />
              </div>
            </div>
          </div>
          <div className={Classes.footer_links}>
            <div className={Classes.footer_links_column2}>
              <h3>Useful Links</h3>
              <ul>
                <li>How it works</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className={Classes.footer_links_column}>
              <h3>Contact Info</h3>
              <ul>
                <li>Evangadi Networks</li>
                <li>support@evangadi.com</li>
                <li>+1-202-386-2702</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
