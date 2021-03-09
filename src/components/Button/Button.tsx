import React, { FC, ReactElement } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../design/colors';

interface Props {
  testID: string;
  title: string;
  onPress: any;
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

export const Button: FC<Props> = ({ testID, title, onPress }): ReactElement => {
  return (
    <TouchableOpacity
      testID={testID}
      style={styles.container}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text: {
    color: colors.textButton,
    fontSize: 16,
    fontWeight: '400',
  },
});
