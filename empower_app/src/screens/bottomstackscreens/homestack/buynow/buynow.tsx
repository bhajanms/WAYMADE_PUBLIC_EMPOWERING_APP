import React, { useContext, useState, useEffect } from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Colors from '../../../../utils/colors';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type HomeStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  Buynow: { productId: string }; // Expecting productId to be passed
};

const Buynow = () => {
  const { user } = useContext(UserContext); // Get user context (assumed to have user info)
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  
  const { productId } = route.params; // Get productId passed from Productpage

  const [product, setProduct] = useState<any | null>(null); // State to store product details
  const [quantity, setQuantity] = useState(1); // Default to 1 quantity
  const [totalPrice, setTotalPrice] = useState(0); // State to store calculated total price

  // Fetch product details using productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const API_URL = `${BASE_URL}/api/product/${productId}`; // API URL for the product
        const response = await fetch(API_URL);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product); // Set product details from API response
          setTotalPrice(data.product.PRICE * quantity); // Calculate initial total price
        } else {
          console.error('Failed to load product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(); // Fetch product details when the component mounts
  }, [productId, quantity]); // Re-run if productId or quantity changes

  const handlePayNow = () => {
    console.log('Proceeding with the payment...');
    // Simulate payment gateway logic (can integrate later)
    alert(`Payment of $${totalPrice} successful!`);
  };

  // Simulate user billing info and address (replace with real data from user context)
  const userAddress = `${user.info.ADDRESS_LINE1}, ${user.info.ADDRESS_LINE2}\n${user.info.CITY} ${user.info.STATE}, ${user.info.COUNTRY}\n${user.info.PINCODE}`;

  if (!product) {
    return <Text style={styles.loading}>Loading product details...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      {/* Product Details Section */}
      <View style={styles.productDetailsBox}>
        <Image source={{ uri: product.PICTURES }} style={styles.productImage} />
        <Text style={styles.productName}>{product.NAME}</Text>
        <Text style={styles.productDescription}>{product.DESCRIPTION}</Text>
        <Text style={styles.productPrice}>₹{product.PRICE}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Quantity :{t('Quantity:')}</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={String(quantity)}
            onChangeText={(text) => {
              const num = parseInt(text);
              if (num > 0) {
                setQuantity(num);
              }
            }}
          />
        </View>
      </View>

      {/* Billing Information Section */}
      <View style={styles.billingInfoBox}>
        <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                  />
        <Text style={styles.billingTitle}>{t('Billing Information')}</Text>
        <Text style={styles.billingText}>{t('Name')}: {user.info.F_NAME}</Text>
        <Text style={styles.billingText}>{t('Address')}: {userAddress}</Text>
        <Text style={styles.billingText}>{t('Email')}: {user.info.EMAIL }</Text>
      </View>

      {/* Total Price Section */}
      <View style={styles.totalPriceBox}>
      <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                  />
        <Text style={styles.totalText}>{t('Total:')} ₹ {totalPrice}</Text>
      </View>

      {/* Payment Button */}
      <Button mode="contained" onPress={handlePayNow} style={styles.payButton}>
        {t('Pay Now')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  productDetailsBox: {
    backgroundColor: '#fff',
    padding: 20,
    // borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    // marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    // marginBottom: 10,
    color: '#777',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  billingInfoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    // marginBottom: 20,
    width: '100%',
  },
  billingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  billingText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  totalPriceBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});

export default Buynow;
