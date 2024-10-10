// components/ProfileSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { hp, wp } from '../utils/common';
import { theme } from '../constants/theme';

const ProfileSection = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    marginBottom: hp(1),
    fontSize: hp(2.5),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.sageGreen,
  },
  sectionBody: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    paddingVertical: hp(1),
    elevation: 2,
  },
});

export default ProfileSection;
