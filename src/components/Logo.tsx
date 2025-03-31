import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../img/logo.jpg')}
        style={styles.circularImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#2c7a51',
  },
  circularImage: {
    width: '100%',
    height: '100%',
  },
});

export default Logo;
