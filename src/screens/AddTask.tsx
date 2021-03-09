import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { addTask } from '../state/features/task/tasksSlice';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { getDateAtMidnight } from '../utils/dateUtils';
import { selectCalendar } from '../state/features/calendar/calendarSlice';
import InputTextArea from '../components/InputTextArea';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

interface Props {
  testID: string;
  children?: JSX.Element;
}

interface Style {
  container: ViewStyle;
  containerButton: ViewStyle;
}

const AddTask: FC<Props> = ({ testID }): ReactElement => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { selectedDate } = useSelector(selectCalendar);
  const [taskText, setTaskText] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const date = getDateAtMidnight(new Date(selectedDate)).valueOf();

  const handleAddTask = () => {
    dispatch(
      addTask({
        id: uuid(),
        date,
        timestamp: Date.now(),
        text: taskText,
      }),
    );
    navigation.goBack();
  };

  return (
    <View testID={testID} style={styles.container}>
      <DatePicker date={dateTime} onDateChange={setDateTime} mode="datetime" />
      <InputTextArea
        testID="AddTaskInputTextArea"
        placeholder="Enter task text here..."
        onChangeText={setTaskText}
      />
      <View style={styles.containerButton}>
        <Button
          testID="AddTaskButton"
          title="Add Task"
          onPress={handleAddTask}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    margin: 16,
  },
  containerButton: {
    marginTop: 16,
  },
});

export default AddTask;
