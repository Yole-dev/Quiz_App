// imported hooks
import { useEffect, useReducer } from "react";

// imported database
import quizData from "../data/data.json";

// imported components
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Loader from "./Loader";

// imported background images
import lightPatternMobile from "../assets/images/pattern-background-mobile-light.svg";
import darkPatternMobile from "../assets/images/pattern-background-mobile-dark.svg";
import lightPatternTablet from "../assets/images/pattern-background-tablet-light.svg";
import darkPatternTablet from "../assets/images/pattern-background-tablet-dark.svg";
import lightPatternDesktop from "../assets/images/pattern-background-desktop-light.svg";
import darkPatternDesktop from "../assets/images/pattern-background-desktop-dark.svg";

const initialState = {
  status: "loading",
  questionStatus: "sortingQuestions",
  theme: "light",
  selectedQuizTitle: "",
  selectedOptionIndex: null,
  answeredQuestions: 0,
  answerPicked: false,
  correctAnswer: null,
  error: false,
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
        status: "ready",
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

    case "questionsReady":
      return {
        ...state,
        questionStatus: "questionsSorted",
      };

    case "selectAnswer":
      if (state.answerPicked === true)
        return {
          ...state,
        };
      return {
        ...state,
        answeredQuestions: state.answeredQuestions + action.payload,
        answerPicked: true,
        error: state.error === true ? false : state.error,
      };

    case "setAnswerStatus":
      return {
        ...state,
        correctAnswer: action.payload,
      };

    case "setSelectedOptionIndex":
      return {
        ...state,
        selectedOptionIndex: action.payload,
      };

    case "setCurrentQuestionIndex":
      if (state.answeredQuestions !== state.currentQuestionIndex + 1)
        return { ...state, error: true };
      if (state.currentQuestionIndex >= state.activeQuizData.length)
        return { ...state };

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + action.payload,
        answerPicked: false,
        correctAnswer: null,
        selectedOptionIndex: null,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      status,
      questionStatus,
      theme,
      currentQuestionIndex,
      quizzes,
      selectedOptionIndex,
      selectedQuizTitle,
      activeQuizData,
      error,
      correctAnswer,
      answerPicked,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const quizzesData = quizData.quizzes;

    setTimeout(() => {
      dispatch({
        type: "quizDataReceived",
        payload: quizzesData,
      });
    }, 3000);
  }, []);

  return (
    <section
      className={`w-svw h-svh ${
        theme === "light"
          ? "bg-pure-white text-navy"
          : theme === "dark"
          ? "bg-light-navy text-white"
          : ""
      } font-rubik `}
    >
      <Header
        dispatch={dispatch}
        theme={theme}
        selectedQuizTitle={selectedQuizTitle}
      />

      <Main>
        {status === "loading" && <Loader> fetching quiz data </Loader>}

        {status === "ready" && (
          <StartScreen dispatch={dispatch} theme={theme} quizzes={quizzes} />
        )}

        {status === "quizActive" && (
          <Questions
            theme={theme}
            questionStatus={questionStatus}
            dispatch={dispatch}
            currentQuestionIndex={currentQuestionIndex}
            quizzes={quizzes}
            activeQuizData={activeQuizData}
            selectedOptionIndex={selectedOptionIndex}
            selectedQuizTitle={selectedQuizTitle}
            error={error}
            correctAnswer={correctAnswer}
            answerPicked={answerPicked}
          />
        )}
      </Main>
    </section>
  );
}
