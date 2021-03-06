import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TaskState } from '../state/features/task/tasksSlice';

interface Props {
  task: TaskState;
  testID?: string;
}

interface Style {
  container: ViewStyle;
}

export const TaskCard = ({ testID, task }: Props) => {
  const { text, date, id, time } = task;
  return (
    <View testID={testID} style={styles.container}>
      <Text>Task ID: {id}</Text>
      <Text>Task Text: {text}</Text>
      <Text>Task Date: {date}</Text>
      <Text>Task Time: {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {},
});
