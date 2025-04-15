import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../../../../packages/shared";

interface AuthState {
  isAuth: boolean;
  user: UserType | null;
}

const initialState: AuthState = { isAuth: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserType | null>) => {
      state.isAuth = !!action.payload;
      state.user = action.payload;
    },
  },
});

export const { changeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
