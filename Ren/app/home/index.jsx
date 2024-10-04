import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';  // Importing FontAwesome for icon

const HomeScreen = () => {
  const [customFeeling, setCustomFeeling] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ren</Text>
        <Pressable style={styles.menuIcon}>
          <FontAwesome name="bars" size={hp(3.5)} color={theme.colors.white} />
        </Pressable>
      </View>

      {/* Inspirational Quote Section */}
      <View style={styles.quoteSection}>
        <Text style={styles.inspirationText}>Inspirational Quote or Daily Message</Text>
      </View>

      {/* Mood Input Section */}
      <View style={styles.searchSection}>
        <Text style={styles.questionText}>How are you feeling today?</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={theme.colors.neutral(0.6)}
        />

        {/* Mood Buttons */}
        <View style={styles.moodButtons}>
          {['Tired', 'Nervous', 'Excited', 'Unsure', 'Sad', 'Burdened', 'Angry', 'Happy'].map((mood, index) => (
            <Pressable key={index} style={index % 2 === 0 ? styles.moodButtonAlt : styles.moodButton}>
              <Text style={styles.moodButtonText}>{mood}</Text>
            </Pressable>
          ))}
        </View>

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
            <Text style={styles.promptButtonText}>→</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
  },
  inspirationText: {
    fontSize: hp(2.5),
    color: theme.colors.sageGreen,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
  },
  searchSection: {
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  questionText: {
    fontSize: hp(2.5),
    color: theme.colors.sageGreen,
    marginBottom: hp(2),
    fontWeight: theme.fontWeights.semibold,
  },
  searchInput: {
    width: wp(90),
    height: hp(6),
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: wp(4),
    backgroundColor: theme.colors.white,
    marginBottom: hp(2),
    color: theme.colors.black,
  },
  moodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: hp(2),
  },
  moodButton: {
    backgroundColor: theme.colors.lightGreen, // New light green for variation
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(40),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  moodButtonAlt: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(40),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  moodButtonText: {
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.semibold,
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
  promptButtonText: {
    color: theme.colors.white,
    fontSize: hp(2),
  },
});

export default HomeScreen;
