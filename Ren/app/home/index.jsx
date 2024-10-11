import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert,
  Keyboard, 
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react'; 
import { hp, wp } from '../../utils/common';
import { theme } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [customFeeling, setCustomFeeling] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [outputMessage, setOutputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [typingText, setTypingText] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const customInputRef = useRef(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load favorites.', e);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      const jsonValue = JSON.stringify(newFavorites);
      await AsyncStorage.setItem('@favorites', jsonValue);
    } catch (e) {
      console.error('Failed to save favorites.', e);
    }
  };

  const toggleFavorite = () => {
    let message = outputMessage.trim();
    let updatedFavorites = [...favorites];

    if (!isFavorite && message) {
      updatedFavorites.push(message);
      setIsFavorite(true);
      showToast('Marked as favorite');
    } else {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== message);
      setIsFavorite(false);
      showToast('Removed from favorites');
    }

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const sendMessageToBackend = async (message) => {
    try {
      setIsTyping(true);
      setUserPrompt(message);
      setShowButtons(false);
      setShowPrompt(true);
      setLoading(true);
      setIsFavorite(false);

      Keyboard.dismiss();

      setTimeout(async () => {
        const response = await fetch('http://10.0.2.2:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        const data = await response.json();
        setLoading(false);

        if (data.response && data.response.length > 0) {
          const responses = data.response[0];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];

          typingEffect(`Ren: ${randomResponse}`);
        } else {
          setOutputMessage("I'm sorry, but I don't have a response for that question.");
          setIsTyping(false);
          resetUIAfterResponse();
        }
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setOutputMessage('Error connecting to the server.');
      setIsTyping(false);
      resetUIAfterResponse();
    }
  };

  const typingEffect = (text) => {
    setTypingText('');
    let i = 0;

    const typingInterval = setInterval(() => {
      setTypingText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);
        setOutputMessage(text);
        setIsTyping(false);
        resetUIAfterResponse();

        setIsFavorite(favorites.includes(text.trim()));
      }
    }, 20);
  };

  const resetUIAfterResponse = () => {
    setTimeout(() => {
      setShowButtons(true);
      setShowPrompt(false);
    }, 1000);
  };

  const menuItems = [
    { name: 'Your Profile', icon: 'person-outline', route: 'profile' },
    {
      name: 'Your Favorite Messages',
      icon: 'heart-outline',
      route: 'favorites',
      params: { refresh: Math.random() },
    },
    { name: 'Settings', icon: 'settings-outline' },
    { name: 'Notifications', icon: 'notifications-outline' },
    { name: 'Logout', icon: 'log-out-outline' },
  ];

  const moodItems = [
    { mood: 'Tired', emoji: '😴', color: theme.colors.sageGreen, message: "I'm feeling tired" },
    { mood: 'Nervous', emoji: '😰', color: theme.colors.darkBeige, message: "I'm feeling nervous" },
    { mood: 'Excited', emoji: '🤩', color: theme.colors.lightGreen, message: "I'm excited" },
    { mood: 'Unsure', emoji: '🤔', color: theme.colors.sageGreen, message: "I'm feeling unsure" },
    { mood: 'Sad', emoji: '😢', color: theme.colors.darkBeige, message: "I'm feeling sad" },
    { mood: 'Burdened', emoji: '😓', color: theme.colors.lightGreen, message: "I'm feeling burdened" },
    { mood: 'Angry', emoji: '😡', color: theme.colors.sageGreen, message: "I'm feeling angry" },
    { mood: 'Happy', emoji: '😊', color: theme.colors.lightGreen, message: "I'm feeling happy" },
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

      {/* Inspirational Quote Section */}
      <View style={styles.quoteSection}>
        <Text style={styles.inspirationText}>Your Daily Inspiration</Text>
        {showPrompt && (
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.userPrompt}>
            <Text style={styles.userPromptText}>You: {userPrompt}</Text>
          </Animated.View>
        )}
        <Text style={styles.outputMessage}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.sageGreen} />
          ) : isTyping ? typingText : outputMessage}
        </Text>
        {!isTyping && outputMessage && (
          <Pressable onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={hp(3)}
              color={theme.colors.sageGreen}
              style={styles.favoriteIcon}
            />
          </Pressable>
        )}
      </View>

      {/* Mood Input Section */}
      {showButtons && (
        <Animated.View entering={FadeInDown.delay(500).springify()} exiting={FadeOut} style={styles.searchSection}>
          <View style={styles.dropdownButton}>
            <Text style={styles.questionText}>How are you feeling today?</Text>
          </View>

          {/* Mood Buttons */}
          <Animated.View entering={FadeInDown.delay(800).springify()} style={styles.moodButtonsContainer}>
            <View style={styles.moodButtons}>
              {moodItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={[styles.moodButton, { backgroundColor: item.color }]}
                  onPress={() => sendMessageToBackend(item.message)}
                >
                  <Text style={styles.moodButtonText}>
                    {item.emoji} {item.mood}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Custom Prompt Section */}
          <View style={styles.customPrompt}>
            <TextInput
              ref={customInputRef}
              style={styles.customInput}
              placeholder="Custom Prompt Feeling goes here"
              placeholderTextColor={theme.colors.neutral(0.6)}
              value={customFeeling}
              onChangeText={setCustomFeeling}
              onFocus={() => {
                customInputRef.current.focus();
              }}
              autoFocus={false}
            />
            <Pressable
              style={styles.promptButton}
              onPress={() => {
                if (customFeeling.trim()) {
                  sendMessageToBackend(customFeeling);
                  setCustomFeeling('');
                  Keyboard.dismiss(); // Dismiss keyboard after sending
                }
              }}
            >
              <FontAwesome name="chevron-up" size={hp(4)} color={theme.colors.white} />
            </Pressable>
          </View>
        </Animated.View>
      )}

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
                  router.push({ pathname: item.route });
                }
              }}
            >
              <Ionicons
                name={item.icon}
                size={hp(3)}
                color={theme.colors.sageGreen}
                style={styles.menuIconItem}
              />
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
  inspirationText: {
    fontSize: hp(2.8),
    color: theme.colors.sageGreen,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
    marginBottom: hp(4),
  },
  userPrompt: {
    marginBottom: hp(2),
  },
  userPromptText: {
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
  },
  outputMessage: {
    marginTop: hp(2),
    fontSize: hp(2.2),
    color: theme.colors.sageGreen,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginTop: hp(2),
  },
  searchSection: {
    paddingHorizontal: wp(5),
    marginTop: hp(11),
  },
  dropdownButton: {
    alignItems: 'center',
    padding: hp(1),
    marginBottom: hp(2),
  },
  questionText: {
    fontSize: hp(2.5),
    color: theme.colors.sageGreen,
    fontWeight: theme.fontWeights.semibold,
  },
  moodButtonsContainer: {
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  moodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: hp(2),
    paddingHorizontal: wp(1),
  },
  moodButton: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    borderRadius: theme.radius.md,
    width: wp(38),
    alignItems: 'center',
    margin: wp(1),
  },
  moodButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
    fontSize: hp(2),
  },
  customPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
  },
  customInput: {
    flex: 1,
    height: hp(6),
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: wp(4),
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  promptButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: wp(3),
    marginLeft: wp(2),
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
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

export default HomeScreen;
