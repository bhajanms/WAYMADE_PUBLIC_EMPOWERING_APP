import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../utils/colors';
import { BASE_URL } from '../../../../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // ➡️ added
import { BlurView } from '@react-native-community/blur'; // ➡️ added

export type AccountStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  EditProfile: {} | undefined;
  AccountView: {} | undefined;
};

const { width, height } = Dimensions.get('window'); // screen size

const EditProfile = () => {
  const { user, dispatchUserEvent } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<AccountStackParamList>>();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.info) {
      setForm({
        firstName: user.info.F_NAME || '',
        lastName: user.info.L_NAME || '',
        phone: user.info.PHONE || '',
      });
    }
  }, [user]);

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdateProfile = async () => {
    if (!form.firstName || !form.lastName || !form.phone) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        F_NAME: form.firstName,
        L_NAME: form.lastName,
        PHONE: form.phone,
      };

      const API_URL = BASE_URL + `/api/user/update/${user.info.USER_ID}`;

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          Alert.alert('Validation Error', errorMessages);
        } else if (data.error) {
          Alert.alert('Error', data.error);
        } else if (data.message) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', 'Profile update failed');
        }
        return;
      }

      Alert.alert('Success', 'Profile updated successfully!');
      dispatchUserEvent('UPDATE', {
        info: data.data,
        token: data.token,
      });
      nav.navigate('AccountView');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#f5d7db', '#dcc5f7', '#f0f0f0']} // your choice of colors
        style={StyleSheet.absoluteFill}
      />

      {/* Blur Overlay */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        {/* First Name */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={22} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={form.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={22} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={form.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={22} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#999"
            value={form.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Profile</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
