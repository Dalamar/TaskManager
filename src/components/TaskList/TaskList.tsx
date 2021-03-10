import React, { FC, ReactElement } from 'react';
import { FlatList, ListRenderItem, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TaskCard } from './TaskCard';
import { TaskState } from '../../state/features/task/tasksSlice';

interface Props {
  testID: string;
  tasks: Array<TaskState>;
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
      keyExtractor={(item) => item.id.toString()}
      testID={testID}
      renderItem={renderItem}
    />
  );
};

const styles = ScaledSheet.create<Style>({
  container: {},
});
