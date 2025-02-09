import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { motion } from "framer-motion";
import {Link, router} from 'expo-router';

interface ExerciseCardProps {
  id?: number;
  title: string;
  reps?: string;
  intensity?: "Easy" | "Medium" | "Hard";
  videoLink?: string;
  instructions?: string;
  completed?: boolean;

  onClick?: () => void;
}

export const ExerciseCard = ({ id, title, reps = "30 min", intensity = "Medium", onClick }: ExerciseCardProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.reps}>{reps}</Text>
            <View style={[
              styles.intensity,
              intensity === "Easy" ? styles.easy :
              intensity === "Medium" ? styles.medium :
              styles.hard
            ]}>
              <Text style={styles.intensityText}>{intensity}</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text style={[styles.icon, styles.iconContainer]}>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset height
    shadowOpacity: 0.2, // Increased shadow opacity
    shadowRadius: 12, // Increased shadow radius
    borderColor: '#E0F7FA',
    borderWidth: 1,
    overflow: 'hidden',
    cursor: 'pointer',
    marginVertical: 8, // Reduced margin above and below the card
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reps: {
    fontSize: 14,
    color: '#757575',
  },
  intensity: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  easy: {
    backgroundColor: '#E0F7FA',
    color: '#00796B',
  },
  medium: {
    backgroundColor: '#B2DFDB',
    color: '#00796B',
  },
  hard: {
    backgroundColor: '#80CBC4',
    color: '#00796B',
  },
  intensityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  iconContainer: {},
  icon: {
    fontSize: 24,
  },
});