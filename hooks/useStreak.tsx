import { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { get_exercises, get_user, put_user } from "@/backend/routes";

const StreakContext = createContext<{ streakActive: boolean, setStreakActive: Dispatch<SetStateAction<boolean>>} | undefined>(undefined);

export default function useStreak() {
  return useContext(StreakContext);
}

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [streakActive, setStreakActive] = useState(false);

  useEffect(() => {
    const fetchStreakActive = async () => {
      const exercises = await get_exercises(1);
      const allDone = exercises.every((exercise) => exercise.completed);
      setStreakActive(allDone);
      if (allDone) {
        const user = await get_user(1);
        user.currentStreak = 6;
        await put_user(1, user);
      }
      else {
        const user = await get_user(1);
        user.currentStreak = 5;
        await put_user(1, user);
      }
    };
    fetchStreakActive();
  }, [streakActive])

  return (
    <StreakContext.Provider value={{ streakActive, setStreakActive }}>
      {children}
    </StreakContext.Provider>
  );
}