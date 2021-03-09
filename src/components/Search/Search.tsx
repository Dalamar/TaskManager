import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';

interface Props {
  testID: string;
  onSearch: Function;
}

interface Style {
  container: ViewStyle;
  containerInput: ViewStyle;
}

export const Search: FC<Props> = ({ testID, onSearch }): ReactElement => {
  const [searchText, setSearchText] = useState('');

  return (
    <View testID={testID} style={styles.container}>
      <TextInput
        testID={`${testID}_TextInput`}
        onChangeText={(text: string) => {
          setSearchText(text);
          onSearch(text);
        }}
        value={searchText}
        style={styles.containerInput}
        placeholder="Search..."
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  containerInput: {
    borderWidth: 0.3,
    padding: 8,
  },
});
