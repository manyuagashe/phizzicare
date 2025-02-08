import { motion } from "framer-motion";

interface ExerciseCardProps {
  title: string;
  duration?: string;
  intensity?: "Easy" | "Medium" | "Hard";
  onClick?: () => void;
}

export const ExerciseCard = ({ title, duration = "30 min", intensity = "Medium", onClick }: ExerciseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-white rounded-xl shadow-sm border border-mint/10 overflow-hidden cursor-pointer transition-colors hover:border-mint/20"
      onClick={onClick}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{duration}</span>
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${intensity === "Easy" ? "bg-mint-light text-mint-dark" :
                intensity === "Medium" ? "bg-mint/10 text-mint-dark" :
                "bg-mint/20 text-mint-dark"}`}>
              {intensity}
            </div>
          </div>
        </div>
        <div className="text-mint hover:text-mint-dark transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};