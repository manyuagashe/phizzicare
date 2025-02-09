import { ScrollView, View, Text, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useEffect, useState } from "react";
import { Exercise } from "@/backend/types";
import { get_exercise, get_history } from "@/backend/routes";
import { ArrowLeft } from "lucide-react";

type PopulatedHistory = {
  [date: string]: Exercise[];
};

export default function TabTwoScreen() {
  const [history, setHistory] = useState<PopulatedHistory | null>(null);
  const [selectedCard, setSelectedCard] = useState<Exercise | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const populated: PopulatedHistory = {};
      const history = await get_history(1);
      for (const [date, ids] of Object.entries(history)) {
        populated[date] = await Promise.all(
          ids.map(async (id) => await get_exercise(1, id))
        );
      }
      setHistory(populated);
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
          <View>
            <Text style={styles.header}>Exercise History</Text>
            <Text style={styles.subheader}>Check out your past exercises</Text>
          </View>

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
                      <ExerciseCard 
                      exercise={exercise}
                      onClick={() => {setSelectedCard(exercise); setModalVisible(true);}}
                      />
                    </motion.div>
                  ))}
                </View>
              ))}
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
              </View>
            </View>
          </Modal>
        )}
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
    fontWeight: '700',
    color: '#1F2937', // gray-800
    marginBottom: 4, // Reduced margin below the header
  },
  subheader: {
    fontSize: 14,
    color: '#6B7280', // gray-500
    marginBottom: 12, // Reduced margin below the subheader
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
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
});
