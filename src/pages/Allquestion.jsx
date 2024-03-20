import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig';
import Classes from './Allquestion.module.css';
import { RxAvatar } from "react-icons/rx";

function Allquestion({ title, userName, profilePhoto }) 

{
  return (
    <div className={Classes.question}>
  
    <div className={Classes.question_details}>
      <h2 className={Classes.question_title}>{title}</h2>
      <p className={Classes.user_name}>{userName}</p>
    </div>
  </div>
  )
}

export default Allquestion;