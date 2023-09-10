import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isActive: false,
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    activeLoading: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
export const { activeLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
