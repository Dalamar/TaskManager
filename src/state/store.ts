import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './features/task/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
