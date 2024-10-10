import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { hp, wp } from '../utils/common';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const Header = ({ title, onBack, onMenu }) => {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.headerAction}>
          <Ionicons name="arrow-back" size={hp(3)} color={theme.colors.sageGreen} />
        </Pressable>
      ) : (
        <View style={styles.headerAction} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {onMenu ? (
        <Pressable onPress={onMenu} style={styles.headerAction}>
          <Ionicons name="menu" size={hp(3.5)} color={theme.colors.sageGreen} />
        </Pressable>
      ) : (
        <View style={styles.headerAction} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
