import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './reducers/componentSlice'; // Adjust this path accordingly

export const store = configureStore({
  reducer: {
    components: componentReducer,
  },
});
