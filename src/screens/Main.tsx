import React from 'react';

import {Button, View} from 'react-native';
import {addTask} from '../state/features/task/tasksSlice';
import {useDispatch} from 'react-redux';

const Main = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Button
        onPress={() =>
          dispatch(
            addTask({
              id: '123',
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              text: 'Task',
            }),
          )
        }
        title={'Add Task'}
      />
    </View>
  );
};

export default Main;
