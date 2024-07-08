'use client';

import React from 'react';
import { useQuiz } from '@/app/context/QuizContext';
import { useRouter } from 'next/navigation';
import { QuizQuestion } from '@/app/types/ClassItem';

interface QuizProps {
  questions: QuizQuestion[];
  themeColor?: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, themeColor = '#4A90E2' }) => {
  const { state, dispatch } = useQuiz();
  const router = useRouter();
  const currentQuestion = questions[state.currentQuestionIndex];

  // Handle option selection
  const handleOptionChange = (option: string | boolean) => {
    dispatch({ type: 'SET_SELECTED_OPTION', option });
  };

  // Handle next question action
  const handleNextQuestion = () => {
    const correct = state.selectedOption === currentQuestion.answer;
    dispatch({ type: 'NEXT_QUESTION', correct });
  };

  // Handle quiz finish action
  const handleFinishQuiz = () => {
    router.push('/');
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(((state.currentQuestionIndex + 1) / questions.length) * 100);

  return (
    <div className="quiz-wrapper">
      <h1 className="quiz-title">Quiz</h1>
      <div className="quiz-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%`, background: themeColor }} />
        {state.currentQuestionIndex < questions.length ? (
          <div className="question-container">
            <h2 className="question">{currentQuestion.question}</h2>
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="options">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option-bar ${
                      state.selectedOption !== null
                        ? option === currentQuestion.answer
                          ? 'correct'
                          : option === state.selectedOption
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    onMouseEnter={(e) => {
                      if (state.selectedOption === null) {
                        e.currentTarget.classList.add('hovering');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (state.selectedOption === null) {
                        e.currentTarget.classList.remove('hovering');
                      }
                    }}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option}
                  </label>
                ))}
              </div>
            )}
            {currentQuestion.type === 'true-false' && (
              <div className="options">
                {['True', 'False'].map((option, index) => (
                  <label
                    key={index}
                    className={`option-bar ${
                      state.selectedOption !== null
                        ? (option === 'True' && currentQuestion.answer === true) ||
                          (option === 'False' && currentQuestion.answer === false)
                          ? 'correct'
                          : option === state.selectedOption
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    onMouseEnter={(e) => {
                      if (state.selectedOption === null) {
                        e.currentTarget.classList.add('hovering');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (state.selectedOption === null) {
                        e.currentTarget.classList.remove('hovering');
                      }
                    }}
                    onClick={() => handleOptionChange(option === 'True')}
                  >
                    {option}
                  </label>
                ))}
              </div>
            )}
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={state.selectedOption === null}
              style={{ background: themeColor }}
            >
              Next
            </button>
            {state.showFeedback && (
              <div className={`feedback ${state.selectedOption === currentQuestion.answer ? 'correct' : 'incorrect'}`}>
                {state.selectedOption === currentQuestion.answer ? 'Correct!' : 'Incorrect!'}
              </div>
            )}
          </div>
        ) : (
          <div className="score-container">
            <h2>Your Score: {state.score}/{questions.length}</h2>
            <button
              onClick={handleFinishQuiz}
              className="finish-button"
              style={{ background: themeColor }}
            >
              Finish Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function to darken a color
function darken(color: string, percentage: number): string {
  const f = parseInt(color.slice(1), 16),
    t = percentage < 0 ? 0 : 255,
    p = percentage < 0 ? percentage * -1 : percentage,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

export default Quiz;

