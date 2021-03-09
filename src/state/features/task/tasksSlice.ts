import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface TaskState {
  id: string | number;
  date: string;
  time: string;
  text: string;
}

export type TasksState = TaskState[];

const initialState: TasksState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      return state.concat(action.payload);
    },
    deleteTask: (state, action: PayloadAction<TaskState>) => {
      console.log('action', action);
      return state.filter((task: TaskState) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

export const selectDateTasks = (date: string) => {
  return createSelector(
    (state: RootState) => state.tasks,
    (tasks) => tasks.filter((task: TaskState) => task.date === date),
  );
};

export const selectTasksByText = (text: string) => {
  return createSelector(
    (state: RootState) => state.tasks,
    (tasks) => tasks.filter((task: TaskState) => task.text.includes(text)),
  );
};

export default tasksSlice.reducer;
