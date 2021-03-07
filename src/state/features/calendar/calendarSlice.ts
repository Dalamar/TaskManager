import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CalendarState {
  selectedDate: string;
}

const initialState: CalendarState = {
  selectedDate: new Date().toString(),
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
