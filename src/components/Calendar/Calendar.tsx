import React, { FC, ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { getNextDates } from '../../utils/dateUtils';
import { CalendarList } from './CalendarList';

interface Props {
  testID: string;
}

interface Style {
  container: ViewStyle;
}

export const Calendar: FC<Props> = ({ testID }): ReactElement => {
  const daysPageSize = 7;

  return (
    <View testID={testID} style={styles.container}>
      <CalendarList
        testID="CalendarList"
        dates={getNextDates(new Date(), daysPageSize)}
        pageSize={daysPageSize}
      />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: 10,
  },
});
