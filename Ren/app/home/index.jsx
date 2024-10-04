import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  const [customFeeling, setCustomFeeling] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ren</Text>
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
            <Pressable key={index} style={styles.moodButton}>
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
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.bold,
  },
  quoteSection: {
    marginVertical: hp(5),
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
    marginTop: hp(3),
  },
  questionText: {
    fontSize: hp(2),
    color: theme.colors.sageGreen,
    marginBottom: hp(2),
  },
  searchInput: {
    width: wp(90),
    height: hp(6),
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    paddingHorizontal: wp(4),
    color: theme.colors.black,
    marginBottom: hp(2),
  },
  moodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(40),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  moodButtonText: {
    color: theme.colors.white,
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
