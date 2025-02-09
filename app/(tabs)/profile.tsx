import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { get_user } from '@/backend/routes';
import { User } from '@/backend/types';
import { useEffect, useState } from 'react';

async function getUserInfo(userID: number) {
  try {
    const response: User = await get_user(userID);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
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
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: CurrentUser?.image || 'https://source.unsplash.com/400x400/?portrait' }} 
            style={styles.profileImage} 
          />
        </View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Text style={styles.titleText}>
              {CurrentUser ? `${CurrentUser.firstName} ${CurrentUser.lastName}` : "Loading.."}
            </Text>
            <Text style={styles.usernameText}>
              @{CurrentUser ? `${CurrentUser.username}` : "Loading.."}
            </Text>
            <Text style={styles.emailText}>
              {CurrentUser ? `${CurrentUser.email}` : "Loading.."}
            </Text>
            
            {/* <View style={styles.bioContainer}>
              <Text style={styles.bioLabel}>Bio Info</Text>
              <Text style={styles.bioText}>
                {CurrentUser ? `Height: ${CurrentUser.height}\nWeight: ${CurrentUser.weight}` : "Loading.."}
              </Text>
            </View> */}

            <View style={styles.streakContainer}>

            <View style={styles.streakBox}>
                <Text style={styles.streakLabel}>Height (cms)</Text>
                <Text style={styles.streakValue}>
                  {CurrentUser ? `${CurrentUser.height}` : "Loading.."} Days
                </Text>
              </View>

              <View style={styles.streakBox}>
                <Text style={styles.streakLabel}>Weight (kgs)</Text>
                <Text style={styles.streakValue}>
                  {CurrentUser ? `${CurrentUser.weight}` : "Loading.."} Days
                </Text>
                </View>
              </View>

              <View style={styles.streakContainer}>

              <View style={styles.streakBox}>
                <Text style={styles.streakLabel}>Current Streak</Text>
                <Text style={styles.streakValue}>
                  {CurrentUser ? `${CurrentUser.currentStreak}` : "Loading.."} Days
                </Text>
              </View>
              
              <View style={styles.streakBox}>
                <Text style={styles.streakLabel}>Best Streak</Text>
                <Text style={styles.streakValue}>
                  {CurrentUser ? `${CurrentUser.longestStreak}` : "Loading.."} Days
                </Text>
              </View>

              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F0FFF4',
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    alignSelf: 'center', // Center horizontally
    marginTop: 50,
    marginBottom: 15,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#A7F3D0',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0FFF4',
    paddingBottom: 20,
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0FFF4',
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

    marginBottom: 24,
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

