import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './screens/Main';

const App = () => {
  let persistor = persistStore(store);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <Main />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
