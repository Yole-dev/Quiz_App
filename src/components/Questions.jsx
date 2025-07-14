import { useState, useEffect } from "react";

export default function Questions({
  theme,
  dispatch,
  currentQuestionIndex,
  quizzes,
  selectedQuizTitle,
  activeQuizData,
}) {
  useEffect(() => {
    const quizData = quizzes.find((quiz) => quiz.title === selectedQuizTitle);
    dispatch({ type: "settingActiveQuizData", payload: quizData.questions });
  }, [quizzes, selectedQuizTitle, dispatch]);

  console.log(activeQuizData);

  return (
    <div className="w-full flex flex-col items-center gap-[1rem] px-[1rem]">
      <p
        className={`w-full font-[200] text-left text-[14px] italic ${
          theme === "light"
            ? "text-gray-navy"
            : theme === "dark"
            ? "text-light-bluish"
            : ""
        } `}
      >
        Question {currentQuestionIndex + 1} of {activeQuizData.length}
      </p>
      <Question
        activeQuizData={activeQuizData}
        currentQuestionIndex={currentQuestionIndex}
      />
      <Options
        activeQuizData={activeQuizData}
        theme={theme}
        currentQuestionIndex={currentQuestionIndex}
      />
      <SubmitButton dispatch={dispatch} />
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

function Options({ activeQuizData, currentQuestionIndex, theme }) {
  const alphabets = [
    { id: 0, letter: "a" },
    { id: 1, letter: "b" },
    { id: 2, letter: "c" },
    { id: 3, letter: "d" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-[1rem] ">
      {activeQuizData[currentQuestionIndex]?.options.map((option, i) => (
        <button
          key={i}
          className={` w-[327px] h-[64px] flex items-center gap-[0.8rem] p-[12px] rounded-[12px] ${
            theme === "light"
              ? "bg-white"
              : theme === "dark"
              ? "bg-light-navy"
              : ""
          } shadow-sm/50 shadow-light-navy/50 `}
        >
          <div
            className={`w-[40px] h-[40px] flex items-center justify-center text-[18px] text-gray-navy rounded-[6px] uppercase bg-pure-white `}
          >
            {alphabets[i].letter}
          </div>

          {option}
        </button>
      ))}
    </div>
  );
}

function SubmitButton({ dispatch }) {
  return (
    <button
      className="w-full h-[64px] cursor-pointer "
      onClick={() => dispatch({ type: "setCurrentQuestionIndex", payload: 1 })}
    >
      Submit Answer
    </button>
  );
}
