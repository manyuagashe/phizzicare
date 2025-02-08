import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { get_users, get_user, add_user, get_exercises, get_exercise, mark_completed, get_history } from '@/backend/routes.ts'

export default function ProfileView() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={{ uri: 'https://source.unsplash.com/800x600/?water' }} style={{ width: '100%', height: 200 }} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.flexCol}>
          <ThemedText style={styles.titleText}>
            Megan Taylor
          </ThemedText>
          <ThemedText style={styles.infoText}>
            username: USE API
          </ThemedText>
          <ThemedText style={styles.infoText}>
            email: USE API
          </ThemedText>
          <ThemedText style={styles.infoText}>
            BioInfo: USE APi
          </ThemedText>

          <ThemedView style={styles.flexRow}>
            <ThemedText style={styles.streakText}>
              Streak: Use API
            </ThemedText>
            <ThemedText style={styles.streakText}>
              Max Streak: Use 
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
  },
}); 