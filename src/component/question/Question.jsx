import { useState, useEffect } from "react";

function Question({ questVisible }) {
  const [timer, setTimer] = useState(30);
  const [delay, setDelay] = useState(false);

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
  }, [questVisible, timer]);
  return (
    <>
      {questVisible && (
        <div className="quest-container">
          <div className="timer">
            <h1>{timer}</h1>
          </div>
          <div className="img">
            <img src="/src/assets/balik.jpg"></img>
          </div>
          <div className="question">
            <h1>Lorem ipsum dolor sit.</h1>
          </div>
          {delay && (
            <div className="answer">
              <div className="options">
                <h1>OPTION 1</h1>
                <h1>OPTION 1</h1>
                <h1>OPTION 1</h1>
                <h1>OPTION 1</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Question;
