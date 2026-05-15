import React, {useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';
import Colors from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textAnim = useRef(new Animated.Value(30)).current; // Move text upwards

  useEffect(() => {
    // Run animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 20,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 0, // Move text up
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      <Animated.Image
        source={require('../../../assets/images/logo.png')} // Update with your logo
        style={[
          styles.logo,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}
      />
      <Animated.Text
        style={[
          styles.appName,
          {opacity: fadeAnim, transform: [{translateY: textAnim}]},
        ]}>
        Way Made
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 20,
  },
});

export default SplashScreen;
