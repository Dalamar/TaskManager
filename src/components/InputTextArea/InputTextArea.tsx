import React, { FC, ReactElement, Ref, useState } from 'react';
import { TextInput, ViewStyle } from 'react-native';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
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

export const InputTextArea: FC<Props> = ({
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
      multiline={true}
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
    padding: s(8),
    height: vs(100),
    borderWidth: 0.3,
    borderRadius: s(4),
    borderColor: colors.borderInput,
    ...typography.inputText,
  },
});
