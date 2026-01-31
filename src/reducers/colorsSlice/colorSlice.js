import { getByIdColor, getColor } from "@/api/colorsApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    user:{}
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getColor.fulfilled,(state,actions)=>{
    state.data = actions.payload
   })
    builder.addCase(getByIdColor.fulfilled,(state,actions)=>{
    state.user = actions.payload
   })
  },
});

export const {} = colorSlice.actions;

export default colorSlice.reducer;
