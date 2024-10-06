import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: [], // Initial state of your components
};

const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.components.push(action.payload);
    },
    removeComponent: (state, action) => {
      state.components = state.components.filter(component => component.id !== action.payload);
    },
    // Add more reducers as needed
  },
});

export const { addComponent, removeComponent } = componentSlice.actions;
export default componentSlice.reducer;
