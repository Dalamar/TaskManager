import React, { FC, ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { getDateAtMidnight, getNextDates } from '../../utils/dateUtils';
import { CalendarList, SelectedDate } from './CalendarList';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet, vs } from 'react-native-size-matters';
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
    dispatch(selectDate({ selectedDate: getDateAtMidnight(item).valueOf() }));
  };

  return (
    <View testID={testID} style={styles.container}>
      <CalendarList
        testID="CalendarList"
        dates={getNextDates(new Date(), daysPageSize * 2)}
        onSelectDate={getOnSelectDate}
        dateSelected={calendar.selectedDate}
        pageSize={daysPageSize}
      />
    </View>
  );
};

const styles = ScaledSheet.create<Style>({
  container: {
    marginBottom: vs(8),
  },
});
