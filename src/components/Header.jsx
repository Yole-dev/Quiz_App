// imported icon images
import moonIconLight from "../assets/images/icon-moon-light.svg";
import moonIconDark from "../assets/images/icon-moon-dark.svg";
import sunIconLight from "../assets/images/icon-sun-light.svg";
import sunIconDark from "../assets/images/icon-sun-dark.svg";

export default function Header({ dispatch, theme }) {
  return (
    <header className="w-full flex items-center justify-between px-[0.7rem] py-[2rem]">
      <div></div>

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
        />

        <div
          className={`w-[48px] h-[28px] flex items-center ${
            theme === "light"
              ? "justify-start"
              : theme === "dark"
              ? "justify-end"
              : ""
          } px-[0.3rem] bg-purple rounded-2xl transform-justify duration-100 ease-in `}
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
        />
      </div>
    </header>
  );
}
