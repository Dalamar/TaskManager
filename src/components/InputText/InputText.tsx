import React, { FC, ReactElement, Ref, useState } from 'react';
import { TextInput, ViewStyle } from 'react-native';
import { s, ScaledSheet } from 'react-native-size-matters';
import { colors } from '../../design/colors';
import { typography } from '../../design/typography';

interface Props {
  inputRef?: Ref<TextInput>;
  testID: string;
  onChangeText: Function;
  placeholder?: string;
}

interface Style {
  container: ViewStyle;
}

export const InputText: FC<Props> = ({
  inputRef,
  testID,
  onChangeText,
  placeholder,
}): ReactElement => {
  const [searchText, setSearchText] = useState('');
  return (
    <TextInput
      ref={inputRef}
      testID={testID}
      onChangeText={(text: string) => {
        setSearchText(text);
        onChangeText(text);
      }}
      value={searchText}
      style={styles.container}
      placeholder={placeholder}
      placeholderTextColor="#769fcd"
    />
  );
};

const styles = ScaledSheet.create<Style>({
  container: {
    padding: s(12),
    borderWidth: 0.3,
    borderColor: colors.borderInput,
    ...typography.inputText,
  },
});
