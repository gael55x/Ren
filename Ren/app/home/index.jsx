import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons'; 
import Animated, { FadeInDown, Layout } from 'react-native-reanimated'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = () => {
  const [customFeeling, setCustomFeeling] = useState('');

  return (
    <LinearGradient colors={['#ffe', theme.colors.softBeige]} style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ren</Text>
          <Pressable style={styles.menuIcon}>
            <FontAwesome name="bars" size={hp(3.5)} color={theme.colors.sageGreen} />
          </Pressable>
        </View>

        {/* Inspirational Quote Section */}
        <View style={styles.quoteSection}>
          <Text style={styles.inspirationText}>Your Daily Inspirational Quote or Daily Message</Text>
          <Text style={styles.outputMessage}>"Message will appear here"</Text>
        </View>

        {/* Mood Input Section */}
        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.searchSection}>
          {/* How are you feeling today */}
          <View style={styles.dropdownButton}>
            <Text style={styles.questionText}>How are you feeling today?</Text>
          </View>

          {/* Mood Buttons */}
          <Animated.View entering={FadeInDown.delay(800).springify()} style={styles.moodButtonsContainer}>
            <View style={styles.moodButtons}>
              {[
                { mood: 'Tired', emoji: '😴', color: theme.colors.sageGreen },
                { mood: 'Nervous', emoji: '😰', color: theme.colors.softBeige },
                { mood: 'Excited', emoji: '🤩', color: theme.colors.lightGreen },
                { mood: 'Unsure', emoji: '🤔', color: theme.colors.sageGreen },
                { mood: 'Sad', emoji: '😢', color: theme.colors.softBeige },
                { mood: 'Burdened', emoji: '😓', color: theme.colors.lightGreen },
                { mood: 'Angry', emoji: '😡', color: theme.colors.sageGreen },
                { mood: 'Happy', emoji: '😊', color: theme.colors.lightGreen },
              ].map((item, index) => (
                <Pressable key={index} style={[styles.moodButton, { backgroundColor: item.color }]}>
                  <Text style={styles.moodButtonText}>{item.emoji} {item.mood}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Custom Prompt Section */}
          <View style={styles.customPrompt}>
            <TextInput
              style={styles.customInput}
              placeholder="Custom Prompt Feeling goes here"
              placeholderTextColor={theme.colors.neutral(0.6)}
              value={customFeeling}
              onChangeText={setCustomFeeling}
            />
            <Pressable style={styles.promptButton}>
              <FontAwesome name="chevron-up" size={hp(3.5)} color={theme.colors.white} />
            </Pressable>
          </View>
        </Animated.View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softBeige,
  },
  header: {
    flexDirection: 'row',
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.bold,
  },
  menuIcon: {
    padding: wp(2),
  },
  quoteSection: {
    marginVertical: hp(4),
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  inspirationText: {
    fontSize: hp(2.5),
    color: theme.colors.sageGreen,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
    marginBottom: hp(5),  
  },
  outputMessage: {
    marginTop: hp(1),  
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: wp(5),
    marginTop: hp(8),  
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: hp(2),
    marginBottom: hp(2),
  },
  questionText: {
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.semibold,
  },
  moodButtonsContainer: {
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  moodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: hp(2),
    paddingHorizontal: wp(1),
  },
  moodButton: {
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(40),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  moodButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.semibold,
    fontSize: hp(2.2),
  },
  customPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
  },
  customInput: {
    flex: 1,
    height: hp(6),
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    paddingHorizontal: wp(4),
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  promptButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: wp(3),
    marginLeft: wp(2),
    borderRadius: theme.radius.md,
  },
});

export default HomeScreen;
