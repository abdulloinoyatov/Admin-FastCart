import { createSlice } from "@reduxjs/toolkit";
import { getByIdCategory, getCategory } from "../../api/categoryApi";

const initialState = {
    data2:[],
    user:{}
};

export const categotySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
        state.data2 = action.payload
    });
    builder.addCase(getByIdCategory.fulfilled, (state, action) => {
        state.user = action.payload
    });
  },
});

export const {} = categotySlice.actions;

export default categotySlice.reducer;
