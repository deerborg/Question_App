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
    if (disabled) return; // Tıklamayı devre dışı bırak
    setDisabled(true); // Tıklamayı devre dışı bırakmak için state'i güncelle

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
    }, 300); // 1 saniye bekledikten sonra sonraki soruya geç
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setDelay(false);
      setDisabled(false); // Yeni soru başladığında tıklamayı yeniden etkinleştir
    } else {
      // Tüm sorular bitti, quiz tamamlandı
      setQuizFinished(true);
    }
  };

  return (
    <>
      {quizFinished ? (
        <div className="quiz-results">
          <h1>Quiz Tamamlandı!</h1>
          <p>Doğru Sayısı: {score.correct}</p>
          <p>Yanlış Sayısı: {score.incorrect}</p>
          <div className="answers-summary">
            <h2>Verilen Yanıtlar:</h2>
            {answers.map((answer, index) => (
              <div key={index} className="answer-item">
                <p>
                  {index + 1}. Soru: {answer.question}
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
                <p>{answer.isCorrect ? "Doğru" : "Yanlış"}</p>
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
              <img src={`/assets/${currentQuestion.media}`}></img>
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
                      style={{ pointerEvents: disabled ? "none" : "auto" }} // Tıklamayı devre dışı bırak
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
