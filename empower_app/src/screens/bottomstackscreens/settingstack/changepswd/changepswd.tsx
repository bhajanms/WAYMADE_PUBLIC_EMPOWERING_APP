import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-paper';
import { UserContext } from '../../../../context/userContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../../utils/colors';
import { BASE_URL } from '../../../../utils/constants';

export type ProfileStackParamList = {
    Send: {} | undefined;
    Verify: {} | undefined;
};

const ChangePswd = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<ProfileStackParamList>>();

  // State variables to store password inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // Validate that passwords are not empty
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    // Validate that the new password and confirm password match
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      const requestBody = {
        currentPassword,
        newPassword,
        confirmPassword,
      };

      const API_URL = BASE_URL + '/api/auth/change-password/' + user.info.USER_ID;
      console.error(user.info.USER_ID);

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`, // Assuming token is stored in user context
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // ✅ Display validation errors
          const errorMessages = data.errors.map((err) => err.msg).join('\n');
          Alert.alert('Validation Error', errorMessages);
        } else if (data.error) {
          Alert.alert('Error', data.error);
        } else if (data.message) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', 'Failed to change password');
        }
        return;
      }

      Alert.alert('Success', 'Password changed successfully!');
      nav.goBack(); // Go back after successful password change
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Change Password Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            {/* Logo Image */}
            <Text style={styles.appName}>Way Made</Text>

            {/* Change Password Form */}
            <View style={styles.formContainer}>
              <Text style={styles.title}>Change Password</Text>

              {/* Current Password Field */}
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#777"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              {/* New Password Field */}
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#777"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              {/* Confirm Password Field */}
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="#777"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {/* Change Password Button */}
              <Button
                mode="contained"
                buttonColor={Colors.primary}
                onPress={handleChangePassword}
                style={styles.loginButton}>
                Change Password
              </Button>
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
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { flexGrow: 1, justifyContent: 'center', padding: 20 },
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
  loginButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 20,
  },
});

export default ChangePswd;
