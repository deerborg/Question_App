import { useEffect } from "react";
import { useState } from "react";
import Question from "../question/Question";

function Start() {
  const [questVisible, setQuestVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(true);

  function handleVisible() {
    setQuestVisible(true);
    setStartVisible(false);
  }

  return (
    <>
      {startVisible && (
        <div className="start-container">
          <div className="start-btn">
            <button onClick={handleVisible} id="start">
              Teste Başla
            </button>
          </div>
          <div className="start-para">
            <p>Teste Başla'ya basarak soruları görebilirsiniz.</p>
          </div>
        </div>
      )}

      <Question questVisible={questVisible}></Question>
    </>
  );
}
export default Start;
