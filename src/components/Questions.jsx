import { useState, useEffect } from "react";
import Loader from "./Loader";

// imported Icons
import incorrectIcon from "../assets/images/icon-incorrect.svg";
import correctIcon from "../assets/images/icon-correct.svg";

export default function Questions({
  theme,
  questionStatus,
  dispatch,
  currentQuestionIndex,
  quizzes,
  selectedOptionIndex,
  selectedQuizTitle,
  activeQuizData,
  error,
  correctAnswer,
  answerPicked,
}) {
  useEffect(() => {
    const quizData = quizzes.find((quiz) => quiz.title === selectedQuizTitle);
    dispatch({ type: "settingActiveQuizData", payload: quizData.questions });

    setTimeout(() => {
      dispatch({ type: "questionsReady" });
    }, 2000);
  }, [quizzes, selectedQuizTitle, dispatch]);

  const questionIndex = currentQuestionIndex + 1;

  return (
    <>
      {questionStatus === "sortingQuestions" && (
        <Loader> sorting questions </Loader>
      )}

      {questionStatus === "questionsSorted" && (
        <div className="w-full flex flex-col items-center gap-[1.7rem] px-[1rem]">
          <Pagination
            theme={theme}
            questionIndex={questionIndex}
            activeQuizData={activeQuizData}
          />

          <Question
            activeQuizData={activeQuizData}
            currentQuestionIndex={currentQuestionIndex}
          />

          <Progress
            activeQuizData={activeQuizData}
            questionIndex={questionIndex}
          />

          <Options
            activeQuizData={activeQuizData}
            theme={theme}
            dispatch={dispatch}
            selectedOptionIndex={selectedOptionIndex}
            currentQuestionIndex={currentQuestionIndex}
            correctAnswer={correctAnswer}
            answerPicked={answerPicked}
          />

          <Button
            activeQuizData={activeQuizData}
            questionIndex={questionIndex}
            dispatch={dispatch}
          />

          {error === true && <ErrorMessage />}
        </div>
      )}
    </>
  );
}

function Pagination({ theme, questionIndex, activeQuizData }) {
  return (
    <p
      className={`w-full font-[200] text-left text-[14px] italic ${
        theme === "light"
          ? "text-gray-navy"
          : theme === "dark"
          ? "text-light-bluish"
          : ""
      } `}
    >
      Question {questionIndex} of {activeQuizData.length}
    </p>
  );
}

function Progress({ activeQuizData, questionIndex }) {
  return (
    <div className="w-full flex justify-center">
      <progress
        min={1}
        max={activeQuizData.length}
        value={questionIndex}
        className="w-full h-[8px]"
      />
    </div>
  );
}

function Question({ activeQuizData, currentQuestionIndex }) {
  return (
    <p className=" w-full font-[500] text-left text-[20px] leading-[120%]">
      {activeQuizData[currentQuestionIndex]?.question}
    </p>
  );
}

function Options({
  activeQuizData,
  currentQuestionIndex,
  selectedOptionIndex,
  theme,
  dispatch,
  correctAnswer,
  answerPicked,
}) {
  const [optionClicked, setOptionClicked] = useState(false);

  const alphabets = [
    { id: 0, letter: "a" },
    { id: 1, letter: "b" },
    { id: 2, letter: "c" },
    { id: 3, letter: "d" },
  ];

  const correctAnswerText = activeQuizData[currentQuestionIndex]?.answer;

  return (
    <div className="w-full flex flex-col items-center gap-[1rem] ">
      {activeQuizData[currentQuestionIndex]?.options.map((option, i) => {
        const isSelected = selectedOptionIndex === i;
        const isCorrect = option === correctAnswerText;
        const selectedIsCorrect =
          activeQuizData[currentQuestionIndex]?.options[selectedOptionIndex] ===
          correctAnswerText;

        // Determine border color
        let borderColor = "";
        if (answerPicked) {
          if (isSelected && selectedIsCorrect) {
            borderColor = " border-[2px] border-green";
          } else if (isSelected && !selectedIsCorrect) {
            borderColor = " border-[2px] border-red";
          }
        } else if (isSelected) {
          borderColor = "border-purple";
        }

        // Determine letter circle background
        let circleColor = "";
        if (answerPicked) {
          if (isSelected && selectedIsCorrect) {
            circleColor = "bg-green text-white";
          } else if (isSelected && !selectedIsCorrect) {
            circleColor = "bg-red text-white";
          } else if (!isSelected && isCorrect && !selectedIsCorrect) {
            circleColor = "bg-green text-white";
          }
        } else if (isSelected) {
          circleColor = "bg-purple text-white";
        }

        return (
          <button
            key={i}
            disabled={answerPicked}
            className={` w-[327px] h-[64px] flex items-center justify-between gap-[0.8rem] p-[12px] rounded-[12px] ${
              theme === "light"
                ? "bg-white"
                : theme === "dark"
                ? "bg-light-navy"
                : ""
            } ${
              answerPicked && !isSelected && !isCorrect ? "opacity-50" : ""
            } text-left `}
            onClick={() => {
              const isCorrectSelection = option === correctAnswerText;

              dispatch({ type: "selectAnswer", payload: 1 });
              dispatch({ type: "setSelectedOptionIndex", payload: i });
              dispatch({
                type: "setAnswerStatus",
                payload: isCorrectSelection,
              });
              setOptionClicked(true);
            }}
          >
            <div className="flex items-center gap-[1rem]">
              <div
                className={`w-[40px] h-[40px] flex items-center justify-center text-[18px] text-gray-navy rounded-[6px] uppercase bg-pure-white ${circleColor} `}
              >
                <p>{alphabets[i].letter}</p>
              </div>

              <p>{option}</p>
            </div>

            {answerPicked && (
              <>
                {isSelected && selectedIsCorrect && (
                  <img
                    src={correctIcon}
                    alt="Correct"
                    className="w-[32px] h-[32px]"
                  />
                )}

                {isSelected && !selectedIsCorrect && (
                  <img
                    src={incorrectIcon}
                    alt="Incorrect"
                    className="w-[32px] h-[32px]"
                  />
                )}

                {!isSelected && isCorrect && !selectedIsCorrect && (
                  <img
                    src={correctIcon}
                    alt="Correct"
                    className="w-[32px] h-[32px]"
                  />
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Button({ dispatch, questionIndex, activeQuizData }) {
  return (
    <button
      className="w-[327px] h-[56px] flex items-center justify-center bg-purple font-[400] text-[18px] text-pure-white leading-[100%] capitalize rounded-[1rem] cursor-pointer "
      onClick={() => dispatch({ type: "setCurrentQuestionIndex", payload: 1 })}
    >
      {questionIndex > activeQuizData.length - 1
        ? "submit answer"
        : "next question"}
    </button>
  );
}

function ErrorMessage() {
  return (
    <div className="w-full flex items-center justify-center font-[200] text-center text-[18px] text-red gap-1 ">
      <img src={incorrectIcon} alt="wrong icon" className="w-[32px] h-[32px]" />

      <p>Please select an answer</p>
    </div>
  );
}
