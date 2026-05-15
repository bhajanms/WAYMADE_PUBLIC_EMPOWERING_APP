import React, { useContext, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../../utils/colors';
import { BASE_URL } from '../../../../utils/constants'; // Your BASE_URL
import { LearnStackParamList } from '../LearnStack'; // Your LearnStack types

const AddCourse = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<LearnStackParamList>>();

  const [form, setForm] = useState({
    title: '',
    description: '',
    fees: '',
    file: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleFilePick = async () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'File selection cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const fileUri = response.assets[0].uri;
        setForm({ ...form, file: fileUri });
      }
    });
  };

  const uploadFileToFirebase = async (uri: string) => {
    try {
      const fileName = `courses/${Date.now()}`;
      const reference = storage().ref(fileName);
      await reference.putFile(uri);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'File upload failed.');
      return null;
    }
  };

  const handleAddCourse = async () => {
    if (!form.title || !form.description || !form.fees || !form.file) {
      Alert.alert('Error', 'All fields are required (title, description, fees, file)');
      return;
    }

    if (isNaN(Number(form.fees))) {
      Alert.alert('Error', 'Fees must be a valid number');
      return;
    }

    try {
      let fileUrl = '';
      if (form.file) {
        fileUrl = await uploadFileToFirebase(form.file);
        console.log('Uploaded File URL:', fileUrl);
      }

      const requestBody = {
        NAME: form.title,
        DESCRIPTION: form.description,
        COURSE_URL: fileUrl,
        USER_ID: user.info.USER_ID,
        FEES: form.fees,
      };

      const API_URL = BASE_URL + '/api/course/add';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Course addition failed');
        return;
      }

      Alert.alert('Success', 'Course added successfully!');
      // nav.navigate('Send'); // Uncomment if you want to navigate after success
    } catch (error) {
      console.error('Course Addition Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <LinearGradient colors={['#f5d7db', '#dcc5f7', '#f0f0f0']} style={StyleSheet.absoluteFill}>
      <ScrollView contentContainerStyle={styles.container}>
        <BlurView style={styles.blurContainer} blurType="light" blurAmount={20} reducedTransparencyFallbackColor="white" />

        <Image source={require('../../../../assets/images/course.jpg')} style={styles.image} />
        <Text style={styles.welcome}>Add Course</Text>

        <TextInput
          style={styles.input}
          placeholder="Course Title"
          value={form.title}
          onChangeText={(text) => handleInputChange('title', text)}
        />

        <TextInput
          style={styles.inputdes}
          placeholder="Description"
          value={form.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Fees"
          keyboardType="numeric"
          value={form.fees}
          onChangeText={(text) => handleInputChange('fees', text)}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
          <Text style={styles.uploadButtonText}>
            {form.file ? 'File Selected' : 'Upload File/Video'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    borderColor: '#58d68d',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
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
    backgroundColor: '#f9f9f9',
  },
  inputdes: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  uploadButton: {
    width: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCourse;
