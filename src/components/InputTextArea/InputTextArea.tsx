import React, { FC, ReactElement, Ref, useState } from 'react';
import { StyleSheet, TextInput, ViewStyle } from 'react-native';
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

const styles = StyleSheet.create<Style>({
  container: {
    padding: 8,
    height: 100,
    borderWidth: 0.3,
    borderRadius: 4,
    borderColor: colors.borderInput,
    ...typography.inputText,
  },
});
