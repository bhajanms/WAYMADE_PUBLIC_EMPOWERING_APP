import React, {createContext, useState, useEffect} from 'react';
import i18next from '../i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        i18next.changeLanguage(storedLang);
        setLanguage(storedLang);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async newLang => {
    await i18next.changeLanguage(newLang);
    setLanguage(newLang);
    await AsyncStorage.setItem('appLanguage', newLang);
  };

  return (
    <LanguageContext.Provider value={{language, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
