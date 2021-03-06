import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './state/store';
import Main from './screens/Main';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
