import React, { FC, ReactElement } from 'react';
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
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

const styles = ScaledSheet.create<Style>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(8),
  },
  text: {
    color: colors.textButton,
    fontSize: s(16),
    fontWeight: '400',
  },
  textDisabled: {
    color: colors.textButtonDisabled,
    fontSize: s(16),
    fontWeight: '400',
  },
});
