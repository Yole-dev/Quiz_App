// imported icon images
import moonIconLight from "../assets/images/icon-moon-light.svg";
import moonIconDark from "../assets/images/icon-moon-dark.svg";
import sunIconLight from "../assets/images/icon-sun-light.svg";
import sunIconDark from "../assets/images/icon-sun-dark.svg";

import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";

export default function Header({ dispatch, theme, selectedQuizTitle }) {
  return (
    <header className="w-full flex items-center justify-between px-[1rem] py-[2rem] md:w-[90%] md:px-0 md:py-[3rem] xl:w-[1160px] ">
      <div className="flex items-center gap-[0.8rem] md:gap-[1.3rem] ">
        {selectedQuizTitle !== "" && (
          <>
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

            <p className="font-[400] text-[18px] md:text-[28px] ">
              {selectedQuizTitle}
            </p>
          </>
        )}
      </div>

      <div className="w-[128px] h-[28px] flex items-center gap-[1rem] ">
        <img
          src={
            theme === "light"
              ? sunIconDark
              : theme === "dark"
              ? sunIconLight
              : ""
          }
          alt=""
          className="md:w-[24px] md:h-[24px]"
        />

        <div
          className={`w-[48px] h-[28px] flex items-center ${
            theme === "light"
              ? "justify-start"
              : theme === "dark"
              ? "justify-end"
              : ""
          } px-[0.3rem] bg-purple rounded-2xl transform-justify cursor-pointer `}
          onClick={() => dispatch({ type: "switchTheme" })}
        >
          <div className="w-[20px] h-[20px] bg-white rounded-full "></div>
        </div>

        <img
          src={
            theme === "light"
              ? moonIconDark
              : theme === "dark"
              ? moonIconLight
              : ""
          }
          alt=""
          className="md:w-[24px] md:h-[24px]"
        />
      </div>
    </header>
  );
}
