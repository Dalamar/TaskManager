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
import { selectCalendar } from '../state/features/calendar/calendarSlice';

const Main = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const calendar = useSelector(selectCalendar);

  const date = new Date(calendar.selectedDate).toLocaleDateString();
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
