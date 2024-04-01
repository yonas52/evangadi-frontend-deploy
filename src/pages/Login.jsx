import React from "react";
import { useRef, useState, useContext } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Classes from "../pages/Login.module.css";
import { Appstate } from "../App";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Login() {
  const EmailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [RequireInformation, setRequireInformation] = useState("");

  const [Error, SetError] = useState("");
  //use naviagate
  const navigate = useNavigate();
  // refresh key
  const [refreshKey, setRefreshKey] = useState(0);
  //user
  const { user, setuser } = useContext(Appstate);

  async function handleSubmit(e) {
    e.preventDefault();

    const Emailvalue = EmailDom.current.value;
    const passwordvalue = passwordDom.current.value;
    if (!Emailvalue || !passwordvalue) {
      setRequireInformation("Please provide all required informations!!");

      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: Emailvalue,
        password: passwordvalue,
      });
      console.log(data);

      navigate("/");

      localStorage.setItem("token", data.token);
      console.log(data);
      let { username } = data;
      setuser({ username });
    } catch (error) {
      SetError(error?.response?.data?.msg);
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className={Classes.Aboutflex}>
      <div className={Classes.overlay}>
        <section className={Classes.registration_section}>
          <form className={Classes.registration_form} onSubmit={handleSubmit}>
            <h3>Login to your Account</h3>

            <div className={Classes.signin}>
              <p>Don't have an account?</p>
              <Link to={"/register"} className={Classes.login_link}>
                Create a new Account
              </Link>
            </div>
            <div className={Classes.RequireInformation}>
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              {RequireInformation && !Error && (
                <p style={{ color: "red" }}>{RequireInformation}</p>
              )}
            </div>
            <div className={Classes.form_group}>
              <input
                className={Classes.form_input}
                ref={EmailDom}
                type="email"
                placeholder="Your Email"
                onFocus={(e) =>
                  (e.target.style.borderBottom = "2px solid orange")
                }
                onBlur={(e) => (e.target.style.borderBottom = "")}
              />
            </div>

            <div className={Classes.formflex}></div>

            <div className={Classes.form_group}>
              <input
                className={Classes.form_input}
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                onFocus={(e) =>
                  (e.target.style.borderBottom = "2px solid orange")
                }
                onBlur={(e) => (e.target.style.borderBottom = "")}
              />
              <div
                className={Classes.eyeIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye color="#FE9395" />
                ) : (
                  <FaEyeSlash color="#FE9395" />
                )}
              </div>
            </div>

            <button type="submit" className={Classes.register_button}>
              Submit
            </button>

            <br />
            <div className={Classes.PrivacyPolicy}>
              <p className={Classes.Account}>
                <Link to={"/register"} className={Classes.red_linkAccount}>
                  Create an account?
                </Link>
              </p>
            </div>
          </form>
        </section>
        <h4>
          <a className={Classes.login_link} href={`/login`}>
            About
          </a>
          <div className={Classes.networks}><p>Evangadi Networks Q&A</p></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            distinctio laborum mollitia incidunt, quia dolores eum optio
            consectetur recusandae magni aliquid, dicta maiores praesentium
            cupiditate corporis repudiandae beatae aperiam ratione?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            distinctio laborum mollitia incidunt, quia dolores eum optio
            consectetur recusandae magni aliquid, dicta maiores praesentium
            cupiditate corporis repudiandae beatae aperiam ratione?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            distinctio laborum mollitia incidunt, quia dolores eum optio
            consectetur recusandae magni aliquid, dicta maiores praesentium
            cupiditate corporis repudiandae beatae aperiam ratione?
          </p>
          <button type="submit" className={Classes.register_button2}>
            How it works
          </button>
        </h4>
      </div>
    </div>
  );
}

export default Login;
