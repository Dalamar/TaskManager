import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getDateAtMidnight } from '../../../utils/dateUtils';

export interface CalendarState {
  selectedDate: number;
}

const initialState: CalendarState = {
  selectedDate: getDateAtMidnight(new Date()).valueOf(),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<CalendarState>) => {
      state.selectedDate = action.payload.selectedDate;
    },
  },
});

export const { selectDate } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
