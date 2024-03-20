import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../../pages/Register";
import Classes from "../SignUp/registerpage.module.css";
import About from "../About/About";

function RegisterPage() {
  return (
    <div>
      <Header />
      <div className={Classes.background_image}>
        <Register />
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
