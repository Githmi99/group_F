import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './reducers/componentSlice';
import { appApi } from './services/api'; // Adjust the path if needed

export const store = configureStore({
  reducer: {
    components: componentReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
