import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../../../../context/userContext'; // Access user context
import { BASE_URL } from '../../../../utils/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type HomeStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  Homestart: {} | undefined;
  Productpage: { productId: string }; // Passing productId to the Productpage
  Buynow: {} | undefined;
};

const Homestart = () => {
  const { user } = useContext(UserContext); // Access current user (the seller)
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const [products, setProducts] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [wishlist, setWishlist] = useState<Set<string>>(new Set()); // Track wishlist products by their IDs

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const API_URL = `${BASE_URL}/api/product/list`; // API URL to get the products
        const response = await fetch(API_URL, {
          method: 'GET', // Use GET method to fetch products
          headers: {
            'Content-Type': 'application/json', // Indicate content type
          },
        });

        const result = await response.json(); // Parse the JSON response
        console.log(result);
        console.log(result.products);

        // Check if the response is successful
        if (response.ok) {
          // Extract the 'data' array from the response
          const productsData = result.products || []; // Default to empty array if 'data' is not present
          setProducts(productsData);
          console.log(productsData); // Set the products in state
        } else {
          throw new Error('Failed to load products');
        }
      } catch (error) {
        console.error('Error fetching products:', error); // Log any errors
        Alert.alert('Error', 'Failed to load products'); // Show error alert
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSellerProducts(); // Fetch products when the component is mounted
  }, [user.info.USER_ID]); // Re-run the effect if the user ID changes

  const handleAddToWishlist = async (productId: string) => {
    try {
      // Make API call to add product to wishlist
      const response = await fetch(`${BASE_URL}/api/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          USER_ID: user.info.USER_ID,
          PRODUCT_ID: productId,
        }),
      });

      // Log the raw response for debugging
      console.log('Response:', response);

      // Check if the response is OK
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        console.log('Result from wishlist API:', result); // Log the result from the backend

        setWishlist((prevWishlist) => new Set(prevWishlist).add(productId)); // Add to wishlist state
        Alert.alert('Success', 'Product added to wishlist');
      } else {
        // Handle non-OK responses
        const errorResponse = await response.json();
        console.error('Error adding to wishlist:', errorResponse);
        Alert.alert('Error', errorResponse.message || 'Failed to add product to wishlist');
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Failed to add product to wishlist');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      // Make API call to add product to cart
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          USER_ID: user.info.USER_ID,
          PRODUCT_ID: productId,
          QUANTITY: 1, // Add 1 quantity for the product (you can modify this if needed)
        }),
      });

      // Log the raw response for debugging
      console.log('Response:', response);

      // Check if the response is OK
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        console.log('Result from cart API:', result); // Log the result from the backend

        Alert.alert('Success', 'Product added to cart');
      } else {
        // Handle non-OK responses
        const errorResponse = await response.json();
        console.error('Error adding to cart:', errorResponse);
        Alert.alert('Error', errorResponse.message || 'Failed to add product to cart');
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  const handleProductCardPress = (productId: string) => {
    nav.navigate('Productpage', { productId }); // Navigate to ProductScreen and pass the product ID
  };

  if (loading) {
    return <Text style={styles.loading}>Loading your products...</Text>; // Show loading message
  }

  if (products.length === 0) {
    return <Text style={styles.error}>No products found</Text>; // Show error message if no products are found
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      {/* Loop through the products array and display each product */}
      {products.map((product: any) => {
        const isInWishlist = wishlist.has(product.PRODUCT_ID); // Check if the product is in the wishlist

        return (
          <TouchableOpacity 
          
            key={product.PRODUCT_ID}
            style={styles.productCard}
            onPress={() => handleProductCardPress(product.PRODUCT_ID)} // Navigate when the card is pressed
          >
            {/* Product image */}
            <Image source={{ uri: product.PICTURES }} style={styles.productImage} />
            {/* Product name */}
            <Text style={styles.productName}>{product.NAME}</Text>
            {/* Product price */}
            <Text style={styles.productPrice}>₹{product.PRICE}</Text>
            {/* Product like count with heart symbol */}
            <Text style={styles.productLikeCount}>Like:{product.LIKE_COUNT}</Text>

            {/* Add to Cart, Buy Now, and Add to Wishlist buttons */}
            <View style={styles.buttonContainer}>
              <Button 
                title="Add to Cart"
                onPress={() => handleAddToCart(product.PRODUCT_ID)} // Handle add to cart logic
                color="#4CAF50"
                
                
              />
              <Button 
                title="Buy Now"
                onPress={() => console.log(`Product ${product.PRODUCT_ID} purchased`)} // Handle buy now logic
                color="#f44336"
              />
              <Button 
                title={isInWishlist ? "Added to Wishlist" : "Add to Wishlist"} // Change button text
                onPress={() => handleAddToWishlist(product.PRODUCT_ID)} // Handle add to wishlist logic
                color={isInWishlist ? "#8e44ad" : "#ff5722"} // Change button color if product is in wishlist
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 20,
  },
  productCard: {
    backgroundColor: '#e5e7e9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    height: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productLikeCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderRadius: 12,
  },
  cart:{
    fontSize: 18,
    borderRadius: 42,
  },
  buy:{
    fontSize: 18,
  },
  wishlist:{
    fontSize: 18,

  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  error: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
  },
});

export default Homestart;
