import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Import the different language files
import en from './en.json';

// Init the languages
const LANGUAGE_EN = 'en';

// Set the key-value pairs for the different languages you want to support.
const translations = {
    en: { ...en  },
    // Add more languages here
};
const i18n = new I18n(translations);

// NOTE: Use this to set the initial locale in your app
//i18n.locale = Localization.getLocales()[0].languageCode; //Get the device language and set it as the default language

i18n.locale = LANGUAGE_EN; //Set the default language by hand

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

export const translate = (key: string, config?: any) => i18n.t(key, config);