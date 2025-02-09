import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { motion } from 'framer-motion';
import { ExerciseCard } from '@/components/ExerciseCard';
import { NavigationBar } from '@/components/NavigationBar';

const exercises = [
  { title: "10 Ankle Circles", reps: "x3", intensity: "Easy" as const },
  { title: "12 Ankle Pumps", reps: "x3", intensity: "Hard" as const },
  { title: "3 Alphabet Traces", reps: "x3", intensity: "Medium" as const },
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

          {/* Actual logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/finallogo.png')} // Update the path to your actual logo file
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.header}>Today's Exercises</Text>

          <View style={{ height: 4 }} /> {/* Reduced space below the header */}

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
      <NavigationBar />
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 250, // Increased logo size
    height: 250, // Increased logo size
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
    marginBottom: 8, // Reduced margin below the subheader
  },
  exerciseList: {
    width: '100%',
  },
});

export default Index;