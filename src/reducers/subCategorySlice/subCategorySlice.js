import { getByIdSubCategory, getSubcategory } from "@/api/subCategoryApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    user:{}
};

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getSubcategory.fulfilled,(state,actions)=>{
    state.data = actions.payload
   })
    builder.addCase(getByIdSubCategory.fulfilled,(state,actions)=>{
    state.user = actions.payload
   })
  },
});

export const {} = subCategorySlice.actions;

export default subCategorySlice.reducer;
