import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {
    setProductDetail: (_, action: PayloadAction<{}>) => {
      return action.payload;
    },
  },

});

export const { setProductDetail} = productSlice.actions;
export default productSlice.reducer;
