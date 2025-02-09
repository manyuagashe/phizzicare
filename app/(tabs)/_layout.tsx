import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Home, History, User } from "lucide-react";
import TopBar from "@/components/TopBar";

export default function TabLayout() {
  return (
    <>
      <TopBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.activeNav,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            default: {
              backgroundColor: Colors["light"].surface,
              height: 55,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Exercises",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => <History size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: "camera",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
