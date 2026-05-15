import React, {useContext, useState, type PropsWithChildren} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../../../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../../../utils/colors';

export type AuthStackParamList = {
  Login: {} | undefined;
};

const ForgotComponent = () => {
  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {dispatchUserEvent} = useContext(UserContext);
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
      />
      <Text style={styles.appName}>Way Made</Text>
      {/* Forgot Password Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>

        {/* Email Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => nav.navigate('Login', {})}>
          <Text style={styles.submitText}>Send Reset Link</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => nav.navigate('Login', {})}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default ForgotComponent;
