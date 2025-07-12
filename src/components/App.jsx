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
import moonIconLight from "../assets/images/icon-moon-light.svg";
import moonIconDark from "../assets/images/icon-moon-dark.svg";
import sunIconLight from "../assets/images/icon-sun-light.svg";
import sunIconDark from "../assets/images/icon-sun-dark.svg";

import correctIcon from "../assets/images/icon-correct.svg";
import incorrectIcon from "../assets/images/icon-incorrect.svg";
import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";

const initialState = {
  status: "",
  theme: "light",
  quizzes: [],
  selectedQuiz: [],
};

function reducer(state, action) {
  return console.log(state);
}

export default function App() {
  const [{ status, theme, quizzes, selectedQuiz }, dispatch] = useReducer(
    useReducer,
    initialState
  );
  return (
    <section className={`w-svh h-full bg-light-bluish`}>
      <Header />
    </section>
  );
}
