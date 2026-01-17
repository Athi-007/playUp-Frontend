import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true, 
});

if (__DEV__) {
  (global as any).store = store;
  console.log("Redux Store attached to debugger"); 
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;