import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";
import { get_user } from "@/backend/routes";
import { Exercise, User } from "@/backend/types";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import useStreak from "@/hooks/useStreak";

async function getUserInfo(userID: number) {
  try {
    const response: User = await get_user(userID);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Index = () => {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Exercise | null>(null);
  const setStreakActive = useStreak()?.setStreakActive;

  useEffect(() => {
    async function fetchExercises() {
      const user = await getUserInfo(1);
      setExercises(user?.exercises || null);
      if (setStreakActive) {
        setStreakActive(
          user?.exercises.every((exercise) => exercise.completed) ?? false
        );
      }
    }
    fetchExercises();
  }, [exercises]);

  const openModel = (card: React.SetStateAction<Exercise | null>) => {
    setModalVisible(true);
    setSelectedCard(card);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.motionContainer}
        >
          {/* Actual logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/finallogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.header}>Today's Exercises</Text>
            <Text style={styles.subheader}>
              Complete these exercises to maintain your streak!
            </Text>
          </View>

          <View style={styles.exerciseList}>
            {exercises === null ? (
              <Text>Loading...</Text>
            ) : (
              exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ExerciseCard
                    exercise={exercise}
                    setExercises={setExercises}
                    onClick={() => {
                      openModel(exercise);
                    }}
                  />
                </motion.div>
              ))
            )}
          </View>
        </motion.div>
        {selectedCard && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                <Text style={styles.modalText}>
                  {selectedCard.instructions}
                </Text>

                {/* Updated GIF handling */}
                <View style={styles.gifContainer}>
                  {selectedCard.videoLink ? (
                    <Image
                      source={{ uri: selectedCard.videoLink }}
                      style={styles.gif}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.noGifText}>No demonstration available</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

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
  streakContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  exerciseList: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  gifContainer: {
    width: '100%',
    height: 200,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  noGifText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1F2937",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "700",
  },
});

export default Index;