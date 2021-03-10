import { NativeModules, Platform } from 'react-native';

export const deviceLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export const deviceLocaleLang = () => deviceLocale.split('_')[0];
