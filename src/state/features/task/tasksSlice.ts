import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface TaskState {
  id: string | number;
  date: number;
  timestamp: number;
  text: string;
  done?: boolean;
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
      return state.filter((task: TaskState) => task.id !== action.payload.id);
    },
    setTaskDone: (state, action: PayloadAction<TaskState>) => {
      state.map((task: TaskState) => {
        if (task.id === action.payload.id) {
          task.done = true;
        }
        return task;
      });
    },
    unsetTaskDone: (state, action: PayloadAction<TaskState>) => {
      state.map((task: TaskState) => {
        if (task.id === action.payload.id) {
          task.done = false;
        }
        return task;
      });
    },
  },
});

export const {
  addTask,
  deleteTask,
  setTaskDone,
  unsetTaskDone,
} = tasksSlice.actions;

export const selectDateTasks = (date: number) => {
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
