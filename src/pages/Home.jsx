import React, { useContext, useEffect, useState } from "react";

import { Appstate } from "../App";
import Header from "../components/Header/Header";
import Classes from "./Home.module.css";
import axios from "../axiosConfig";
import Allquestion from "./Allquestion";
import { RxAvatar } from "react-icons/rx";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(Appstate);

  const [Questions, SetQuestions] = useState([]);
  async function AllQuestions() {
    try {
      const { data } = await axios.get("/questions/all-questions");

      const SelectTables = data.selecttables;
      SetQuestions(SelectTables);
    } catch (error) {}
  }
  useEffect(() => {
    AllQuestions();
  }, []);
  return (
    <div>
      <Header />
      <div className={Classes.welcome}>
        <div className={Classes.WElcome_Agree_Join}>
          <Link to="/Askquestion">
            <button type="submit" className={Classes.register_button}>
              Ask Question
            </button>
          </Link>
          <h2>wellcome : {user.username}</h2>
        </div>
        <div className={Classes.Questions}>
          <h2>Questions</h2>
        </div>
      </div>
      <div className={Classes.questions_list}>
        {Questions.map((question, index) => (
          <div key={index} className={Classes.question_container}>
            <hr className={Classes.horizontal_line} />
            <div className={Classes.question_content}>
              <div className={Classes.PhotoIcon}>
                <RxAvatar
                  size={50}
                  color="#ABABAB"
                  className={Classes.PhotoIcon}
                />
              </div>
              <Link
                className={Classes.link}
                to={`/Answer/${question.questionid}/${encodeURIComponent(
                  question.title
                )}/${encodeURIComponent(question.description)}`}
              >
                {" "}
                <div className={Classes.title}>
                  <p>{question.title}</p>
                </div>
              </Link>

              <div className={Classes.arrow_icon}>
                <RiArrowDropRightLine size={50} />
              </div>
            </div>
            <p className={Classes.user_name}>{question.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
