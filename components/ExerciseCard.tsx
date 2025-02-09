import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Exercise } from "@/backend/types";
import { toggle_completed } from "@/backend/routes";
import { CircleAlert, CircleCheck } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
  setExercises?: Dispatch<SetStateAction<Exercise[] | null>>;
}

const defaultExercise: Exercise = {
  id: 0,
  videoLink: "",
  title: "Exercise",
  reps: "10 reps",
  intensity: "Medium",
  completed: false,
  instructions: "Do the exercise",
};

export const ExerciseCard = ({
  exercise = defaultExercise,
  onClick,
  setExercises,
}: ExerciseCardProps) => {
  const handlePress = async () => {
    setExercises!(
      (exercises) =>
        exercises?.filter((e) =>
          e.id === exercise.id ? { ...e, completed: !e.completed } : e
        ) || null
    );
    toggle_completed(1, exercise.id);
  };

  return (
    <TouchableOpacity onPress={onClick} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{exercise.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.reps}>{exercise.reps}</Text>
            <View
              style={[
                styles.intensity,
                exercise.intensity === "Easy"
                  ? styles.easy
                  : exercise.intensity === "Medium"
                  ? styles.medium
                  : styles.hard,
              ]}
            >
              <Text style={styles.intensityText}>{exercise.intensity}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 8 }}>
            <TouchableOpacity onPress={handlePress}>
              <View style={styles.status}>
                {setExercises !== undefined ? (
                  exercise.completed ? (
                    <CircleCheck size={24} color="#4ade80" />
                  ) : (
                    <CircleAlert size={24} color="#ff4040" />
                  )
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <Text style={[styles.icon, styles.iconContainer]}>{">"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset height
    shadowOpacity: 0.2, // Increased shadow opacity
    shadowRadius: 12, // Increased shadow radius
    borderColor: "#E0F7FA",
    borderWidth: 1,
    overflow: "hidden",
    cursor: "pointer",
    marginVertical: 8, // Reduced margin above and below the card
  },
  content: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reps: {
    fontSize: 14,
    color: "#757575",
  },
  intensity: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  easy: {
    backgroundColor: "#E0F7FA",
    color: "#00796B",
  },
  medium: {
    backgroundColor: "#B2DFDB",
    color: "#00796B",
  },
  hard: {
    backgroundColor: "#80CBC4",
    color: "#00796B",
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  iconContainer: {},
  icon: {
    fontSize: 24,
  },
  status: {
    transform: [{ translateY: 2 }],
    marginRight: 8,
  },
});
