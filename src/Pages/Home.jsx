import { Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import quizImg from "../assets/homepageIcon.png";
import Categories from "../Data/Categories";
import toast from "react-hot-toast";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error("All fields required");
    }
  }, [error]);

  const handleSubmit = () => {
    //Validations for input fields
    if (!category || !difficulty || !name) {
      toast.error("All fields required");
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div className="content w-full flex justify-around font-serif font-semibold">
      <div className="flex settings flex-col items-center p-[10px] w-[90%] lg:w-[45%] ">
        <span className="whitespace-nowrap" style={{ fontSize: 30 }}>
          Create Your Quiz{" "}
        </span>
        <div className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] first-line:rounded-sm flex flex-col p-[20px] w-full justify-evenly flex-0.8 ">
          <TextField   //Input component of mui
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField 
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
          
            <MenuItem           //mui component for dusplay a list of options
            key="Easy"
             value="easy" >  
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <div className="flex justify-center">
            <Button
              variant="contained"
              style={{
                width: 185,
                backgroundColor: "#4f301f", // Set background color to red
                color: "white", 
              }}
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
      <img
        src={quizImg}
        className="banner p-[8px] w-[75%] lg:w-[40%]  self-center"
        alt="quiz-Image"
      />
    </div>
  );
};

export default Home;
