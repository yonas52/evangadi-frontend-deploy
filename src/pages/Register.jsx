import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Classes from "../pages/Register.module.css";
import { useEffect } from "react";
import About from "../components/About/About";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const UsernNameDom = useRef(null);
  const FirstNameDom = useRef(null);
  const LastNameDom = useRef(null);
  const EmailDom = useRef(null);
  const passwordDom = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [RequireInformation, setRequireInformation] = useState("");

  const [Error, SetError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const usernamevalue = UsernNameDom.current.value;
    const firstnamevalue = FirstNameDom.current.value;
    const lastnamevalue = LastNameDom.current.value;
    const Emailvalue = EmailDom.current.value;
    const passwordvalue = passwordDom.current.value;
    if (
      !usernamevalue ||
      !firstnamevalue ||
      !lastnamevalue ||
      !Emailvalue ||
      !passwordvalue
    ) {
      setRequireInformation("Please provide all required informations!!");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernamevalue,
        firstname: firstnamevalue,
        lastname: lastnamevalue,
        email: Emailvalue,
        password: passwordvalue,
      });

      navigate("/login");
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
            <h3>join the network</h3>
            <div className={Classes.signin}>
              <p>Already have an account?</p>
              <Link to="/login" className={Classes.login_link}>
                Signin
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
                placeholder="Email"
                onFocus={(e) =>
                  (e.target.style.borderBottom = "2px solid orange")
                }
                onBlur={(e) => (e.target.style.borderBottom = "")}
              />
            </div>

            <div className={Classes.formflex}>
              <div className={Classes.form_group}>
                <input
                  className={Classes.form_inputflex}
                  ref={FirstNameDom}
                  type="text"
                  placeholder="First name"
                  onFocus={(e) =>
                    (e.target.style.borderBottom = "2px solid orange")
                  }
                  onBlur={(e) => (e.target.style.borderBottom = "")}
                />
              </div>

              <div className={Classes.form_group}>
                <div className={Classes.Lastname}>
                  <input
                    className={Classes.form_inputflex2}
                    ref={LastNameDom}
                    type="text"
                    placeholder="Last name"
                    onFocus={(e) =>
                      (e.target.style.borderBottom = "2px solid orange")
                    }
                    onBlur={(e) => (e.target.style.borderBottom = "")}
                  />
                </div>
              </div>
            </div>

            <div className={Classes.form_group}>
              <input
                className={Classes.form_input}
                ref={UsernNameDom}
                type="text"
                placeholder="Username"
                onFocus={(e) =>
                  (e.target.style.borderBottom = "2px solid orange")
                }
                onBlur={(e) => (e.target.style.borderBottom = "")}
              />
            </div>

            <div className={Classes.form_group}>
              <input
                className={Classes.form_input}
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
              Agree and join
            </button>
            <br />
            <div className={Classes.PrivacyPolicy}>
              <p>
                I agree to the{" "}
                <a href="#" className={Classes.red_link}>
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" className={Classes.red_link}>
                  terms of service
                </a>
                .
              </p>
              <p className={Classes.Account}>
                <Link to={"/login"} className={Classes.red_linkAccount}>
                  Already have an account?
                </Link>
              </p>
            </div>
          </form>
        </section>
        <h4>
          <a className={Classes.login_link} href={`/login`}>
            About
          </a>
          <h1>Evangadi Networks Q&A</h1>
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
          <button type="submit" className={Classes.register_button}>
            How it works
          </button>
        </h4>
      </div>
    </div>
  );
}

export default Register;
