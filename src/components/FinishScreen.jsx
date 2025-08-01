import { useEffect } from "react";
import Loader from "./Loader";

// imported images
import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";

export default function FinishScreen({
  dispatch,
  status,
  theme,
  activeQuizData,
  numberOfCorrectAnswers,
  selectedQuizTitle,
}) {
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "displayResult", payload: "resultsReady" });
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {status === "quizFinished" && <Loader>preparing your results</Loader>}

      {status === "resultsReady" && (
        <div className=" w-full flex flex-col items-center gap-[2rem] md:w-[640px] md:gap-[4rem] xl:w-[1157px] xl:flex-row xl:justify-between xl:items-start xl:gap-0 ">
          <p className=" w-full flex flex-col font-[200] text-left text-[40px] leading-[100%] md:text-[64px] ">
            Quiz completed
            <span className="font-[500]">You scored... </span>
          </p>

          <div className=" w-full flex flex-col items-center gap-[1rem] md:gap-[2rem] ">
            <div
              className={`w-full flex flex-col items-center gap-[1rem] py-[1.5rem] ${
                theme === "light"
                  ? "bg-white"
                  : theme === "dark"
                  ? "bg-light-navy"
                  : ""
              } rounded-[12px] md:rounded-[24px] py-[2.5rem] `}
            >
              <div className="flex items-center gap-[1rem]">
                <div
                  className={`w-[40px] h-[40px] flex items-center justify-center rounded-[0.5rem] ${
                    selectedQuizTitle === "HTML"
                      ? "bg-light-orange"
                      : selectedQuizTitle === "CSS"
                      ? "bg-light-green"
                      : selectedQuizTitle === "JavaScript"
                      ? "bg-light-blue"
                      : selectedQuizTitle === "Accessibility"
                      ? "bg-light-purple"
                      : ""
                  }  md:w-[56px] md:h-[56px] `}
                >
                  <img
                    src={`${
                      selectedQuizTitle === "HTML"
                        ? htmlIcon
                        : selectedQuizTitle === "CSS"
                        ? cssIcon
                        : selectedQuizTitle === "JavaScript"
                        ? jsIcon
                        : selectedQuizTitle === "Accessibility"
                        ? accessibilityIcon
                        : ""
                    }`}
                    alt={`${selectedQuizTitle} icon`}
                    className=" w-[28.57px] h-[28.57px]  md:w-[40px] md:h-[40px] "
                  />
                </div>
                <p className="capitalize font-[500] text-[18px] leading-[100%] md:text-[28px] ">
                  {selectedQuizTitle}
                </p>
              </div>

              <p className="capitalize font-[500] text-[88px] md:text-[144px]  ">
                {numberOfCorrectAnswers}
              </p>

              <p
                className={`font-[200] text-[18px] ${
                  theme === "light"
                    ? "text-gray-navy"
                    : theme === "dark"
                    ? "text-light-bluish"
                    : ""
                } leading-[100%] md:text-[24px] `}
              >
                out of {activeQuizData.length}
              </p>
            </div>

            <button
              className="w-full h-[56px] flex items-center justify-center bg-purple font-[400] text-[18px] text-pure-white leading-[100%] capitalize rounded-[12px] cursor-pointer md:h-[92px] md:text-[28px] "
              onClick={() => {
                dispatch({ type: "restartQuiz", payload: "ready" });
              }}
            >
              play again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
