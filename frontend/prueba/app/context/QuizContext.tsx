'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOption: string | boolean | null;
  showFeedback: boolean;
}

type QuizAction =
  | { type: 'NEXT_QUESTION'; correct: boolean }
  | { type: 'SET_SELECTED_OPTION'; option: string | boolean }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  selectedOption: null,
  showFeedback: false,
};

const QuizContext = createContext<{ state: QuizState; dispatch: React.Dispatch<QuizAction> } | undefined>(undefined);

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

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
