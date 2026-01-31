import { createSlice } from "@reduxjs/toolkit";
import { getBrands, getByIdProduct, getColors, getProducts, getSubcategory } from "../../api/productsSliceApi";

const initialState = {
    data:[],
    user:{},
    subCategory:[],
    brands:[],
    colors:[]
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload
    });
    builder.addCase(getByIdProduct.fulfilled, (state, action) => {
        state.user = action.payload
    })
     .addCase(getColors.fulfilled, (state, action) => {
        state.colors = action.payload
    })
     .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload
    })
     .addCase(getSubcategory.fulfilled, (state, action) => {
        state.subCategory = action.payload
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
