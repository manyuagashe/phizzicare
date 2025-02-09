interface Exercise {
  id: number;
  name: string;
  videoLink: string;
  instructions: string;
  completed: boolean;
}

interface History {
  [date: string]: Exercise[];
}

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  height: number;
  weight: number;
  currentStreak: number;
  longestStreak: number;
  exercises: Exercise[];
  history: History;
}

export { Exercise, User, History };
