import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Switch,
} from 'react-native';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerAction}>
          <Ionicons name="arrow-back" size={hp(3)} color={theme.colors.sageGreen} />
        </Pressable>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.headerAction} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={[styles.section, { paddingTop: hp(2) }]}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.sectionBody}>
            <Pressable style={styles.profile} onPress={() => { /* Handle Edit Profile */ }}>
              <Image
                source={require('../../assets/images/amolong_profile.png')}
                style={styles.profileAvatar}
              />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>Gaille Amolong</Text>
                <Text style={styles.profileEmail}>gaille@example.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={hp(3)} color={theme.colors.sageGreen} />
            </Pressable>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.sectionBody}>
            {/* Language Option */}
            <Pressable style={styles.rowWrapper} onPress={() => { /* Handle Language Change */ }}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>English</Text>
                <Ionicons name="chevron-forward" size={hp(2.5)} color={theme.colors.sageGreen} />
              </View>
            </Pressable>

            {/* Theme Option */}
            <Pressable style={styles.rowWrapper} onPress={() => { /* Handle Theme Change */ }}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Theme</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>Light</Text>
                <Ionicons name="chevron-forward" size={hp(2.5)} color={theme.colors.sageGreen} />
              </View>
            </Pressable>

            {/* Email Notifications */}
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: theme.colors.grayBG, true: theme.colors.sageGreen }}
                  thumbColor={theme.colors.white}
                />
              </View>
            </View>

            {/* Push Notifications */}
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: theme.colors.grayBG, true: theme.colors.sageGreen }}
                  thumbColor={theme.colors.white}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <View style={styles.sectionBody}>
            <Pressable style={styles.rowWrapper} onPress={() => { /* Handle Contact Us */ }}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <Ionicons name="chevron-forward" size={hp(2.5)} color={theme.colors.sageGreen} />
              </View>
            </Pressable>

            <Pressable style={styles.rowWrapper} onPress={() => { /* Handle Help & Support */ }}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Help & Support</Text>
                <View style={styles.rowSpacer} />
                <Ionicons name="chevron-forward" size={hp(2.5)} color={theme.colors.sageGreen} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <Pressable style={[styles.rowWrapper, styles.logoutButton]} onPress={() => { /* Handle Logout */ }}>
              <Text style={[styles.rowLabel, styles.logoutText]}>Log Out</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.appVersion}>App Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  /** Container */
  container: {
    flex: 1,
    backgroundColor: theme.colors.softBeige,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(5),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: theme.colors.white,
    elevation: 2,
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
  /** Content */
  content: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  /** Section */
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    marginBottom: hp(1),
    fontSize: hp(2),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.sageGreen,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionBody: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    paddingVertical: hp(1),
    elevation: 2,
  },
  /** Profile */
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  profileAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    marginRight: wp(4),
  },
  profileBody: {
    flex: 1,
  },
  profileName: {
    fontSize: hp(2.5),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.sageGreen,
  },
  profileEmail: {
    fontSize: hp(2),
    color: theme.colors.darkBeige,
  },
  /** Row */
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
    marginRight: wp(2),
  },
  /** Logout */
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 0,
  },
  logoutText: {
    color: theme.colors.errorRed || '#DC2626',
    fontWeight: theme.fontWeights.semibold,
  },
  /** App Version */
  appVersion: {
    marginTop: hp(2),
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.darkBeige,
  },
});

export default ProfileScreen;
