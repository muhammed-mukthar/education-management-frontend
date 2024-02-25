import React, { useEffect, useState } from "react";
import "./quiz.css"; // Import CSS file
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CyberSecurityQuizComponent({ id }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  console.log(questions);
  const startQuiz = () => {
    setQuizStarted(true);
  };
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let jwtToken = localStorage.getItem("accessToken");

        const { data } = await axios.post(
          `http://localhost:8080/api/v1/auth/list-quiz/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setLoading(false);
        setQuestions(data);
        setAnswers(new Array(data.length).fill(""));
      } catch (err) {
        console.error(err);
        setLoading(false);
        // Handle errors
      }
    };

    fetchData();
  }, [id]);

  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;
    setAnswers(updatedAnswers);
    nextQuestion(); // Add this line to move to the next question
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  let SendResult = async (score) => {
    try {
      let jwtToken = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8080/api/v1/auth/result/create",
        { marks: score, testId: id },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const finishQuiz = async () => {
    // Calculate score
    const score = answers.filter(
      (answer, index) => answer === questions[index].answer
    ).length;
    await SendResult(score);
    // Show result box
    setShowResult(true);
  };

  if (!quizStarted) {
    return (
      <div className="start_btn">
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (showResult) {
    // Show result box
    return (
      <div className="result_box">
        <div className="icon">
          {/* <i className="material-icons">security</i> */}
        </div>
        <div className="finished_txt">
          Well done! You've completed the quiz!
        </div>
        <div className="final_score">
          <span>
            Results:{" "}
            {
              answers.filter(
                (answer, index) => answer === questions[index].answer
              ).length
            }{" "}
            out of {questions.length}
          </span>
        </div>
        <div className="buttons">
          <button className="quit" onClick={goBack}>
            Exit Quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentQuestion === questions.length) {
    finishQuiz();
    return null; // Render nothing until showing the result box
  }

  return (
    <div>
      <div className="quiz_box">
        {/* <header>
          <div className="title">
            Cyber Security Online Quiz - Test Yourself!
          </div>
        </header> */}
        <section>
          <div className="question_text">
            <span>{questions[currentQuestion].question}</span>
          </div>
          <div className="option_list">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option ${
                  answers[currentQuestion] === option
                    ? option === questions[currentQuestion].answer
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleAnswer(option)}
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
        </section>
        <footer>
          <div className="total_que">
            <span>
              <p>
                {currentQuestion + 1} of {questions.length} Questions
              </p>
            </span>
          </div>
          {currentQuestion < questions.length - 1 ? (
            <Button onClick={nextQuestion}>Next Question</Button>
          ) : (
            <Button className="next_btn" onClick={finishQuiz}>
              Finish Quiz
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default CyberSecurityQuizComponent;
