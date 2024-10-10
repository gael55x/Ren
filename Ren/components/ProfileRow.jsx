import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hp, wp } from '../utils/common';
import { theme } from '../constants/theme';

const ProfileRow = ({ label, value, onPress }) => {
  return (
    <Pressable style={styles.rowWrapper} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.rowSpacer} />
        {value && <Text style={styles.rowValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={hp(2.5)} color={theme.colors.sageGreen} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    paddingHorizontal: wp(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: theme.colors.grayBG,
  },
  rowLabel: {
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
  },
  rowSpacer: {
    flex: 1,
  },
  rowValue: {
    fontSize: hp(2.2),
    color: theme.colors.darkBeige,
  },
});

export default ProfileRow;
