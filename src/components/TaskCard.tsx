import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { TaskState, deleteTask } from '../state/features/task/tasksSlice';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

interface Props {
  task: TaskState;
  testID?: string;
}

interface Style {
  container: ViewStyle;
  text: ViewStyle;
  containerDateTime: ViewStyle;
  textDateTime: ViewStyle;
  containerDeleteBox: ViewStyle;
  textDeleteBox: ViewStyle;
}

export const TaskCard = ({ testID, task }: Props) => {
  const { text, date, time } = task;
  const dispatch = useDispatch();

  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.2],
    });

    return (
      <View style={styles.containerDeleteBox}>
        <TouchableOpacity
          testID={`${testID}_Button`}
          onPress={() => dispatch(deleteTask(task))}>
          <Animated.Text
            style={[{ transform: [{ scale: scale }] }, styles.textDeleteBox]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <View testID={testID} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.containerDateTime}>
          <Text style={styles.textDateTime}>
            {date} {time}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    height: 120,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    backgroundColor: '#f6df13',
  },
  containerDateTime: {
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    color: '#000000',
  },
  textDateTime: {
    fontSize: 10,
    color: '#000000',
  },
  containerDeleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 100,
    height: 120,
  },
  textDeleteBox: {
    color: 'white',
    fontWeight: 'bold',
  },
});
