import { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { get_exercises } from "@/backend/routes";

const StreakContext = createContext<{ streakActive: boolean, setStreakActive: Dispatch<SetStateAction<boolean>>} | undefined>(undefined);

export default function useStreak() {
  return useContext(StreakContext);
}

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [streakActive, setStreakActive] = useState(false);

  useEffect(() => {
    const fetchStreakActive = async () => {
      const exercises = await get_exercises(1);
      setStreakActive(exercises.every((exercise) => exercise.completed));
    };
    fetchStreakActive();
  }, [streakActive])

  return (
    <StreakContext.Provider value={{ streakActive, setStreakActive }}>
      {children}
    </StreakContext.Provider>
  );
}