import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { get_user } from "@/backend/routes";
import { useEffect, useState } from "react";
import { User } from "@/backend/types";
import { useRouter } from "expo-router";

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await get_user(1);
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image
          source={{ uri: user?.image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
      <View style={styles.streak}>
        <Text style={styles.streakText}>{user?.currentStreak}</Text>
        <Text style={styles.streakText}>🔥</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F0FFF4",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
