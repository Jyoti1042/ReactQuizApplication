import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../index.css";
import toast from "react-hot-toast";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  correctAnswers,
  setCorrectAnswers,
  wrongAnswers,
  setWrongAnswers,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds for each question

  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      handleNext(); // Move to next question when time is up
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    setTimer(60); // Reset timer to 60 seconds when question changes
  }, [currQues]);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
    setError(false);
  };

  const handleNext = () => {
    if (currQues >= 9) {
      navigate("/result");
    } else if (selected || timer === 0) {
      setCurrQues(currQues + 1);
      setSelected();
    } else toast.error("Please Choose Answer");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions([]);
  };

  return (
    <div className="w-full flex flex-col  items-center">
      <h1>Question {currQues + 1} :</h1>

      <div className="w-full min-h-[350px] flex flex-col items-center justify-around  p-[20px] mt-[30px]">
        <h2 className="text-red-900 font-extrabold">
          {questions[currQues].question}
        </h2>
        <div className="w-full flex justify-around">
          <span>Time Left: {timer}s</span>
        </div>
        <div className="w-full flex flex-wrap items-center flex-1 justify-around m-[10px] ">
          {options &&
            options.map((i) => (
              <button
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="flex w-full gap-1 lg:justify-around">
          <Button
            style={{
              width: 180,
              backgroundColor: "red", // Set background color to red
              color: "white", // Set text color to white
            }}
            variant="contained"
            size="large"
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 180 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
