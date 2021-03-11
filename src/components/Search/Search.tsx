import React, { FC, ReactElement, useRef } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { s, ScaledSheet } from 'react-native-size-matters';
import Button from '../Button';
import InputText from '../InputText';

interface Props {
  testID: string;
  onSearch: Function;
}

interface Style {
  container: ViewStyle;
  containerSearchInput: ViewStyle;
}

export const Search: FC<Props> = ({ testID, onSearch }): ReactElement => {
  const inputRef = useRef<TextInput>(null);
  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.containerSearchInput}>
        <InputText
          inputRef={inputRef}
          onChangeText={(text: string) => {
            onSearch(text);
          }}
          testID="SearchInputText"
          placeholder="Search..."
        />
      </View>

      <Button
        testID={`${testID}Button`}
        title="Cancel"
        onPress={() => {
          onSearch('');
          inputRef?.current?.clear();
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create<Style>({
  container: {
    marginHorizontal: s(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSearchInput: {
    flex: 1,
    marginRight: 16,
  },
});
