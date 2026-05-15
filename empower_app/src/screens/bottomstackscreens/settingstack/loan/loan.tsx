import React, { useContext } from 'react';
import { Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export type ProfileStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  LoanApplication: {} | undefined;
  Guidence: {} | undefined;
};

const Loan = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<ProfileStackParamList>>();

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-photo/calculator-money-notepad-orange-background-copy-space_169016-24503.jpg?t=st=1743368562~exp=1743372162~hmac=baacd6f4fa01c3aa3c00338a612f49556c2bce5dfa035c2d4bef935fb605c206&w=1380' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Loan Image from URL */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1532561540276-3194e1e22b35' }} // Example Image URL
          style={styles.image}
        />

        {/* Loan Welcome Message */}
        <Text style={styles.welcome}>{t('Welcome to the Loan Application Portal!')}</Text>

        {/* Shortened Loan Description */}
        <Text style={styles.description}>
          {t('loan')}
        </Text>

        {/* Apply Loan Button */}
        <Button
          mode="contained"
          onPress={() => nav.navigate('LoanApplication')} // Replace 'Send' with your screen name
          style={styles.applyButton}
          labelStyle={styles.buttonText}
        >
          {t('ApplyLoan')}
        </Button>
        <Button
          mode="contained"
          onPress={() => nav.navigate('Guidence')} // Replace 'Send' with your screen name
          style={styles.applyButton1}
          labelStyle={styles.buttonText1}
        >
          {t('guidance')}
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background image covers the screen
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent overlay for readability
    borderRadius: 10,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 200, // Adjust height for better display
    resizeMode: 'contain',
    marginTop: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  applyButton: {
    marginTop: 30,
    width: '80%',
    borderRadius: 8,
    backgroundColor: Colors.primary, // Adjust color to match design
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton1:{
    
    width: '40%',
    marginTop: 30,
    backgroundColor: '#ffff',

  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000000',
  },
});

export default Loan;
