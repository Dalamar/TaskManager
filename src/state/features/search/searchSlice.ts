import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface SearchState {
  text: string;
}

const initialState: SearchState = {
  text: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<SearchState>) => {
      state.text = action.payload.text;
    },
  },
});

export const { search } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
