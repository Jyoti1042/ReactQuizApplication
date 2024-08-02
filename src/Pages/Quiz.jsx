import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";

const Quiz = ({
  name,
  questions,
  score,
  setScore,
  correctAnswers,
  wrongAnswers,
  setWrongAnswers,
  setCorrectAnswers,
  setQuestions,
}) => {
  let navigate = useNavigate(); //for navigation
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  //it update the state when current ques will change
  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);
   //this method is responsibile for shuffling the options (array of options)
  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="flex flex-col px-[10px] font-semibold items-center font-serif">
      <span className="text-[20px] mt-4 underline-offset-1 py-[5px] px-[10px] font-serif font-semibold text-red-950 opacity-40 ">
        Welcome {name}!
      </span>

      {questions ? (
        <>
          <div className="w-full text-sm flex justify-between underline uppercase m-[10px]">
            <span>{questions[currQues].category}</span>
            <span>Score : {score}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            wrongAnswers={wrongAnswers}
            setWrongAnswers={setWrongAnswers}
          />
        </>
      ) : (
        <CircularProgress         //MUI spinner
          style={{ margin: 100 }}
          color="inherit"
          size={50}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
