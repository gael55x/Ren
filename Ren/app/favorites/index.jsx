import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Your Favorite Messages will appear here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
