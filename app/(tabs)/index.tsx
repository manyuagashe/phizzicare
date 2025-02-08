import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";
import { NavigationBar } from "@/components/NavigationBar";

const exercises = [
  { title: "Morning Yoga", duration: "20 min", intensity: "Easy" as const },
  { title: "HIIT Workout", duration: "30 min", intensity: "Hard" as const },
  { title: "Evening Stretch", duration: "15 min", intensity: "Medium" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-light to-white pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-mint/10">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Current Streak</h2>
            <div className="text-3xl font-bold text-gray-800">7 Days</div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Today's Exercises</h1>
          <p className="text-gray-500 mb-6">Complete these exercises to maintain your streak!</p>
          
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ExerciseCard {...exercise} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default Index;