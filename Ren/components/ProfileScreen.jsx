import React, { useState } from 'react';
import { View, ScrollView, Image, Switch, Text } from 'react-native';
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import ProfileRow from '../../components/ProfileRow';
import ProfileSection from '../../components/ProfileSection';

const ProfileScreen = () => {
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <LinearGradient colors={['#f4f2ec', theme.colors.softBeige]} style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <Header title="Your Profile Screen" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: wp(5), paddingBottom: hp(5) }}>
        {/* Profile Section */}
        <ProfileSection title="Account">
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp(2) }}>
            <Image source={require('../../assets/images/amolong_profile.png')} style={{ width: wp(15), height: wp(15), borderRadius: wp(7.5), marginRight: wp(4) }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: hp(2.5), fontWeight: theme.fontWeights.semibold, color: theme.colors.sageGreen }}>Gaille Amolong</Text>
              <Text style={{ fontSize: hp(2), color: theme.colors.darkBeige }}>gaille@example.com</Text>
            </View>
          </View>
        </ProfileSection>

        {/* Bio Section */}
        <Text style={{ fontSize: hp(1.8), color: theme.colors.darkBeige, marginTop: hp(0.1), marginBottom: hp(1), fontStyle: 'italic', textAlign: 'center' }}>
          "A Software Engineer who needs inspiration."
        </Text>

        {/* Favorite Inspirations Section */}
        <ProfileRow label="Your Favorite Inspirations" onPress={() => router.push('/favorites')} />

        {/* Preferences Section */}
        <ProfileSection title="Preferences">
          <ProfileRow label="Language" value="English" />
          <ProfileRow label="Theme" value="Light" />
          <ProfileRow label="Email Notifications">
            <Switch value={emailNotifications} onValueChange={setEmailNotifications} trackColor={{ false: theme.colors.grayBG, true: theme.colors.sageGreen }} thumbColor={theme.colors.white} />
          </ProfileRow>
          <ProfileRow label="Push Notifications">
            <Switch value={pushNotifications} onValueChange={setPushNotifications} trackColor={{ false: theme.colors.grayBG, true: theme.colors.sageGreen }} thumbColor={theme.colors.white} />
          </ProfileRow>
        </ProfileSection>

        {/* Resources Section */}
        <ProfileSection title="Resources">
          <ProfileRow label="Contact Us" />
          <ProfileRow label="Help & Support" />
        </ProfileSection>

        {/* Logout */}
        <ProfileRow label="Log Out" />
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;
