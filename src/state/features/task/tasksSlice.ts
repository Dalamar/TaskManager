import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
  id: string | number;
  date: string;
  time: string;
  text: string;
}

export interface TasksState {
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

export const selectTasks = createSelector(
  (state: TasksState) => state.tasks,
  (tasks) => tasks,
);

export const selectDateTasks = (date: string) => {
  return createSelector(
    (state: TasksState) => state.tasks,
    // @ts-ignore
    (tasks) => tasks[date],
  );
};

export default tasksSlice.reducer;
