import { getBrand, getByIdBrand } from "@/api/brandApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    user:{}
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getBrand.fulfilled,(state,actions)=>{
    state.data = actions.payload
   })
    builder.addCase(getByIdBrand.fulfilled,(state,actions)=>{
    state.user = actions.payload
   })
  },
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
