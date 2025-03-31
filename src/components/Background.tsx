import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Círculos de fondo con diferentes opacidades */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />

      {/* Contenido encima del fondo */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000, // Se asegura de que los elementos sean círculos
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    top: height * 0.05,
    left: width * 0.1,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    top: height * 0.25,
    left: width * 0.7,
  },
  circle3: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
    top: height * 0.55,
    left: width * 0.25,
  },
  circle4: {
    width: 400,
    height: 400,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    top: height * 0.75,
    left: width * 0.6,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

export default Background;
