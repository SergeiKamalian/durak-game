import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isInitialized: boolean;
  isAppLoading: boolean;
}

const initialState: AppState = { isInitialized: false, isAppLoading: false };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeAppInitializedStatus: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    changeAppLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const { changeAppInitializedStatus, changeAppLoadingStatus } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
