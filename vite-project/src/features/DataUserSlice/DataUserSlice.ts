import { createSlice } from "@reduxjs/toolkit";

import { dataUser } from "model/Auth.model";

interface InfoState {
  userInfo: dataUser | null;
}

const initialState: InfoState = {
  userInfo: null,
};
export const dataUserSlice = createSlice({
  name: "dataUser",
  initialState,
  reducers: {
    getDataUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { getDataUser } = dataUserSlice.actions;
export default dataUserSlice.reducer;
