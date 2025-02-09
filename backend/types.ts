interface Exercise {
  id: number;
  name: string;
  videoLink: string;
  instructions: string;
  completed: boolean;
}

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  height: number;
  weight: number;
  currentStreak: number;
  longestStreak: number;
  exercises: Exercise[];
  history: Exercise[];
}

export {Exercise, User};