import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface AuthState {
  userToken: string | null; //
}
const initialState: AuthState = {
  userToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.userToken = action.payload.userToken;
    },
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
