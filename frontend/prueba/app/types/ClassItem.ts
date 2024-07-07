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
  