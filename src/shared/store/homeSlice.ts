import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    newArrivals: [],
    popularItems: []
  },
  reducers: {
    setNewArrivals: (state, action) => {
     return {
      ...state,
      newArrivals: action.payload || []
     }
    },
    setPopularItems: (state, action) =>{
      return action.payload
    }
  },

});

export const { setNewArrivals, setPopularItems } = homeSlice.actions;
export default homeSlice.reducer;
