import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/utils/appStore'; // Ensure path is correct
import RouteNavigator from './src/Navigator/RouteNavigator';

export default function App() {
  return (
    <Provider store={store}>
        <RouteNavigator />
    </Provider>
  );
}
