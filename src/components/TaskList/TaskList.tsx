import React, { FC, ReactElement } from 'react';
import { FlatList, ListRenderItem, StyleSheet, ViewStyle } from 'react-native';
import { TaskCard } from '../TaskCard';
import { TaskState } from '../../state/features/task/tasksSlice';

interface Props {
  testID: string;
  tasks: Array<any>;
}

interface Style {
  container: ViewStyle;
}

const renderItem: ListRenderItem<TaskState> = ({ item }) => (
  <TaskCard testID={item.id.toString()} task={item} />
);

export const TaskList: FC<Props> = ({ testID, tasks }): ReactElement => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={tasks}
      testID={testID}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});
