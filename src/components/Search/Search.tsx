import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { colors } from '../../design/colors';
import Button from '../Button';

interface Props {
  testID: string;
  onSearch: Function;
}

interface Style {
  container: ViewStyle;
  containerInput: ViewStyle;
  containerButton: ViewStyle;
  textButton: ViewStyle;
}

export const Search: FC<Props> = ({ testID, onSearch }): ReactElement => {
  const [searchText, setSearchText] = useState('');

  return (
    <View testID={testID} style={styles.container}>
      <TextInput
        testID={`${testID}TextInput`}
        onChangeText={(text: string) => {
          setSearchText(text);
          onSearch(text);
        }}
        value={searchText}
        style={styles.containerInput}
        placeholder="Search..."
        placeholderTextColor="#769fcd"
      />
      <Button
        testID={`${testID}Button`}
        title="Cancel"
        onPress={() => {
          setSearchText('');
          onSearch('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: 16,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInput: {
    padding: 8,
    width: '80%',
    borderWidth: 0.3,
    borderRadius: 4,
    borderColor: colors.borderInput,
    color: colors.textInput,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textButton: {
    color: colors.textButton,
    fontSize: 16,
    fontWeight: '400',
  },
});
