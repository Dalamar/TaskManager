import { ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface Style {
  flexOne: ViewStyle;
}

export const styles = ScaledSheet.create<Style>({
  flexOne: {
    flex: 1,
  },
});
