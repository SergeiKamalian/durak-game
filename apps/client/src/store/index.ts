import { configureStore } from "@reduxjs/toolkit";
import { appReducer, authReducer, aiGameReducer } from "./slices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    aiGame: aiGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from "./selectors";
export * from "./actions";
