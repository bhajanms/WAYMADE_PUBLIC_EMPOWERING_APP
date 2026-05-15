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
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../../utils/colors';
import { BASE_URL } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type SellerStackParamList = {
  SellerDashboard: {} | undefined;
};

const AddProduct = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigation<StackNavigationProp<SellerStackParamList>>();

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    image: '',
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
        setForm({ ...form, image: imageUri });
      }
    });
  };

  const uploadImageToFirebase = async (uri: string) => {
    try {
      const fileName = `products/${Date.now()}.jpg`;
      const reference = storage().ref(fileName);
      await reference.putFile(uri);
      return await reference.getDownloadURL();
    } catch (error) {
      Alert.alert('Error', 'Image upload failed.');
      return null;
    }
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.description || !form.quantity) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (isNaN(Number(form.price)) || isNaN(Number(form.quantity))) {
      Alert.alert('Error', 'Price and Quantity must be valid numbers');
      return;
    }

    try {
      let imageUrl = '';
      if (form.image) {
        imageUrl = await uploadImageToFirebase(form.image);
        console.log(imageUrl);
      }

      const requestBody = {
        NAME: form.name,
        PRICE: form.price,
        DESCRIPTION: form.description,
        QUANTITY: form.quantity,
        SELLER_ID: user.info.seller_id,
        PICTURES: imageUrl,
      };

      const API_URL = BASE_URL + '/api/product/add';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Error', data.message || 'Product addition failed');
        return;
      }

      Alert.alert('Success', 'Product added successfully!');
      nav.navigate('SellerDashboard');
    } catch (error) {
      console.error('Product Addition Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <LinearGradient  colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
            style={StyleSheet.absoluteFill}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <BlurView
                      style={styles.blurContainer}
                      blurType="light"
                      blurAmount={20}
                      reducedTransparencyFallbackColor="white"
                    />
          <Image source={require('../../../../assets/images/seller1.jpg')} style={styles.image} />
          <Text style={styles.title}>Add Product</Text>
          <TextInput style={styles.input} placeholder="Product Name" value={form.name} onChangeText={(text) => handleInputChange('name', text)} />
          <TextInput style={styles.input} placeholder="Price" value={form.price} onChangeText={(text) => handleInputChange('price', text)} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Description" value={form.description} onChangeText={(text) => handleInputChange('description', text)} multiline />
          <TextInput style={styles.input} placeholder="Quantity" value={form.quantity} onChangeText={(text) => handleInputChange('quantity', text)} keyboardType="numeric" />
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text style={styles.uploadButtonText}>{form.image ? 'Image Selected' : 'Upload Product Image'}</Text>
          </TouchableOpacity>
          {form.image && <Image source={{ uri: form.image }} style={styles.previewImage} />}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: { alignItems: 'center', backgroundColor:  '#aeb6bf', borderRadius: 40, padding: 20, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  image: { width: 100, height: 100, marginBottom: 20, borderRadius: 50,borderColor: '#58d68d'},
  title: { fontSize: 24, fontWeight: 'bold', color:'rgba(0,0,0,0.8)', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, backgroundColor: '#f9f9f9' },
  uploadButton: { width: '100%', backgroundColor: Colors.secondary, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  uploadButtonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  previewImage: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
  addButton: { width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 15 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddProduct;
