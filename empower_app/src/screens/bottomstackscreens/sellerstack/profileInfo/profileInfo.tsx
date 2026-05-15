import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import { UserContext } from '../../../../context/userContext'; // Access user context
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { BASE_URL } from '../../../../utils/constants';
import { BlurView } from '@react-native-community/blur';

const ProfileInfo = () => {
  const { user } = useContext(UserContext); // Access current user (the seller)
  const [sellerDetails, setSellerDetails] = useState<any>(null); // State to store seller details
  const [loading, setLoading] = useState<boolean>(true); // Loading state for seller details

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const API_URL = `${BASE_URL}/api/seller/${user.info.USER_ID}`; // API URL to get seller details
        console.log('Fetching seller details from:', API_URL); // Log the API URL for debugging

        const response = await fetch(API_URL, {
          method: 'GET', // Use GET method to fetch seller details
          headers: {
            'Content-Type': 'application/json', // Indicate content type
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to load seller details: ${response.statusText}`);
        }

        const result = await response.json(); // Parse the JSON response
        console.log('API Response:', result); // Log the full response to understand its structure

        if (result && result.seller) {
          const { SELLER_ID, COMPANY_NAME, DESCRIPTION ,PICTURES } = result.seller;
          setSellerDetails({
            SELLER_ID,
            COMPANY_NAME,
            DESCRIPTION,
            PICTURES,
          });
          console.log('Seller details set:', {
            SELLER_ID,
            COMPANY_NAME,
            DESCRIPTION,
            PICTURES,
          });
        } else {
          console.error('No seller details found in response:', result); 
          throw new Error('No seller details found in response');
        }
      } catch (error) {
        console.error('Error fetching seller details:', error); 
        Alert.alert('Error', error.message || 'Failed to load seller details'); // Show error alert
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSellerDetails(); // Fetch seller details when the component is mounted
  }, [user.info.USER_ID]);

  if (loading) {
    return <Text style={styles.loading}>Loading your details...</Text>;
  }

  if (!sellerDetails) {
    return <Text style={styles.error}>No seller details found</Text>;
  }

  return (
    <LinearGradient
      colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
      style={StyleSheet.absoluteFill} // Apply the gradient as the background
    >
      <View style={styles.container}>
        {/* Profile box */}
        <View style={styles.profileBox}>
          <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          
          {/* Seller profile picture */}
          <Image source={{ uri: sellerDetails.PICTURES }} style={styles.profileImage} />
          
          {/* Seller name in a box */}
          <View style={styles.nameBox}>
            <Text style={styles.sellerName}>{sellerDetails.COMPANY_NAME}</Text>
          </View>

          {/* Seller bio with heading and description box */}
          <View style={styles.bioContainer}>
            <View style={styles.descriptionBox}>
            <Text style={styles.sectionTitle}>Seller Bio :</Text>
            <Divider style={styles.divider} />
              <Text style={styles.sellerBio}>{sellerDetails.DESCRIPTION || 'No description available'}</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(240, 240, 240, 0)', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    padding: 30,
    borderRadius: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 0,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#58d68d',
    marginBottom: 20,
  },
  divider: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height:2,
  },
  nameBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 15,
    // marginBottom: 20,
    alignItems: 'center',
  },
  sellerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 10,
    textAlign: 'center',
  },
  bioContainer: {
    width: '100%',
    marginBottom: 20,
  },
  descriptionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  sellerBio: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    lineHeight: 24,
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

export default ProfileInfo;
