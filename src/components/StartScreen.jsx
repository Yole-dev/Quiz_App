// immported hooks
import { useEffect, useState } from "react";

// imported images
import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";

const icons = [htmlIcon, cssIcon, jsIcon, accessibilityIcon];
const iconColors = [
  "bg-light-orange",
  "bg-light-green",
  "bg-light-blue",
  "bg-light-purple",
];

export default function StartScreen({ dispatch, theme, quizzes }) {
  const [quizWithIcons, setQuizWithIcons] = useState([]);

  useEffect(() => {
    const enrichedQuizzes = quizzes.map((quiz, i) => ({
      ...quiz,
      icon: icons[i],
      iconColor: iconColors[i],
    }));

    setQuizWithIcons(enrichedQuizzes);
  }, [quizzes]);

  return (
    <section className="w-full flex flex-col gap-[1rem] md:w-[640px] ">
      <p className="font-[100] text-[40px] leading-[100%] md:text-[64px] ">
        Welcome to the <br />
        <span className="font-[500] capitalize ">frontend quiz!</span>
      </p>

      <p
        className={` italic text-[14px] ${
          theme === "light"
            ? "text-gray-navy"
            : theme === "dark"
            ? "text-light-bluish"
            : ""
        } mb-[2rem] leading-[150%] md:text-[20px] `}
      >
        Pick a subject to get started.
      </p>

      <ul className="w-full flex flex-col gap-[2rem]">
        {quizWithIcons.map((quiz) => (
          <button
            className={`h-[64px] flex items-center gap-[1rem] font-[400] text-[18px] ${
              theme === "light"
                ? "bg-white"
                : theme === "dark"
                ? "bg-light-navy"
                : ""
            } px-[0.7rem] shadow-2xl/30 shadow-gray-navy/60 cursor-pointer rounded-[12px] md:h-[80px] md:rounded-[24px] md:text-[28px] `}
            key={quiz?.id}
            onClick={() =>
              dispatch({ type: "selectedQuiz", payload: quiz.title })
            }
          >
            <div
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-[0.5rem]  ${quiz.iconColor} md:w-[56px] md:h-[56px] md:rounded-[0.8rem]  `}
            >
              <img
                src={quiz.icon}
                alt={`${quiz.title} icon`}
                className=" w-[28.57px] h-[28.57px]  md:w-[40px] md:h-[40px] "
              />
            </div>

            {quiz.title}
          </button>
        ))}
      </ul>
    </section>
  );
}
