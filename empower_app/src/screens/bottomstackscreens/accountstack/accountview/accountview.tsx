import React, { useContext } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, Platform } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export type AccountStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
  EditProfile: {} | undefined;
};

const AccountView = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<AccountStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
        style={StyleSheet.absoluteFill}
      />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Avatar */}
        <Image
          source={require('../../../../assets/images/avatar.png')}
          style={styles.image}
        />

        <Text style={styles.welcome}>{t('welcome to Profile')}</Text>

        {/* Card */}
        <View style={styles.cardWrapper}>
        <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.cardBackground}>
            <Card.Content>
              <Text style={styles.cardTitle}>{t('User Information')}</Text>
              <Divider style={styles.divider} />
              <View style={styles.infoBox}>
                <View style={styles.inputBox}>
                  <Text style={styles.userInfoTitle}>{t('Full Name')}</Text>
                  <Text style={styles.userInfo}>{user.info.F_NAME} {user.info.L_NAME}</Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.userInfoTitle}>{t('Phone')}</Text>
                  <Text style={styles.userInfo}>{user.info.PHONE}</Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.userInfoTitle}>{t('Address')}</Text>
                  <Text style={styles.userInfo}>
                    {user.info.ADDRESS_LINE1}{'\n'}
                    {user.info.ADDRESS_LINE2}{'\n'}
                    {user.info.CITY}, {user.info.STATE}{'\n'}
                    {user.info.COUNTRY}{'\n'}
                    {user.info.PINCODE}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </View>
        </View>

        {/* Edit Profile Button */}
        <Button
          mode="contained"
          icon="account-edit"
          buttonColor="rgba(0,0,0,0.8)"
          textColor="#ffffff"
          style={styles.button}
          onPress={() => nav.navigate('EditProfile')}
        >
          {t('EditProfile')}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  cardWrapper: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardBackground: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent white (fake blur)
    // elevation: 10, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  divider: {
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  infoBox: {
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: 10,
  },
});

export default AccountView;
