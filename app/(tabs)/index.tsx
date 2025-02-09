import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { motion } from 'framer-motion';
import { ExerciseCard } from '@/components/ExerciseCard';

const exercises = [
  { title: "Morning Yoga", duration: "20 min", intensity: "Easy" as const },
  { title: "HIIT Workout", duration: "30 min", intensity: "Hard" as const },
  { title: "Evening Stretch", duration: "15 min", intensity: "Medium" as const },
];

const Index = () => {
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
            <Text style={styles.streakValue}>7 Days</Text>
          </View>

          <Text style={styles.header}>Today's Exercises</Text>
          <Text style={styles.subheader}>Complete these exercises to maintain your streak!</Text>

          <View style={styles.exerciseList}>
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
          </View>
        </motion.div>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF4', // mint-light
    paddingBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  motionContainer: {
    width: '100%',
    maxWidth: 400,
  },
  streakContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)', // React Native does not support backdrop-blur directly, you may need a library for this effect
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#A7F3D0', // mint/10
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280', // gray-500
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937', // gray-800
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937', // gray-800
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    color: '#6B7280', // gray-500
    marginBottom: 16,
  },
  exerciseList: {
    width: '100%',
  },
});

export default Index;