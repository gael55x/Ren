import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated'; 
import { hp, wp } from '../utils/common';
import { theme } from '../constants/theme';
import { Pressable } from 'react-native';
const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/welcomescreen.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      {/* linear gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
        <LinearGradient
            colors={['rgba(252,252,252,0)', 'rgba(251,251,251,0.3)', 'white', 'white']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
        />
        <View style={styles.contentContainer}>
        <Text style={styles.title}>
            Ren
        </Text>
        <Text style={styles.punchline}>
        Your Daily Dose of Inspiration.
        </Text>
        <Pressable style={styles.startButton}>
            <Text style={styles.startText}>Get Started</Text>
        </Pressable>
        </View>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100), 
    height: hp(65), 
    bottom: 0, 
    position: 'absolute', 
  }, 
  contentContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'flex-end', 
    gap: 14 
  }, 
  title: {
    fontSize: hp(7), 
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.bold,
  }, 
  punchline: {
    fontSize: hp(2), 
    letterSpacing: 1, 
    marginBottom: 10, 
    fontWeight: theme.fontWeights.medium,
  }, 
  startButton: {
    marginBottom: 50, 
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15, 
    paddingHorizontal: 90, 
    borderRadius: theme.radius.xl, 
    borderCurve: 'continuous',
  }, 
  startText: {
    color: theme.colors.white, 
    fontSize: hp(3), 
    fontWeight: theme.fontWeights.medium, 
    letterSpacing: 1
  }
});

export default WelcomeScreen;
