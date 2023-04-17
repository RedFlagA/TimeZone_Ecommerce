import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {
    setDataCarts:(state, action) =>{
      return {
        ...state,
        carts: action.payload || []
      }
    },
    addNewCarts: (state: any, action: any) => {
     return {
      ...state,
      carts: action.payload || []
     }
    },
    clearCarts: (state:any, action:any) =>{
      return{
        ...state,
        carts:[]
      }
    }
  },

});

export const { addNewCarts, setDataCarts, clearCarts } = cartSlice.actions;
export default cartSlice.reducer;
