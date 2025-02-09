import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";
import { get_user, toggle_completed } from "@/backend/routes";
import { Exercise, User } from "@/backend/types";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import useStreak from "@/hooks/useStreak";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FilledFire from "@/assets/icons/filled_fire";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OutlineFire from "@/assets/icons/fire_outline";
import { CircleAlert, ArrowLeft } from "lucide-react";

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
  const [user, setUser] = useState<User | null>(null);
  const { streakActive, setStreakActive } = useStreak() || {};

  useEffect(() => {
    async function fetchExercises() {
      const userData = await getUserInfo(1);
      setUser(userData);
      setExercises(userData?.exercises || null);
      if (setStreakActive) {
        setStreakActive(
          userData?.exercises.every((exercise) => exercise.completed) ?? false
        );
      }
    }
    fetchExercises();
  }, [exercises, setStreakActive]);

  const openModal = (card: React.SetStateAction<Exercise | null>) => {
    setModalVisible(true);
    setSelectedCard(card);
  };

  const getStreakMessage = () => {
    if (!user) return "";
    if (streakActive) {
      return "Awesome! You've completed all exercises for today!";
    }
    return "Complete all of today's exercises to maintain your streak!";
  };

  const handleToggle = async () => {
    if (!selectedCard || !exercises) return;
    setExercises!((prev) =>
      prev!.filter((e) =>
        e.id === selectedCard.id ? { ...e, completed: !e.completed } : e
      )
    );
    toggle_completed(1, selectedCard.id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.motionContainer}
        >
          <View style={styles.streakContainer}>
            <Text style={styles.streakLabel}>Current Streak</Text>
            <View style={styles.streakContent}>
              <Text style={styles.streakValue}>
                {user?.currentStreak || 0} days
              </Text>
              {streakActive ? (
                <FilledFire
                  width={30}
                  height={30}
                  style={styles.streakFire}
                  strokeWidth={2}
                />
              ) : (
                <View>
                  <OutlineFire
                    width={30}
                    height={30}
                    style={styles.streakFire}
                    strokeWidth={2}
                  />
                  <CircleAlert
                    size={12}
                    color="red"
                    style={styles.streakAlert}
                  />
                </View>
              )}
            </View>
            <Text style={styles.streakMessage}>{getStreakMessage()}</Text>
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
                    onClick={() => openModal(exercise)}
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
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <ArrowLeft size={24} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                <Text style={styles.modalText}>
                  {selectedCard.instructions}
                </Text>

                <View style={styles.gifContainer}>
                  {selectedCard.videoLink ? (
                    <Image
                      source={{ uri: selectedCard.videoLink }}
                      style={styles.gif}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.noGifText}>
                      No demonstration available
                    </Text>
                  )}
                </View>

                {selectedCard.completed === true ? (
                  <TouchableOpacity
                    style={{...styles.markDoneButton, backgroundColor: "#ff746c"}}
                    onPress={() => {
                      handleToggle();
                    }}
                  >
                    <Text style={styles.closeButtonText}>Mark As Incomplete</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.markDoneButton}
                    onPress={() => {
                      handleToggle();
                    }}
                  >
                    <Text style={styles.closeButtonText}>Mark As Done</Text>
                  </TouchableOpacity>
                )}
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
    alignItems: "center",
  },
  streakLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  streakContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginRight: 8,
  },
  streakFire: {
    marginLeft: 4,
  },
  streakAlert: {
    position: "absolute",
    top: -5,
    left: 25,
  },
  streakMessage: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
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
    width: "90%",
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
    width: "100%",
    height: 200,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  noGifText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  markDoneButton: {
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 10,
    width: "90%",
    backgroundColor: "#10B981",
    borderRadius: 5,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "700",
  },
});

export default Index;
