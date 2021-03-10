import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
  flexOne: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
  flexOne: {
    flex: 1,
  },
});
