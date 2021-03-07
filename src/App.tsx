import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './state/store';
import Main from './screens/Main';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import ErrorBoundary from './components/ErrorBoundary';
import Calendar from './components/Calendar';

const App = () => {
  let persistor = persistStore(store);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Calendar testID="Calendar" />
            <Main />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
