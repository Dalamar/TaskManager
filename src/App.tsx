import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotifierWrapper } from 'react-native-notifier';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './screens/Main';
import { theme } from './design/theme';
import AddTask from './screens/AddTask';
import { styles } from './design/styles';

const Stack = createStackNavigator();

const App = () => {
  let persistor = persistStore(store);

  return (
    <ErrorBoundary>
      <NotifierWrapper>
        <NavigationContainer theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={styles.flexOne}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: 'Tasks' }}
                  />
                  <Stack.Screen
                    name="AddTask"
                    component={AddTask}
                    options={{ title: '' }}
                  />
                </Stack.Navigator>
              </SafeAreaView>
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </NotifierWrapper>
    </ErrorBoundary>
  );
};

export default App;
