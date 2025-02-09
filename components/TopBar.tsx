import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { get_user } from "@/backend/routes";
import { useEffect, useState } from "react";
import { User } from "@/backend/types";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FilledFire from "@/assets/icons/filled_fire";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OutlineFire from "@/assets/icons/fire_outline";
import useStreak from "@/hooks/useStreak";
import { CircleAlert } from "lucide-react";

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const streakActive = useStreak()?.streakActive;
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const fetchUser = async () => {
      const user = await get_user(1);
      setUser(user);
    };
    fetchUser();
  }, []);

  const renderRightContent = () => {
    if (pathname === "/") {
      return (
        <Image
          source={require("@/assets/images/finallogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      );
    }

    return (
      <View style={styles.streak}>
        <Text style={styles.streakText}>{user?.currentStreak} days</Text>
        {streakActive ? (
          <FilledFire
            width={23}
            height={23}
            style={styles.fire}
            strokeWidth={2}
          />
        ) : (
          <View>
            <OutlineFire
              width={23}
              height={23}
              style={styles.fire}
              strokeWidth={2}
            />
            <CircleAlert size={10} color="red" style={styles.alert as any} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Image
          source={{ uri: user?.image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
      {renderRightContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: Colors.light.surface,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.surfaceBorder,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "700",
  },
  fire: {
    marginLeft: 4,
  },
  alert: {
    position: "absolute",
    top: -5,
    left: 20,
  },
  logo: {
    width: 100,
    height: 40,
  }
});