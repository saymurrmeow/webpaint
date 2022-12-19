import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  activeTool: 'pen',
};

export const setActiveTool = createAction<string, 'setActiveTool'>('setActiveTool');

const toolReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActiveTool, (state, { payload }) => {
    state.activeTool = payload;
  });
});

const store = configureStore({
  reducer: {
    toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
