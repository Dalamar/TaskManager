import React, { FC, ReactElement } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { colors } from '../../design/colors';

interface Props extends TouchableOpacityProps {
  testID: string;
  disabled?: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
  textDisabled: TextStyle;
}

export const Button: FC<Props> = ({
  testID,
  title,
  onPress,
  disabled,
}): ReactElement => {
  return (
    <TouchableOpacity
      testID={testID}
      style={styles.container}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  text: {
    color: colors.textButton,
    fontSize: 16,
    fontWeight: '400',
  },
  textDisabled: {
    color: colors.textButtonDisabled,
    fontSize: 16,
    fontWeight: '400',
  },
});
