import React, { FC, ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { getNextDates } from '../../utils/dateUtils';
import { CalendarList, SelectedDate } from './CalendarList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCalendar,
  selectDate,
} from '../../state/features/calendar/calendarSlice';

interface Props {
  testID: string;
}

interface Style {
  container: ViewStyle;
}

export const Calendar: FC<Props> = ({ testID }): ReactElement => {
  const daysPageSize = 7;
  const calendar = useSelector(selectCalendar);
  const dispatch = useDispatch();

  const getOnSelectDate = (item: SelectedDate) => {
    console.log(item);
    dispatch(selectDate({ selectedDate: item.toString() }));
  };

  return (
    <View testID={testID} style={styles.container}>
      <CalendarList
        testID="CalendarList"
        dates={getNextDates(new Date(), daysPageSize * 3)}
        onSelectDate={getOnSelectDate}
        dateSelected={calendar.selectedDate.toString()}
        pageSize={daysPageSize}
      />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: 4,
  },
});
