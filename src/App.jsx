import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useContext, useEffect, useState } from "react";
import axios from './axiosConfig';
import LoginPage from "./components/SignUp/LoginPage";
import RegisterPage from "./components/SignUp/RegisterPage";
import AskQuestion from "./pages/AskQuestion";
import Answer from "./pages/Answer";

export const Appstate=createContext()

 
function App() {

  const [user, setuser] = useState({ });
  const navigate=useNavigate()

 const token= localStorage.getItem('token')




useEffect(() => {
  async function checkUser() {
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
  }

  if (token) {
    checkUser();
  } else {
   
    navigate('/login');
  }
}, [token]);



  return (
    <Appstate.Provider value={{user:user,setuser:setuser}} >
      <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/Askquestion" element={<AskQuestion/>}/>
        <Route path="/Answer/:QuestionId/:title/:description" element={<Answer/>}></Route>
     
   </Routes>
    </Appstate.Provider>
  );
}



export default App;
