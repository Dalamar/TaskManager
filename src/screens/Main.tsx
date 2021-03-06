import React from 'react';
import { Button, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import {
  addTask,
  selectTasks,
  TaskState,
} from '../state/features/task/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCard } from '../components/TaskCard';

const Main = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <View>
      <Button
        onPress={() => {
          dispatch(
            addTask({
              id: uuid(),
              date,
              time,
              text: 'Task',
            }),
          );
        }}
        title="Add Task"
      />

      {tasks[date]?.map((task: TaskState) => (
        <TaskCard key={task.id} testID="TaskCard" task={task} />
      ))}
    </View>
  );
};

export default Main;
