import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-paper';
import {UserContext} from '../../../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../../../utils/colors';
import {BASE_URL} from '../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type AuthStackParamList = {
  Register: {} | undefined;
  Forgot: {} | undefined;
};

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {dispatchUserEvent} = useContext(UserContext);

  useEffect(() => {}, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const requestBody = {
        EMAIL: email,
        PASSWORD: password,
      };

      const API_URL = BASE_URL + '/api/user/login';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        if (data.errors) {
          // ✅ Display validation errors
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          Alert.alert('Validation Error 1', errorMessages);
        } else if (data.error) {
          Alert.alert('Validation Error 2', data.error);
        } else if (data.message) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', 'Login failed');
        }
        return;
      }
      // console.log(user.info);
      console.log(data);
      console.log(data.token);
      Alert.alert('Success', 'Login successful!');
      dispatchUserEvent('SIGNIN', {
        info: data.data,
        token: data.token,
      
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Login Error:', error);
    }
  };
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <LinearGradient
                        colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
                        style={StyleSheet.absoluteFill}
                      />
          <View style={styles.container}>
          <LinearGradient
                        colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
                        style={StyleSheet.absoluteFill}
                      />
            {/* Top Image Section */}
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            <Text style={styles.appName}>Way Made</Text>

            {/* Login Form */}
            <View style={styles.formContainer}>
              
            {/* <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          /> */}
              <Text style={styles.title}>Login</Text>

              {/* Email Field */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000000"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password Field */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Forgot Password */}
              <TouchableOpacity onPress={() => nav.navigate('Forgot', {})}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                mode="contained"
                buttonColor={Colors.primary}
                onPress={handleLogin}
                style={styles.loginButton}>
                Login
              </Button>

              {/* Register Option */}
              <TouchableOpacity onPress={() => nav.navigate('Register', {})}>
                <Text style={styles.registerText}>Click here to register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {flexGrow: 1, justifyContent: 'center', padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: .7,
    borderColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#007BFF',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 15,
  },
  registerText: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default LoginComponent;
