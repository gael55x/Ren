import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation, router, useLocalSearchParams } from 'expo-router';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useLocalSearchParams(); // Fetch favorites passed via navigation

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuItems = [
    { name: 'Your Profile', icon: 'person-outline', route: 'profile' },
    { name: 'Your Favorite Messages', icon: 'heart-outline', route: 'favorites' },
    { name: 'Settings', icon: 'settings-outline' },
    { name: 'Notifications', icon: 'notifications-outline' },
    { name: 'Logout', icon: 'log-out-outline' },
  ];

  return (
    <LinearGradient colors={['#ffe', theme.colors.softBeige]} style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ren</Text>
        <Pressable style={styles.menuIcon} onPress={() => setIsMenuVisible(true)}>
          <FontAwesome name="bars" size={hp(3.5)} color={theme.colors.sageGreen} />
        </Pressable>
      </View>

      {/* Favorite Quotes List */}
      <View style={styles.quoteSection}>
        <Text style={styles.favoriteTitle}>Your Favorite Quotes / Messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {favorites && favorites.length > 0 ? (
          favorites.map((quote, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(index * 100)}
              style={styles.animatedQuoteItem}
            >
              <Pressable style={styles.quoteItem}>
                <Ionicons name="heart" size={hp(2.5)} color={theme.colors.sageGreen} style={styles.icon} />
                <Text style={styles.quoteText}>{quote}</Text>
              </Pressable>
            </Animated.View>
          ))
        ) : (
          <Text style={styles.noFavorites}>You don't have any favorites yet!</Text>
        )}
      </ScrollView>

      {/* Navigation Menu Modal */}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setIsMenuVisible(false)}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.menuModal}
      >
        <View style={styles.menuContainer}>
          <Text style={styles.profileName}>Gaille Amolong</Text>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => {
                setIsMenuVisible(false);
                if (item.route) {
                  router.push(item.route);
                }
              }}
            >
              <Ionicons name={item.icon} size={hp(3)} color={theme.colors.sageGreen} style={styles.menuIconItem} />
              <Text style={styles.menuItemText}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
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
    zIndex: 1,
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
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  favoriteTitle: {
    fontSize: hp(2.8),
    color: theme.colors.sageGreen,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
    marginBottom: hp(4),
  },
  content: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  animatedQuoteItem: {
    marginBottom: hp(2), 
  },
  quoteItem: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4),
    borderRadius: theme.radius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    justifyContent: 'flex-start',
    marginBottom: hp(1.5),
    width: '100%', 
    flexGrow: 1, 
    flexShrink: 1, 
  },
  quoteText: {
    fontSize: hp(2.5), 
    color: theme.colors.sageGreen,
    textAlign: 'left', 
    marginLeft: wp(3),
    flexShrink: 1, 
  },
  icon: {
    marginRight: wp(2),
  },
  noFavorites: {
    fontSize: hp(2),
    color: theme.colors.sageGreen,
    textAlign: 'center',
  },
  menuModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: theme.colors.white,
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
    width: wp(75),
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  profileName: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.sageGreen,
    marginBottom: hp(4),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  menuIconItem: {
    marginRight: wp(4),
  },
  menuItemText: {
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
  },
});

export default FavoritesScreen;
