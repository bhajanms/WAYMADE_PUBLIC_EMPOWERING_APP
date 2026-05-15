import React, { useEffect, useState, useContext } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { BASE_URL } from '../../../../utils/constants';
import { UserContext } from '../../../../context/userContext'; 
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Store the cart products here
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); 
  const { user } = useContext(UserContext); // Access user context
  const { t } = useTranslation();
  const nav = useNavigation();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.info.USER_ID) {
        setError('User not logged in');
        setLoading(false);
        return; // Early return if user is not logged in
      }

      try {
        // Make an API request to get the user's cart
        const cartUrl = `${BASE_URL}/api/cart/${user.info.USER_ID}`;
        const response = await fetch(cartUrl);
        console.log('Fetching cart data from:', cartUrl);
        console.log('Fetching cart data from:', response);

        if (!response.ok) {
          throw new Error('Failed to load cart');
        }

        const cartData = await response.json();
        console.log('Cart data:', cartData);

        if (cartData && Array.isArray(cartData.products)) {
          // For each cart item, fetch the product details
          const cartWithDetails = await Promise.all(
            cartData.products.map(async (item: any) => {
              const productUrl = `${BASE_URL}/api/product/${item.PRODUCT_ID}`;
              const productResponse = await fetch(productUrl);
              const productData = await productResponse.json();
              return { ...item, ...productData.product }; // Merge cart item with product data
            })
          );
          setCartItems(cartWithDetails); // Set the state with the combined data
        } else {
          throw new Error('Cart data is not an array of items');
        }
      } catch (error) {
        // setError(error.message || 'Failed to load cart');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]); // Re-run when `user` changes

  if (loading) return <Text style={styles.loading}>{t('loading cart...')}</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (cartItems.length === 0) return <Text style={styles.error}>{t('no items in your cart')}</Text>;

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.PICTURES }} style={styles.productImage} />
        <Text style={styles.productName}>{item.NAME}</Text>
        <Text style={styles.productDescription}>{item.DESCRIPTION}</Text>
        <Text style={styles.productPrice}>${item.PRICE}</Text>
        <Text style={styles.productQuantity}>{t('quantity')}: {item.QUANTITY}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title={t('remove from cart')}
            onPress={() => handleRemoveFromCart(item.PRODUCT_ID)}
            color="#ff5722"
          />
          <Button
            title={t('buy now')}
            onPress={() => nav.navigate('Buynow', { productId: item.PRODUCT_ID })}
          />
        </View>
      </View>
    );
  };

  const handleRemoveFromCart = async (productId: string) => {
    if (!user || !user.USER_ID) return;

    try {
      const removeUrl = `${BASE_URL}/api/cart/${user.USER_ID}/${productId}`;
      const response = await fetch(removeUrl, { method: 'DELETE' });

      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.PRODUCT_ID !== productId));
        console.log(`Product ${productId} removed from cart`);
      } else {
        throw new Error('Failed to remove product from cart');
      }
    } catch (error) {
      setError('Failed to remove product from cart');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>{t('your cart')}</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.PRODUCT_ID.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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

export default Cart;
