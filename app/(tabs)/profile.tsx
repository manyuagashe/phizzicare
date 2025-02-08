import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileView() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedView /* VBox for all the items on homepage*/className = "flex grow flex-col">
          <ThemedText className = "flex font-red-500 flex-max place-content-center text-4xl py-9">
            Megan Taylor
          </ThemedText>
          <ThemedText className="py-5">
            username: USE API
          </ThemedText>
          <ThemedText className="py-5">
            email: USE API
          </ThemedText>
          <ThemedText className="py-5">
            BioInfo: USE API
          </ThemedText>

          <ThemedView className="flex-row mt-20">
            <ThemedText /*bottom bar goes below this one*/
              className = "flex grow place-content-center rounded-full bg-teal-500 border-teal-500 border flex-max py-2 mx-1"
            >
              Streak: Use API
            </ThemedText>
            <ThemedText /*bottom bar goes below this one*/
              className = "flex grow place-content-center rounded-full bg-teal-500 border-teal-500 border flex-max py-2 mx-1"
            >
              Max Streak: Use API
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
