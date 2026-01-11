import "./global.css"; // 1. Crucial: Import your global CSS for NativeWind
import React from 'react';
import RootNavigator from './src/Navigator/RouteNavigator';
import { Provider } from 'react-redux';
import { store } from './src/utils/appStore';

export default function App() {
  return (
  <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}
