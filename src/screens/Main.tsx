import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'uuid';
import {
  addTask,
  selectDateTasks,
  selectTasksByText,
} from '../state/features/task/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalendar } from '../state/features/calendar/calendarSlice';
import TaskList from '../components/TaskList';
import Calendar from '../components/Calendar';
import Search from '../components/Search';
import Button from '../components/Button';
import { getDateAtMidnight } from '../utils/dateUtils';

interface Style {
  container: ViewStyle;
  containerTasksList: ViewStyle;
  containerAddTaskButton: ViewStyle;
}

const Main = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { selectedDate } = useSelector(selectCalendar);
  const dateTasks = useSelector(selectDateTasks(selectedDate));
  const searchResultTasks = useSelector(selectTasksByText(searchText));

  const date = getDateAtMidnight(new Date(selectedDate)).valueOf();
  const handleAddTask = () => {
    dispatch(
      addTask({
        id: uuid(),
        date,
        timestamp: Date.now(),
        text: `${Math.floor(
          Math.random() * 999,
        )} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nec sapien nec consectetur. Nunc at dictum nisl, ac suscipit.`,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Calendar testID="Calendar" />
      </View>
      <View>
        <Search testID="Search" onSearch={setSearchText} />
      </View>
      <View style={styles.containerTasksList}>
        <TaskList
          testID="TaskList"
          tasks={searchText ? searchResultTasks : dateTasks}
        />
      </View>
      <View style={styles.containerAddTaskButton}>
        <Button
          testID="AddTaskButton"
          onPress={handleAddTask}
          title="Add Task"
        />
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
    margin: 16,
  },
  containerAddTaskButton: {},
});

export default Main;
