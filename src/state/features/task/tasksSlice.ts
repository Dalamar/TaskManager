import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface TaskState {
  id: string | number;
  date: string;
  time: string;
  text: string;
}

interface TasksState {
  [key: string]: Array<TaskState>;
}

const initialState: TasksState = {};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      const { date } = action.payload;
      // @ts-ignore
      const dateTasks = state[date] || [];
      dateTasks.push(action.payload);
      // @ts-ignore
      state[date] = dateTasks;
      return state;
    },
  },
});

export const { addTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
