import axios from 'axios';
import { AxiosResponse } from 'axios';

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
  height: number;
  weight: number;
  currentStreak: number;
  longestStreak: number;
  exercises: Exercise[];
  history: Exercise[];
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

async function get_users(): Promise<User[]> {
  const response: AxiosResponse<User[]> = await api.get('/users');
  return response.data;
}

async function get_user(id: number): Promise<User> {
  const response: AxiosResponse<User> = await api.get(`/users/${id}`);
  return response.data;
}

async function add_user(user: User): Promise<User> {
  const response: AxiosResponse<User> = await api.post('/users', user);
  return response.data;
}

async function get_exercises(id: number): Promise<Exercise[]> {
  const user: User = await get_user(id)
  return user.exercises;
}

async function get_exercise(user_id: number, exercise_id: number): Promise<Exercise> {
  const user: User = await get_user(user_id);
  const exercise = user.exercises.find((exercise) => exercise.id === exercise_id);
  if (exercise === undefined) {
    throw new Error('Exercise not found');
  }
  return exercise;
}

async function mark_completed(user_id: number, exercise_id: number): Promise<void> {
  const user: User = await get_user(user_id);
  const exercise = user.exercises.find((exercise) => exercise.id === exercise_id);
  if (exercise === undefined) {
    throw new Error('Exercise not found');
  }
  exercise.completed = true;
  await api.put(`/users/${user_id}`, user);
}

async function get_history(user_id: number): Promise<Exercise[]> {
  const user: User = await get_user(user_id);
  return user.history;
}

export { get_users, get_user, add_user, get_exercises, get_exercise, mark_completed, get_history };