'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

// Define the state interface for the quiz
interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOption: string | boolean | null;
  showFeedback: boolean;
}

// Define the possible actions for the quiz reducer
type QuizAction =
  | { type: 'NEXT_QUESTION'; correct: boolean } // Action to go to the next question
  | { type: 'SET_SELECTED_OPTION'; option: string | boolean } // Action to set the selected option
  | { type: 'RESET_QUIZ' }; // Action to reset the quiz

// Initial state for the quiz
const initialState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  selectedOption: null,
  showFeedback: false,
};

// Create the context for the quiz state and dispatch function
const QuizContext = createContext<{ state: QuizState; dispatch: React.Dispatch<QuizAction> } | undefined>(undefined);

// Reducer function to handle state changes based on dispatched actions
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        score: action.correct ? state.score + 1 : state.score,
        selectedOption: null,
        showFeedback: false,
      };
    case 'SET_SELECTED_OPTION':
      return {
        ...state,
        selectedOption: action.option,
        showFeedback: true,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
};

// Provider component to wrap the application and provide the quiz context
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
