import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TopBar from '@/components/TopBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <TopBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="exercises"
          options={{
            title: 'exercises',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'history',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
                name="profile"
                options={{
                  title: 'profile',
                  tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
              />
      </Tabs>
    </>
  );
}
