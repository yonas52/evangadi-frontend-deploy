import React, { useState, useContext, useRef } from "react";
import Classes from "./AskQuestion.module.css";
import Header from "../components/Header/Header";
import { Appstate } from "../App";
import { v4 as uuidv4 } from "uuid";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function AskQuestion() {
  const navigate = useNavigate();
  //userid
  const { user } = useContext(Appstate);

  const userid = user.userid;
  //question id
  const questionId = uuidv4();
  //title and descripition
  const TitleDom = useRef(null);
  const DiscripitionDom = useRef(null);
  // refresh key
  const [refreshKey, setRefreshKey] = useState(0);
  // Homepage
  const [home, sethome] = useState("");
  //the answer is post successfully
  const [questionpost, setquestionpost] = useState("");
  //error
  const [Error, SetError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const TitleValue = TitleDom.current.value;
    const Descripitiondvalue = DiscripitionDom.current.value;
    if (!TitleValue || !Descripitiondvalue) {
      setquestionpost("please provide all required informations");

      return;
    }
    try {
      const { data } = await axios.post("/questions/single-question", {
        questionid: questionId,
        userid: userid,
        title: TitleValue,
        descripition: Descripitiondvalue,
      });

      sethome(data?.msg);
      navigate("/");
    } catch (error) {
      SetError(error?.response?.data?.msg);
    }
  }
  return (
    <div>
      <Header />
      <div className={Classes.question_form_Instruction}>
        <h2>Steps to Write a Good Question</h2>
        <ul>
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you have tried and what you expected to happen</li>
          <li>Review Your Question and post it to the site</li>
        </ul>
      </div>
      <div className={Classes.question_form_container}>
        <div className={Classes.Ask_Puplic}>
          {" "}
          <h2>Ask Public Questions</h2>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
          {questionpost && (
            <p style={{ color: "rgba(255, 0, 0, 0.8)" }}>{questionpost}</p>
          )}
          {home && <p style={{ color: "rgba(255, 0, 0, 0.8)" }}>{home}</p>}
        </div>
        <form className={Classes.question_form} onSubmit={handleSubmit}>
          <div className={Classes.form_group}>
            <input ref={TitleDom} type="text" placeholder="Title" />
          </div>
          <div className={Classes.form_group}>
            <textarea
              ref={DiscripitionDom}
              placeholder="Question Descripition"
            ></textarea>
          </div>

          <button type="submit">Post Your Question</button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
