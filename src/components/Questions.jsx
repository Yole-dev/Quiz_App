import { useEffect } from "react";

export default function Questions({
  theme,
  dispatch,
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
        Question X of {activeQuizData.length}
      </p>
      <Question activeQuizData={activeQuizData} />
      <Options activeQuizData={activeQuizData} theme={theme} />
    </div>
  );
}

function Question({ activeQuizData }) {
  return (
    <p className="font-[500] text-left text-[20px] leading-[120%]">
      {activeQuizData.map((questions) => questions.question)}
    </p>
  );
}

function Options({ activeQuizData, theme }) {
  const alphabets = [
    { id: 0, letter: "a" },
    { id: 1, letter: "b" },
    { id: 2, letter: "c" },
    { id: 3, letter: "d" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-[1rem] ">
      {activeQuizData[0].options.map((option, i) => (
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
