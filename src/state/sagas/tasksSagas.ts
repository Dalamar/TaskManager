import { call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Notifier } from 'react-native-notifier';
import { ShowNotificationParams } from 'react-native-notifier/lib/typescript/src/types';
import { TaskState } from '../features/task/tasksSlice';
import { notificationParams } from '../../config/notificationParams';

function* taskAddedNotificationWorker(action: PayloadAction<TaskState>) {
  const { text } = action.payload;
  yield call(Notifier.showNotification, <ShowNotificationParams>{
    ...notificationParams,
    title: 'Task added successfully',
    description: text,
  });
}

function* taskDoneNotificationWorker() {
  yield call(Notifier.showNotification, <ShowNotificationParams>{
    ...notificationParams,
    title: 'Well done!',
  });
}

export default [
  takeLatest('tasks/addTask', taskAddedNotificationWorker),
  takeLatest('tasks/setTaskDone', taskDoneNotificationWorker),
];
