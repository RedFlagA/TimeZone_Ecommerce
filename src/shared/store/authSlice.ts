import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:{}
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
     return {
      ...state,
      user: action.payload,
     }
    },
  },

});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
