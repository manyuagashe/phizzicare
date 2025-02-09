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
      headerBackgroundColor={{ light: '#F0FFF4', dark: '#1D3D47' }}
      headerImage={<Image source={{ uri: 'https://source.unsplash.com/800x600/?water' }} style={{ width: '100%', height: 200 }} />}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.profileContainer}>
          <ThemedText style={styles.titleText}>
            {CurrentUser ? `${CurrentUser.firstName} ${CurrentUser.lastName}` : "Loading.."}
          </ThemedText>
          <ThemedText style={styles.usernameText}>
            @{CurrentUser ? `${CurrentUser.username}` : "Loading.."}
          </ThemedText>
          <ThemedText style={styles.emailText}>
            {CurrentUser ? `${CurrentUser.email}` : "Loading.."}
          </ThemedText>
          
          <ThemedView style={styles.bioContainer}>
            <ThemedText style={styles.bioLabel}>Bio Info</ThemedText>
            <ThemedText style={styles.bioText}>
              {CurrentUser ? `Height: ${CurrentUser.height}\nWeight: ${CurrentUser.weight}` : "Loading.."}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.streakContainer}>
            <ThemedView style={styles.streakBox}>
              <ThemedText style={styles.streakLabel}>Current Streak</ThemedText>
              <ThemedText style={styles.streakValue}>
                {CurrentUser ? `${CurrentUser.currentStreak}` : "Loading.."} Days
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.streakBox}>
              <ThemedText style={styles.streakLabel}>Best Streak</ThemedText>
              <ThemedText style={styles.streakValue}>
                {CurrentUser ? `${CurrentUser.longestStreak}` : "Loading.."} Days
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF4',
    paddingBottom: 20,
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  bioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  streakBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignItems: 'center',
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
});