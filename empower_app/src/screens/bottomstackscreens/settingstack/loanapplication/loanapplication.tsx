import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export type SettingStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const LoanApplication = () => {
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<SettingStackParamList>>();
  
  // State to manage form inputs
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    panNumber: '', // PAN Number field
    loanPurpose: '',
    income: '',
    employmentStatus: '',
  });

  // Handle changes in input fields
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const { fullName, email, phone, panNumber, loanPurpose, income, employmentStatus } = form;
    
    // Basic validation
    if (!fullName || !email || !phone || !panNumber || !loanPurpose || !income || !employmentStatus) {
      Alert.alert(t('error'), t('allFieldsRequired'));
      return;
    }

    // Validate PAN Number format (basic check for 10-character alphanumeric format)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      Alert.alert(t('error'), t('invalidPAN'));
      return;
    }

    // Simulate a form submission success
    Alert.alert(t('success'), t('loanApplicationSubmitted'));
    // Optionally, navigate to another page after form submission
    // nav.navigate('Send');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>{t('welcomeToLoanApplication')}</Text>

      {/* Loan Application Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('fullName')}
          value={form.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('email')}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('phone')}
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('panNumber')}
          value={form.panNumber}
          onChangeText={(text) => handleChange('panNumber', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('loanPurpose')}
          value={form.loanPurpose}
          onChangeText={(text) => handleChange('loanPurpose', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('monthlyIncome')}
          keyboardType="numeric"
          value={form.income}
          onChangeText={(text) => handleChange('income', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('employmentStatus')}
          value={form.employmentStatus}
          onChangeText={(text) => handleChange('employmentStatus', text)}
        />
      </View>

      {/* Submit Button */}
      <Button title={t('submit')} onPress={handleSubmit}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    width: '100%',
    marginTop: 30,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default LoanApplication;
