// imported hooks
import { useEffect, useReducer } from "react";

// imported components
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

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

const initialState = {
  status: "ready",
  theme: "light",
  selectedQuizTitle: "",
  currentQuestionIndex: 0,
  quizzes: [],
  activeQuizData: [],
};

function reducer(state, action) {
  console.log(state);

  switch (action.type) {
    case "quizDataReceived":
      return {
        ...state,
        quizzes: action.payload,
      };

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

    case "selectedQuiz":
      return {
        ...state,
        selectedQuizTitle: action.payload,
        status: `quizActive`,
      };

    case "settingActiveQuizData":
      return {
        ...state,
        activeQuizData: [...action.payload],
      };

    case "setCurrentQuestionIndex":
      if (state.currentQuestionIndex > 9) return;

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + action.payload,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      status,
      theme,
      currentQuestionIndex,
      quizzes,
      selectedQuizTitle,
      activeQuizData,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch("http://localhost:5000/quizzes");
        const data = await response.json();

        console.log(data);

        dispatch({
          type: "quizDataReceived",
          payload: data,
        });
      } catch (error) {
        console.Error("An Error occured while fetching the Quiz data");
      }
    }

    fetchQuizData();
  }, []);

  return (
    <section
      className={`w-svw h-svh ${
        theme === "light "
          ? "bg-pure-white text-navy "
          : theme === "dark"
          ? "bg-light-navy text-white "
          : ""
      } font-rubik `}
    >
      <Header
        dispatch={dispatch}
        theme={theme}
        selectedQuizTitle={selectedQuizTitle}
      />

      <Main>
        {status === "ready" && (
          <StartScreen dispatch={dispatch} theme={theme} quizzes={quizzes} />
        )}

        {status === "quizActive" && (
          <Questions
            theme={theme}
            dispatch={dispatch}
            currentQuestionIndex={currentQuestionIndex}
            quizzes={quizzes}
            activeQuizData={activeQuizData}
            selectedQuizTitle={selectedQuizTitle}
          />
        )}
      </Main>
    </section>
  );
}
