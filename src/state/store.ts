import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import tasksReducer from './features/task/tasksSlice';
import calendarReducer from './features/calendar/calendarSlice';
import searchReducer from './features/search/searchSlice';

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: 'TaskManager',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['tasks', 'calendar'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  calendar: calendarReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
