import React, { useContext } from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';
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
};

const Guidence = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<ProfileStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Loan Image from URL */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1532561540276-3194e1e22b35' }} // Example Image URL
        style={styles.image}
      />

      {/* Loan Welcome Message */}
      <Text style={styles.welcome}>{t('Welcome to the Loan Application Portal!')}</Text>

      {/* Financial Guidance and Resources */}
      <View style={styles.guidanceContainer}>
        <Text style={styles.guidanceTitle}>{t('Financial Guidance and Resources')}</Text>
        
        <Text style={styles.guidanceText}>
          {t('1. Understand Loan Types: Research personal, auto, mortgage, student, and business loans to find the best fit.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('2. Review Loan Terms: Familiarize yourself with interest rates, repayment periods, and loan amounts.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('3. Check Your Credit Score: A good score helps secure better loan terms; use free tools to monitor and improve it.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('4. Calculate Affordability: Use loan calculators and assess your debt-to-income ratio before applying.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('5. Gather Documents: Prepare pay stubs, tax returns, and proof of income for a smooth application.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('6. Budget Carefully: Ensure you can afford monthly payments without sacrificing essential expenses.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('7. Consider Co-Signing: A co-signer can help if your credit is less than ideal.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('8. Automate Payments: Set up automatic payments to avoid missed or late fees.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('9. Make Extra Payments: Paying more than the minimum can reduce interest and shorten loan duration.')}
        </Text>
        <Text style={styles.guidanceText}>
          {t('10. Explore Refinancing: Consider refinancing for better terms if your credit improves.')}
        </Text>
      </View>

      {/* Button to navigate to Loan Application */}
      {/* <Button
        mode="contained"
        style={styles.applyButton}
        onPress={() => nav.navigate('LoanApplication')}
      >
        {t('Apply for Loan')}
      </Button> */}
    </ScrollView>
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
  guidanceContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  guidanceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 20,
  },
  guidanceText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#555',
    marginVertical: 5,
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
});

export default Guidence;
