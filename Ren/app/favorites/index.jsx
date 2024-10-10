import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const favoriteQuotes = ['Quote 1', 'Quote 2', 'Quote 3', 'Quote 4', 'Quote 5']; // Sample data

  return (
    <LinearGradient
      colors={['#f4f2ec', theme.colors.softBeige]} // Using the same gradient from ProfileScreen for consistency
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerAction}>
          <Ionicons name="arrow-back" size={hp(3)} color={theme.colors.sageGreen} />
        </Pressable>
        <Text style={styles.headerTitle}>Favorites Quotes</Text>
        <View style={styles.headerAction} />
      </View>

      {/* Favorite Quotes List */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.favoriteTitle}>Your Favorite Quotes / Messages</Text>
        
        {favoriteQuotes.map((quote, index) => (
          <Pressable key={index} style={styles.quoteItem}>
            <Text style={styles.quoteText}>{quote}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(5),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: 'transparent',
  },
  headerAction: {
    width: wp(10),
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: hp(3),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  favoriteTitle: {
    fontSize: hp(2.5),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.semibold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  quoteItem: {
    backgroundColor: theme.colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
    borderRadius: theme.radius.md,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
