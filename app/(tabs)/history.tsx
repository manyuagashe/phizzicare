import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useEffect, useState } from "react";
import { History } from "@/backend/types";
import { get_history } from "@/backend/routes";

export default function TabTwoScreen() {
  const [history, setHistory] = useState<History | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await get_history(1);
      setHistory(history);
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.motionContainer}
        >
          <Text style={styles.header}>Exercise History</Text>
          <Text style={styles.subheader}>
            Checkout your exercise history below!
          </Text>

          <View style={styles.exerciseList}>
            {history &&
              Object.entries(history).map(([date, exercises], index) => (
                <View key={date} style={styles.dateSection}>
                  <Text style={styles.dateHeader}>{date}</Text>
                  {exercises.map((exercise, exerciseIndex) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: exerciseIndex * 0.1 }}
                    >
                      <ExerciseCard {...exercise} />
                    </motion.div>
                  ))}
                </View>
              ))}
          </View>
        </motion.div>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingBottom: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  motionContainer: {
    width: "100%",
    maxWidth: 400,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937", // gray-800
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    color: "#6B7280", // gray-500
    marginBottom: 16,
  },
  exerciseList: {
    width: "100%",
  },
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937", // gray-800
    marginBottom: 8,
  },
});