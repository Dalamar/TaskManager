import React from 'react';
import { Button, StyleSheet, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'uuid';
import { addTask, selectDateTasks } from '../state/features/task/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalendar } from '../state/features/calendar/calendarSlice';
import { TaskList } from '../components/TaskList/TaskList';

interface Style {
  container: ViewStyle;
  containerTasksList: ViewStyle;
  containerAddTaskButton: ViewStyle;
}

const Tasks = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(selectCalendar);
  const dateTasks = useSelector(
    selectDateTasks(new Date(selectedDate).toLocaleDateString()),
  );

  const date = new Date(selectedDate).toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const handleAddTask = () => {
    dispatch(
      addTask({
        id: uuid(),
        date,
        time,
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nec sapien nec consectetur. Nunc at dictum nisl, ac suscipit.',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTasksList}>
        <TaskList testID="TaskList" tasks={dateTasks} />
      </View>
      <View style={styles.containerAddTaskButton}>
        <Button onPress={handleAddTask} title="Add Task" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerTasksList: {
    flex: 1,
  },
  containerAddTaskButton: {},
});

export default Tasks;
