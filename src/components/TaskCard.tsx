import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TaskState } from '../state/features/task/tasksSlice';

interface Props {
  task: TaskState;
  testID?: string;
}

interface Style {
  container: ViewStyle;
  text: ViewStyle;
  containerDateTime: ViewStyle;
  textDateTime: ViewStyle;
}

export const TaskCard = ({ testID, task }: Props) => {
  const { text, date, time } = task;
  return (
    <View testID={testID} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.containerDateTime}>
        <Text style={styles.textDateTime}>
          {date} {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    marginTop: 8,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  containerDateTime: {
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    marginBottom: 16,
    color: '#333',
  },
  textDateTime: {
    fontSize: 10,
    color: '#333',
  },
});
