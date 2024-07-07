import Quiz from "@/app/components/Quiz";
import { QuizProvider } from "@/app/context/QuizContext";
import { QuizQuestion } from "@/app/types/ClassItem";

const questions: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is the solution to the equation 2x + 3 = 7?',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    answer: 'x = 2',
  },
  {
    id: 2,
    type: 'true-false',
    question: 'The equation x^2 - 4 = 0 has two real solutions.',
    answer: true,
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'Which of the following is a quadratic equation?',
    options: ['x + 2 = 5', 'x^2 + 2x + 1 = 0', '2x - 3 = 7', 'x/2 + 1 = 3'],
    answer: 'x^2 + 2x + 1 = 0',
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'What is the slope of the line given by the equation y = 3x + 4?',
    options: ['3', '4', '1/3', '-3'],
    answer: '3',
  },
  {
    id: 5,
    type: 'true-false',
    question: 'The function f(x) = 2x^2 + 3x - 5 is a linear function.',
    answer: false,
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'What is the y-intercept of the line y = -2x + 3?',
    options: ['-2', '3', '-3', '2'],
    answer: '3',
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Solve for x: 5x - 3 = 2x + 6.',
    options: ['x = 3', 'x = -3', 'x = 2', 'x = 0'],
    answer: 'x = 3',
  },
  {
    id: 8,
    type: 'true-false',
    question: 'The expression (x + 2)(x - 2) is equivalent to x^2 - 4.',
    answer: true,
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'What is the greatest common factor (GCF) of 12 and 15?',
    options: ['3', '5', '6', '1'],
    answer: '3',
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: 'If f(x) = 2x + 1, what is f(3)?',
    options: ['5', '7', '6', '9'],
    answer: '7',
  },
  {
    id: 11,
    type: 'true-false',
    question: 'The equation x^2 + 1 = 0 has real solutions.',
    answer: false,
  },
  {
    id: 12,
    type: 'multiple-choice',
    question: 'What is the value of the discriminant of the quadratic equation 2x^2 - 4x + 2 = 0?',
    options: ['0', '4', '8', '16'],
    answer: '0',
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'What is the solution to the inequality 3x - 5 < 1?',
    options: ['x < 2', 'x > 2', 'x < 1', 'x > 1'],
    answer: 'x < 2',
  },
  {
    id: 14,
    type: 'true-false',
    question: 'The system of equations y = 2x + 3 and y = -x + 1 has one solution.',
    answer: true,
  },
  {
    id: 15,
    type: 'multiple-choice',
    question: 'If 4x = 12, what is the value of x?',
    options: ['2', '3', '4', '5'],
    answer: '3',
  }
];


const QuizPage = () => {
  return (
    <QuizProvider>
      <main className="flex justify-center max-w-[1500px] mx-auto px-6 pb-6">
        <Quiz questions={questions} themeColor="#14b8a6" />
      </main>
    </QuizProvider>
  );
};

export default QuizPage;
