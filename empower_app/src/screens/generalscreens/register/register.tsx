import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Menu, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserContext} from '../../../context/userContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../utils/colors';
import {BASE_URL} from '../../../utils/constants';

export type AuthStackParamList = {
  Login: {} | undefined;
};

const RegisterComponent = () => {
  const nav = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {dispatchUserEvent} = useContext(UserContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: new Date('2000-01-01'),
    gender: 'Female',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    latitude: null,
    longitude: null,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value});
    setMenuVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  const formatDate = date => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1; // Months are 0-based
    let year = d.getFullYear();

    return `${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}-${year}`;
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location for registration.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return new Promise(resolve => {
        Geolocation.requestAuthorization('whenInUse').then(result => {
          resolve(result === 'granted');
        });
      });
    }
  };

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  const handleRegister = async () => {
    // console.log('1');
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.phone ||
      !form.dateOfBirth ||
      !form.gender ||
      !form.address1 ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.pincode
    ) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    // console.log('2');
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // console.log('3');
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Error', 'Location permission is required for registration.');
      return;
    }

    // console.log('4');

    try {
      // console.log('5');
      const location = await getLocation();
      setForm(prevForm => ({
        ...prevForm,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      // console.log('6');
      // console.log(location);
      const requestBody = {
        F_NAME: form.firstName,
        L_NAME: form.lastName,
        EMAIL: form.email,
        PASSWORD: form.password,
        PHONE: form.phone,
        DOB: formatDate(form.dateOfBirth), // Convert Date to DD-MM-YYYY format
        GENDER: form.gender,
        ADDRESS_LINE1: form.address1,
        ADDRESS_LINE2: form.address2,
        COUNTRY: form.country,
        STATE: form.state,
        CITY: form.city,
        PINCODE: form.pincode,
        LATITUDE: location.latitude,
        LONGITUDE: location.longitude,
      };

      const API_URL = BASE_URL + '/api/user/register';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          // ✅ Display validation errors
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          Alert.alert('Validation Error', errorMessages);
        } else if (data.error) {
          Alert.alert('Validation Error', data.error);
        } else if (data.message) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', 'Registration failed');
        }
        return;
      }

      console.log(data);
      console.log(data.token);
      Alert.alert('Success', 'User registered successfully!');
      dispatchUserEvent('SIGNIN', {
        info: data.data,
        token: data.token,
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Image Section */}
      {/* <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
      /> */}

      {/* Registration Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="First Name"
            placeholderTextColor="#777"
            value={form.firstName}
            onChangeText={text => handleInputChange('firstName', text)}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Last Name"
            placeholderTextColor="#777"
            value={form.lastName}
            onChangeText={text => handleInputChange('lastName', text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={form.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#777"
          value={form.phone}
          onChangeText={text => handleInputChange('phone', text)}
          keyboardType="phone-pad"
        />

        {/* Date of Birth Picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={{color: form.dateOfBirth ? '#000' : '#777'}}>
            {form.dateOfBirth.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={form.dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Gender Dropdown Menu */}
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                {form.gender}
              </Button>
            }>
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Male')}
              title="Male"
            />
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Female')}
              title="Female"
            />
            <Menu.Item
              onPress={() => handleInputChange('gender', 'Other')}
              title="Other"
            />
          </Menu>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor="#777"
          value={form.address1}
          onChangeText={text => handleInputChange('address1', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address Line 2"
          placeholderTextColor="#777"
          value={form.address2}
          onChangeText={text => handleInputChange('address2', text)}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="City"
            placeholderTextColor="#777"
            value={form.city}
            onChangeText={text => handleInputChange('city', text)}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="State"
            placeholderTextColor="#777"
            value={form.state}
            onChangeText={text => handleInputChange('state', text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#777"
          value={form.country}
          onChangeText={text => handleInputChange('country', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="#777"
          value={form.pincode}
          onChangeText={text => handleInputChange('pincode', text)}
          keyboardType="number-pad"
        />

        {/* Password Fields */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={form.password}
          onChangeText={text => handleInputChange('password', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => nav.navigate('Login', {})}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'center',
  },
  formContainer: {
    padding: 20,
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
    justifyContent: 'center',
  },
  menuContainer: {
    width: '100%',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  registerButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default RegisterComponent;
