import React, { useContext } from 'react';
import { Text, Image, StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur'; // ➡️ Import BlurView

export type HomeStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  Homestart: {} | undefined;
};

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const userName = user && user.info ? user.info.F_NAME : 'User';

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.image}
        />

        {/* Frosted Glass Card with Blur */}
        <View style={styles.cardWrapper}>
          <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.cardContent}>
            <Text style={styles.appName}>Hi {userName}</Text>
            <Text style={styles.welcome}>{t('welcome')}!</Text>
            <Text style={styles.description}>{t('desc')}</Text>

            <Button
              mode="contained"
              style={styles.getStartedButton}
              onPress={() => nav.navigate('Homestart')}
              buttonColor="rgba(0,0,0,0.8)"
              textColor="#fff"
            >
              {t('start')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  cardWrapper: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 20,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // slight white overlay
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  getStartedButton: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default HomeScreen;
