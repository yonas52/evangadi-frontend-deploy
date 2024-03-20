import React from "react";
import Login from "../../pages/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Classes from "../SignUp/loginpage.module.css";

function LoginPage() {
  return (
    <div>
      <Header />
      <div className={Classes.background_image}>
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
