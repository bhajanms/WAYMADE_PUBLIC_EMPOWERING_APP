import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {List, Divider, Button, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../../context/userContext';
import Colors from '../../../../utils/colors';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {LanguageContext} from '../../../../context/languageContext';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';


export type SettingStackParamList = {
  Faq: {} | undefined;
  Wishlist: {} | undefined;
  Loan: {} | undefined;
  Changepswd: {} | undefined;
  
  
};

const SettingsListComponent = () => {
  const {dispatchUserEvent} = useContext(UserContext);
  const {t} = useTranslation();
  const {language, changeLanguage} = React.useContext(LanguageContext);
  
 const nav = useNavigation<StackNavigationProp<SettingStackParamList>>();

  return (
    <View style={styles.container}>
      <LinearGradient
              colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
              style={StyleSheet.absoluteFill}
            />
      {/* Header */}
      <Appbar.Header style={styles.header}>
        
        <Appbar.Content title="Settings" color={Colors.white} />
      </Appbar.Header>

      {/* Settings Menu */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {/* Language Selection */}
        <TouchableOpacity
          onPress={() => changeLanguage(language === 'en' ? 'ml' : 'en')}>
          <List.Item
            title={t('language')}
            description={language === 'ml' ? 'മലയാളം' : 'English'}
            left={() => <Icon name="language" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />

        {/* Whishlist */}
        <TouchableOpacity onPress={() => nav.navigate('Wishlist')}>
            {t('start')}
          <List.Item
            title="wishlist"
            left={() => <Icon name="bookmark" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />

        {/* Loan */}
        <TouchableOpacity onPress={() => nav.navigate('Loan')}>
            {t('start')}
          <List.Item
            title="loan"
            left={() => <Icon name="money" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
        {/* change password */}
        <TouchableOpacity onPress={() => nav.navigate('Changepswd')}>
            {t('start')}
          <List.Item
            title="change password"
            left={() => <Icon name="security" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => nav.navigate('Addcourse')}>
            {t('start')}
          <List.Item
            title="Add course"
            left={() => <Icon name="book" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />

        {/* FAQ */}
        <TouchableOpacity onPress={() => nav.navigate('Faq')}>
            {t('start')}
          <List.Item
            title="FAQ"
            left={() => <Icon name="help-outline" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
        

        {/* Terms & Policies */}
        <TouchableOpacity
          onPress={() => alert('Terms & Policies coming soon!')}>
          <List.Item
            title="Terms & Policies"
            left={() => <Icon name="description" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
      </ScrollView>

      {/* Logout Button at the Bottom */}
      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          icon="logout"
          buttonColor="#904e4e"
          textColor="#fff"
          onPress={() => dispatchUserEvent('LOGOUT', {})}>
          {t('logout')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.4)', // Header background color
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
});

export default SettingsListComponent;
