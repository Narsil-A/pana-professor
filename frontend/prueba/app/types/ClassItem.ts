export interface ClassItem {
    id: string;
    title: string;
    description: string;
    category: string;
    price_per_session: string;
    duration_in_minutes: number;
    max_students: number;
    subject: string;
    image_url: string;
    video_url?: string;
    professor: {
      id: string;
      name: string;
      avatar_url?: string;
    };
  }
  


  export interface QuizQuestion {
    id: number;
    type: 'multiple-choice' | 'true-false';
    question: string;
    options?: string[]; // Only for multiple-choice questions
    answer: string | boolean; // The correct answer
  }