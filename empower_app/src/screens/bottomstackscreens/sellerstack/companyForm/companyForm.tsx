import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type SellerStackParamList = {
  SellerDashboard: {} | undefined;
};

const CompanyForm = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>();

  const [form, setForm] = useState({
    companyName: '',
    description: '',
    profileImage: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        const imageUrl = await uploadImageToFirebase(imageUri);
        if (imageUrl) {
          setForm({ ...form, profileImage: imageUrl });
        }
      }
    });
  };

  const uploadImageToFirebase = async (uri: string) => {
    try {
      const fileName = `seller_images/${Date.now()}.jpg`;
      const reference = storage().ref(fileName);
      await reference.putFile(uri);
      return await reference.getDownloadURL();
    } catch (error) {
      Alert.alert('Error', 'Image upload failed.');
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!form.companyName || !form.description) {
      Alert.alert('Error', 'Company name and description are required');
      return;
    }

    try {
      const requestBody = {
        COMPANY_NAME: form.companyName,
        DESCRIPTION: form.description,
        USER_ID: user.info.USER_ID,
        PICTURES: form.profileImage,
      };

      const API_URL = BASE_URL + '/api/seller/add';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Error', data.message || 'Registration failed');
        return;
      }

      Alert.alert('Success', 'Company registered successfully!');
      nav.navigate('SellerDashboard');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Company Registration Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register Your Company</Text>

        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#777"
          value={form.companyName}
          onChangeText={(text) => handleInputChange('companyName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#777"
          value={form.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          <Text style={styles.imagePickerText}>
            {form.profileImage ? 'Image Selected' : 'Upload Profile Image'}
          </Text>
        </TouchableOpacity>

        {form.profileImage && (
          <Image source={{ uri: form.profileImage }} style={styles.image} />
        )}

        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.registerText}>Register</Text>
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
  formContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: .4,
    borderColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  imagePicker: {
    width: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#000',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  registerButton: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
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
});

export default CompanyForm;
