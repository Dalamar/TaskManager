import { Easing } from 'react-native-notifier';
import { colors } from '../design/colors';
import { ShowNotificationParams } from 'react-native-notifier/lib/typescript/src/types';

export const notificationParams: ShowNotificationParams = {
  duration: 5000,
  showAnimationDuration: 400,
  showEasing: Easing.ease,
  hideOnPress: true,
  componentProps: {
    alertType: 'success',
    titleStyle: {
      color: colors.textInput,
    },
  },
};
