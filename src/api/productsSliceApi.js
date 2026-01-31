import { apiInstance, axiosRequest } from "@/utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
let API = "https://store-api.softclub.tj"
export const getProducts = createAsyncThunk(
  "auth/getProducts",
  async () => {
    try {
      let { data } = await apiInstance.get(`/Product/get-products`);
      return data.data.products;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getByIdProduct = createAsyncThunk(
  "auth/getByIdProduct",
  async (id) => {
    try {
      let response = await fetch(`${API}/Product/get-product-by-id?id=${id}`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteProduct = createAsyncThunk(
  "category/deleteProduct",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.delete(
        `/Product/delete-product?id=${id}`,

      );

      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteImageProduct = createAsyncThunk(
  "category/deleteImageProduct",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.delete(
        `/Product/delete-image-from-product?imageId=${id}`,

      );
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);
export const addToCart = createAsyncThunk(
  "category/deleteImageProduct",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.post(
        `/Cart/add-product-to-cart?id=${id}`,
      );

      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const putProduct = createAsyncThunk(
  "product/putProduct",
  async ({id1,id2,id3,id4,productName,quantity,weigth,size,code,price,hasDiscount,discountPrice}, { dispatch }) => {
    try {
      await axiosRequest.put(
        `/Product/update-product?Id=${id4}&BrandId=${id2}&ColorId=${id3}&ProductName=${productName}%3B&Description=${productName}%3B&Quantity=${quantity}&Weight=${weigth}&Size=${size}&Code=${code}&Price=${price}&HasDiscount=${hasDiscount}&DiscountPrice=${discountPrice}&SubCategoryId=${id1}`,
      );

      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }
);
export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (formData,{dispatch}) => {
    try {
       await axiosRequest.post("Product/add-product", formData);
      dispatch(getProducts())
    } catch (error) {
      console.error(error);
    }
  },
);
export const addImg = createAsyncThunk(
  "product/postProduct",
  async (formData,{dispatch}) => {
     await axiosRequest.post("/Product/add-image-to-product", formData);
    dispatch(getProducts())
  },
);
export const getBrands = createAsyncThunk(
  "product/getBrands",
  async () => {
    try {
      let response = await fetch(`${API}/Brand/get-brands`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getSubcategory = createAsyncThunk(
  "auth/getSubcategory",
  async () => {
    try {
      let response = await fetch(`${API}/SubCategory/get-sub-category`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getColors = createAsyncThunk(
  "product/getSubcategory",
  async () => {
    try {
      let response = await fetch(`${API}/Color/get-colors`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
);
