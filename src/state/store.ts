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
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import tasksReducer from './features/task/tasksSlice';
import calendarReducer from './features/calendar/calendarSlice';
import searchReducer from './features/search/searchSlice';
import sagas from './sagas';
import { createInjectorsEnhancer } from 'redux-injectors';

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const persistConfig = {
  key: 'TaskManager',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  calendar: calendarReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const { run: runSaga } = sagaMiddleware;

const enhancers = [
  createInjectorsEnhancer({
    // @ts-ignore
    createReducer: persistedReducer,
    runSaga,
  }),
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

middlewares.push(sagaMiddleware);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
});

runSaga(sagas);

export type RootState = ReturnType<typeof store.getState>;
