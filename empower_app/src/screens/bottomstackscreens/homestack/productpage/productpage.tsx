import React, { useEffect, useState, useContext } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '../../../../utils/constants';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../../../context/userContext'; // Correct import
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

const ProductPage = () => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); 
  const [wishlistAdded, setWishlistAdded] = useState<boolean>(false);

  const route = useRoute();
  const { productId } = route.params;
  const { user, addToWishlist } = useContext(UserContext); // Use the context here
  const { t } = useTranslation();
  const nav = useNavigation();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const API_URL = `${BASE_URL}/api/product/${productId}`;
        const response = await fetch(API_URL);
        const result = await response.json();
        if (response.ok) {
          setProduct(result.product);
        } else {
          throw new Error('Failed to load product details');
        }
      } catch (error) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <Text style={styles.loading}>{t('loading product details...')}</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!product) return <Text style={styles.error}>{t('product not found')}</Text>;

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    if (user && addToWishlist) {
      addToWishlist(product); // Add to wishlist
      setWishlistAdded(true); // Toggle wishlist added state
      console.log(`Product ${product.PRODUCT_ID} added to wishlist`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      <View style={styles.productCard}>
        <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                  />
        <Image source={{ uri: product.PICTURES }} style={styles.productImage} />
        <Text style={styles.productName}>{product.NAME}</Text>
        <Text style={styles.productDescription}>About : {product.DESCRIPTION}</Text>
        <Text style={styles.productPrice}>₹{product.PRICE}</Text>
        <Text style={styles.productQuantity}>{t('available')}: {product.QUANTITY}</Text>

        <View style={styles.buttonContainer}>
          <Button title={t('add to cart')} onPress={() => console.log('Add to cart')} />
          <Button title={t('buy now')} onPress={() => nav.navigate('Buynow', { productId })} />
          <Button
            title={t('add to wishlist')}
            onPress={handleAddToWishlist}
            color={wishlistAdded ? '#ff9800' : '#ff5722'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 20,
    borderRadius: 42,
  },
  productCard: {
    backgroundColor: '#e5e7e9',
    borderRadius: 42,
    padding: 20,
    marginBottom: 15,
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
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

export default ProductPage;
