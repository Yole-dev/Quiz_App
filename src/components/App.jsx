// imported hooks
import { useReducer } from "react";

// imported components
import Header from "./Header";

// imported background images
import lightPatternMobile from "../assets/images/pattern-background-mobile-light.svg";
import darkPatternMobile from "../assets/images/pattern-background-mobile-dark.svg";
import lightPatternTablet from "../assets/images/pattern-background-tablet-light.svg";
import darkPatternTablet from "../assets/images/pattern-background-tablet-dark.svg";
import lightPatternDesktop from "../assets/images/pattern-background-desktop-light.svg";
import darkPatternDesktop from "../assets/images/pattern-background-desktop-dark.svg";

// imported icon images
import correctIcon from "../assets/images/icon-correct.svg";
import incorrectIcon from "../assets/images/icon-incorrect.svg";
import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";

const initialState = {
  status: "ready",
  theme: "light",
  selectedQuizTitle: "",
  quizQuestions: [],
};

function reducer(state, action) {
  console.log(state);

  switch (action.type) {
    case "switchTheme":
      return {
        ...state,
        theme:
          state.theme === "light"
            ? "dark"
            : state.theme === "dark"
            ? "light"
            : "",
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ status, theme, quizzes, selectedQuizTitle }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <section
      className={`w-svw h-svh ${
        theme === "light" ? "bg-white" : theme === "dark" ? "bg-light-navy" : ""
      }  `}
    >
      <Header dispatch={dispatch} theme={theme} />
    </section>
  );
}
