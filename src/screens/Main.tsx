import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  selectDateTasks,
  selectTasksByText,
} from '../state/features/task/tasksSlice';
import { useSelector } from 'react-redux';
import { ms, s, ScaledSheet } from 'react-native-size-matters';
import { selectCalendar } from '../state/features/calendar/calendarSlice';
import TaskList from '../components/TaskList';
import Calendar from '../components/Calendar';
import Search from '../components/Search';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

interface Style {
  container: ViewStyle;
  containerCalendar: ViewStyle;
  containerSearch: ViewStyle;
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
      <View style={styles.containerCalendar}>
        <Calendar testID="Calendar" />
      </View>
      <View style={styles.containerSearch}>
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

const styles = ScaledSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerCalendar: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  containerSearch: {
    paddingTop: ms(28),
  },
  containerTasksList: {
    flex: 1,
    margin: s(16),
  },
  containerAddTaskButton: {},
});

export default Main;
