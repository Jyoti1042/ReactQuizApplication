import axios from "axios";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result.jsx";
import Navbar from "./components/Navbar";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();      //Initialize name here because it will be pass result component later
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

//Used TRIVIA JSON API

  const fetchQuestions = async (category = "", difficulty = "") => {

    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
   console.log(data.results);
    setQuestions(data.results);
  };
  return (
    <div className="min-h-[100vh] h-full min-w-full bg-[#d0b783]">
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            ></Home>
          }
        ></Route>
        <Route
          path="/quiz"
          element={
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
              wrongAnswers={wrongAnswers}
              setWrongAnswers={setWrongAnswers}
            ></Quiz>
          }
        ></Route>
        <Route
          path="/result"
          element={
            <Result
              name={name}
              score={score}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            ></Result>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
