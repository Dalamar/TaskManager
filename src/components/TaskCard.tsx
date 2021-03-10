import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  TaskState,
  deleteTask,
  setTaskDone,
  unsetTaskDone,
} from '../state/features/task/tasksSlice';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { colors } from '../design/colors';
import CheckBox from '@react-native-community/checkbox';
import { typography } from '../design/typography';

interface Props {
  task: TaskState;
  testID?: string;
}

interface Style {
  container: ViewStyle;
  containerCheckBox: ViewStyle;
  containerContent: ViewStyle;
  containerTaskText: ViewStyle;
  containerDateTime: ViewStyle;
  containerDeleteBox: ViewStyle;
  text: TextStyle;
  textDone: TextStyle;
  textDateTime: TextStyle;
  textDeleteBox: TextStyle;
}

export const TaskCard = ({ testID, task }: Props) => {
  const { text, timestamp } = task;
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(task.done);

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
        <View style={styles.containerCheckBox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColor={colors.borderInput}
            onTintColor={colors.textButton}
            onCheckColor={colors.textButton}
            tintColors={{ true: colors.textButton, false: colors.borderInput }}
            onValueChange={(newValue) => {
              setToggleCheckBox(newValue);
              if (newValue) {
                dispatch(setTaskDone(task));
              } else {
                dispatch(unsetTaskDone(task));
              }
            }}
          />
        </View>

        <View style={styles.containerContent}>
          <View style={styles.containerTaskText}>
            <Text style={[styles.text, toggleCheckBox && styles.textDone]}>
              {text}
            </Text>
          </View>
          <View style={styles.containerDateTime}>
            <Text style={styles.textDateTime}>
              {new Date(timestamp).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 100,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  containerCheckBox: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerTaskText: {
    flex: 1,
    justifyContent: 'center',
  },
  containerDateTime: {
    alignSelf: 'flex-end',
  },
  text: {
    ...typography.mainText,
  },
  textDone: {
    ...typography.mainText,
    color: colors.textButtonDisabled,
    textDecorationLine: 'line-through',
  },
  textDateTime: {
    fontSize: 10,
    color: colors.textCard,
  },
  containerDeleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgDeleteButton,
    width: 100,
    height: 100,
  },
  textDeleteBox: {
    color: colors.textDeleteButton,
    fontWeight: 'bold',
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
});
