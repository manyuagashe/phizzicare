import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { motion } from 'framer-motion';
import { ExerciseCard } from '@/components/ExerciseCard';
import { NavigationBar } from '@/components/NavigationBar';
import { get_users, get_user, add_user, get_exercises, get_exercise, mark_completed, get_history } from '@/backend/routes'
import { User } from '@/backend/types'
import { useEffect, useState } from 'react';


const exercises = [
  { title: "Loading.", duration: "20 min", intensity: "Easy" },
  { title: "Loading..", duration: "30 min", intensity: "Hard" },
  { title: "Loading...", duration: "15 min", intensity: "Medium" },
];

async function getUserInfo (userID: number) {
  try {
    const response: User = await get_user(userID)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}

const Index = () => {
  const [CurrentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo(1);
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

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
            <Text style={styles.streakValue}>{CurrentUser ? `${CurrentUser.currentStreak}` : "Loading.."} Days</Text>
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

          <View style={{ height: 4 }} /> {/* Reduced space below the header */}

          <Text style={styles.subheader}>Complete these exercises to maintain your streak!</Text>


          <View style={styles.exerciseList}>
            { CurrentUser === null ? (
              <Text>Loading...</Text>
            ) : (
              CurrentUser.exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ExerciseCard 
                    title={exercise.title} // Map 'name' to 'title'
                    reps={exercise.reps} // Map 'duration' to 'duration'
                    intensity={exercise.intensity}
                  />
                </motion.div>
              ))
            )}
          
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