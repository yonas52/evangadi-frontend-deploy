import React, { useState, useEffect } from "react";
import Classes from "./Answer.module.css";
import { Appstate } from "../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "../axiosConfig";
import { RxAvatar } from "react-icons/rx";
import Header from "../components/Header/Header";

function Answer() {
  //userid
  const { user } = useContext(Appstate);
  // setuser({userid})
  const userid = user ? user.userid : null;
  console.log(userid);
  //questionid
  const { QuestionId } = useParams();
  //title
  const { title } = useParams();
  //descripition
  const { description } = useParams();
  //Answer
  const AnswerDom = useRef(null);
  //set state
  const [Answers, SetAnswer] = useState([]);
  //refresh key
  const [refreshKey, setRefreshKey] = useState(0);
  //the answer is post successfully
  const [answerpost, setanswerpost] = useState("");
  //error
  const [Error, SetError] = useState("");
  //Require information
  const [RequireInformation, setRequireInformation] = useState("");

  //Axios request to post an answer for specific(questionid) questions
  async function AllAnswers(e) {
    try {
      const { data } = await axios.get("/answers/all-answers");
      const SelectTables = data.selecttables;
      SetAnswer(SelectTables);
    } catch (error) {
      SetError(error?.response?.data?.msg);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const AnswerValue = AnswerDom.current.value;

    if (!AnswerValue) {
      setRequireInformation("Please provide all required informations!!");
      return;
    }
    try {
      const { data } = await axios.post("/answers/single-answer", {
        Questionid: QuestionId,
        Userid: userid,
        Answer: AnswerValue,
      });

      setanswerpost("The answer is posted successfully");
      console.log(answerpost);
      AnswerDom.current.value = "";
    } catch (error) {
      SetError(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  AllAnswers();
  return (
    <div>
      <Header />
      <div className={Classes.Questions}>
        <h2>Questions</h2>
        <h4>{title}</h4>
        <h5>{description}</h5>
        <hr className={Classes.horizontal_line} />
      </div>

      <div className={Classes.questions_list}>
        <h1>Answer From The Community</h1>
        {Answers.map((Answer, index) => (
          <div key={index} className={Classes.question_container}>
            <div className={Classes.question_content}>
              <div className={Classes.PhotoIcon}>
                {QuestionId === Answer.questionid ? (
                  <RxAvatar
                    size={50}
                    color="#ABABAB"
                    className={Classes.PhotoIcon}
                  />
                ) : null}
              </div>

              <p>
                {QuestionId === Answer.questionid ? (
                  <div className={Classes.title}>
                    <> {Answer.answer}</>
                  </div>
                ) : null}
              </p>
            </div>

            {QuestionId === Answer.questionid ? (
              <p className={Classes.user_name}>
                <> {Answer.username}</>
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className={Classes.question_form_container}>
        <div className={Classes.Ask_Puplic}>
          <h2>Answer The Top Question</h2>
          {answerpost && (
            <p style={{ color: "rgba(255, 0, 0, 0.8)" }}>{answerpost}</p>
          )}
        </div>
        <div className={Classes.RequireInformation}>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
          {RequireInformation && !Error && (
            <p style={{ color: "red" }}>{RequireInformation}</p>
          )}
        </div>
        <form className={Classes.question_form} onSubmit={handleSubmit}>
          <div className={Classes.form_group}>
            <textarea ref={AnswerDom} placeholder="Your Answer..."></textarea>
          </div>
          <button type="submit">Post Your Answer</button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
