import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { get_users, get_user, add_user, get_exercises, get_exercise, mark_completed, get_history } from '@/backend/routes'
import { User } from '@/backend/types'
import { useEffect, useState } from 'react';

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

export default function ProfileView() {
  const [CurrentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo(1);
      setCurrentUser(user);
    }
    fetchUser();
  }, []);



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={{ uri: 'https://source.unsplash.com/800x600/?water' }} style={{ width: '100%', height: 200 }} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.flexCol}>
          <ThemedText style={styles.titleText}>
            {CurrentUser ? `${CurrentUser.firstName} ${CurrentUser.lastName}` : "Loading.."}
          </ThemedText>
          <ThemedText style={styles.infoText}>
            username: {CurrentUser ? `${CurrentUser.username}` : "Loading.."}
          </ThemedText>
          <ThemedText style={styles.infoText}>
            email: {CurrentUser ? `${CurrentUser.email}` : "Loading.."}
          </ThemedText>
          <ThemedText style={styles.infoText}>
            BioInfo: {CurrentUser ? `
                height: ${CurrentUser.height}
                weight: ${CurrentUser.weight}` : "Loading.."}
          </ThemedText>

          <ThemedView style={styles.flexRow}>
            <ThemedText style={styles.streakText}>
              Streak: {CurrentUser ? `${CurrentUser.currentStreak}` : "Loading.."}
            </ThemedText>
            <ThemedText style={styles.streakText}>
              Max Streak: {CurrentUser ? `${CurrentUser.longestStreak}` : "Loading.."} 
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
  },
  flexCol: {
    flex: 1,
    flexDirection: 'column',
  },
  titleText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 32,
    paddingVertical: 36,
  },
  infoText: {
    paddingVertical: 20,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 80,
  },
  streakText: {
    flex: 1,
    textAlign: 'center',
    borderRadius: 9999,
    backgroundColor: '#38b2ac',
    borderColor: '#38b2ac',
    borderWidth: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset height
    shadowOpacity: 0.2, // Increased shadow opacity
    shadowRadius: 12, // Increased shadow radius
  },
}); 

