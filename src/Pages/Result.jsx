import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";

// Register the necessary components for piechart
ChartJS.register(Tooltip, Legend, Title, ArcElement);

const Result = ({ name, score, correctAnswers, wrongAnswers }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // State to control modal visibility

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  // Data for the pie chart
  const pieData = {
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
      {
        label: "Answer Analysis",
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["#A52A2A", "#FFA500"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
   // Navigate to the homepage when modal is closed
  const handleClose = () => {
    setOpen(false);
    navigate("/"); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background for modal content
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px", // Modal shadow
        },
      }}
      BackdropProps={{
        className: "backdrop-blur-sm bg-black/60", // Black blur background
      }}
    >
      <div className="text-center underline  font-extrabold font-serif">
        Result Analysis
      </div>
      <DialogContent className="flex overflow-x-hidden flex-col h-[60vh] justify-center text-center font-serif font-bold">
        <div className="flex flex-wrap justify-around items-center w-full">
          <div className="flex-col space-y-3 flex justify-center items-center">
            <span className="text-[12px] lg:text-[18px] mt-4">Name: {name}</span>
            <span className="text-[12px] lg:text-[18px] mt-4">
              Total Correct Answers: {correctAnswers}
            </span>
            <span className="text-[12px] lg:text-[18px] mt-2">
              Total Wrong Answers: {wrongAnswers}
            </span>
            <span className="text-[12px] lg:text-[18px]">
              Final Score : {score}/{correctAnswers + wrongAnswers} Marks
            </span>
          </div>

          {/* Pie Chart */}
          <div className="w-[250px] lg:w-[300px] mt-3">
            <Pie data={pieData} />
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          style={{
            alignSelf: "center",
            marginTop: 45,
            backgroundColor: "#4f301f",
          }}
          onClick={handleClose}
        >
          Go to homepage
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Result;
