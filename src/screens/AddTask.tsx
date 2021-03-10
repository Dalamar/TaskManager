import React, { FC, ReactElement, useState } from 'react';
import { Modal, Text, TextStyle, View, ViewStyle } from 'react-native';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
import { addTask } from '../state/features/task/tasksSlice';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { getDateAtMidnight } from '../utils/dateUtils';
import InputTextArea from '../components/InputTextArea';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { typography } from '../design/typography';

interface Props {
  testID: string;
  children?: JSX.Element;
}

interface Style {
  container: ViewStyle;
  containerButton: ViewStyle;
  containerModal: ViewStyle;
  containerDateTime: ViewStyle;
  textDateTime: TextStyle;
}

const AddTask: FC<Props> = ({ testID }): ReactElement => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [taskText, setTaskText] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleAddTask = () => {
    dispatch(
      addTask({
        id: uuid(),
        date: getDateAtMidnight(new Date(dateTime)).valueOf(),
        timestamp: dateTime.valueOf(),
        text: taskText,
      }),
    );
    navigation.goBack();
  };

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.containerDateTime}>
        <Button
          testID="AddTaskButton"
          title="Set date time"
          onPress={() => setDatePickerVisible(true)}
        />
        <Text style={styles.textDateTime}>{dateTime.toLocaleString()}</Text>
      </View>
      <InputTextArea
        testID="AddTaskInputTextArea"
        placeholder="Enter task text here..."
        onChangeText={setTaskText}
      />
      <View style={styles.containerButton}>
        <Button
          testID="AddTaskButton"
          title="Save"
          onPress={handleAddTask}
          disabled={!taskText}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={datePickerVisible}>
        <View style={styles.containerModal}>
          <DatePicker
            date={dateTime}
            onDateChange={setDateTime}
            mode="datetime"
          />
          <Button
            testID="AddTaskButton"
            title="Set"
            onPress={() => setDatePickerVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = ScaledSheet.create<Style>({
  container: {
    margin: s(16),
  },
  containerButton: {
    marginTop: vs(16),
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  containerDateTime: {
    marginVertical: vs(16),
  },
  textDateTime: {
    ...typography.mainText,
  },
});

export default AddTask;
