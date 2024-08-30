import { useState, useEffect } from "react";
import questions from "../../questions";

function Question({ questVisible }) {
  const [timer, setTimer] = useState(30);
  const [delay, setDelay] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizFinished, setQuizFinished] = useState(false);
  const [disabled, setDisabled] = useState(false); // Yeni state eklendi

  const currentQuestion = questions[currentQuestionIndex];
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    if (questVisible && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer === 27) {
          setDelay(true);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    if (timer === 0) {
      handleNextQuestion(null);
    }
  }, [questVisible, timer]);

  const handleOptionSelect = (option) => {
    if (disabled) return;
    setDisabled(true);
    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) {
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        incorrect: prevScore.incorrect + 1,
      }));
    }

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, selectedAnswer: option, isCorrect },
    ]);

    setTimeout(() => {
      handleNextQuestion();
    }, 0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setDelay(false);
      setDisabled(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <>
      {quizFinished ? (
        <div className="quiz-results">
          <div className="general-result">
            <h1>Quiz Tamamlandı!</h1>
            <p>
              <strong>Doğru Sayısı:</strong> {score.correct}
            </p>
            <p>
              <strong>Yanlış Sayısı:</strong> {score.incorrect}
            </p>
          </div>

          <div className="answers-summary">
            <h2>Verilen Yanıtlar:</h2>
            {answers.map((answer, index) => (
              <div key={index} className="answer-item">
                <p>
                  <strong>{index + 1}. Soru:</strong> {answer.question}
                </p>
                <p>
                  Verilen Yanıt:{" "}
                  {
                    optionLabels[
                      questions[index].options.indexOf(answer.selectedAnswer)
                    ]
                  }{" "}
                  - {answer.selectedAnswer}
                </p>
                <p>
                  Doğru Yanıt:{" "}
                  {
                    optionLabels[
                      questions[index].options.indexOf(questions[index].answer)
                    ]
                  }{" "}
                  - {questions[index].answer}
                </p>
                <p>
                  <strong>Sonuç: </strong>
                  {answer.isCorrect ? "Doğru" : "Yanlış"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        questVisible && (
          <div className="quest-container">
            <div className="timer">
              <h1>{timer}</h1>
            </div>
            <div className="img">
              <img src={`./assets/${currentQuestion.media}`}></img>
            </div>
            <div className="question">
              <h1>{currentQuestion.question}</h1>
            </div>
            {delay && (
              <div className="answer">
                <div className="options">
                  {currentQuestion.options.map((option, index) => (
                    <h1
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      style={{ pointerEvents: disabled ? "none" : "auto" }}
                    >
                      {optionLabels[index]}. {option}
                    </h1>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}

export default Question;
