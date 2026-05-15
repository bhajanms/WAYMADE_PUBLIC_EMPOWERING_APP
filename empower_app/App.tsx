/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Colors from './src/utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from './src/context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthScreens, RootScreens} from './src/navigation/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from './src/screens/generalscreens/splash/splash';
import {LanguageProvider} from './src/context/languageContext';

function App(): JSX.Element {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@userToken', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userToken');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const dispatchUserEvent = (actionType: string, payload: any) => {
    switch (actionType) {
      case 'SIGNIN':
        setUser(payload);
        storeData(payload);
        return;
      case 'LOGOUT':
        setUser(null);
        storeData(null);
        return;
      case 'UPDATE':
        setUser(payload);
        storeData(payload);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    // console.log(AsyncStorage);
    // Fetch token from AsyncStorage
    const checkAuthToken = async () => {
      try {
        const userDetails = await getData();
        if (userDetails) {
          setUser(userDetails); // Set token in context
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
      // setIsLoading(false); // Stop showing Splash Screen
      setTimeout(() => {
        setIsLoading(false); // Stop showing Splash Screen
      }, 3000);
    };

    checkAuthToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Show Splash Screen while checking auth
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <LanguageProvider>
          <SafeAreaView style={{backgroundColor: Colors.primary, flex: 1}}>
            <UserContext.Provider value={{user, dispatchUserEvent}}>
              {user ? <RootScreens /> : <AuthScreens />}
            </UserContext.Provider>
          </SafeAreaView>
        </LanguageProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
