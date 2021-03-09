import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  selectDateTasks,
  selectTasksByText,
} from '../state/features/task/tasksSlice';
import { useSelector } from 'react-redux';
import { selectCalendar } from '../state/features/calendar/calendarSlice';
import TaskList from '../components/TaskList';
import Calendar from '../components/Calendar';
import Search from '../components/Search';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

interface Style {
  container: ViewStyle;
  containerTasksList: ViewStyle;
  containerAddTaskButton: ViewStyle;
}

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const { selectedDate } = useSelector(selectCalendar);
  const dateTasks = useSelector(selectDateTasks(selectedDate));
  const searchResultTasks = useSelector(selectTasksByText(searchText));
  const navigation = useNavigation();

  const handleAddTask = () => {
    navigation.navigate('AddTask');
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
