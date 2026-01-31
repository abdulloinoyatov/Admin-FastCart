import { axiosRequest } from "@/utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
let API = "https://store-api.softclub.tj"

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    try {
      let response = await fetch(`${API}/Category/get-categories`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
);  
export const getByIdCategory = createAsyncThunk(
  "category/getByIdCategory",
  async (id) => {
    try {
      let response = await fetch(`${API}/Category/get-category-by-id?id=${id}`);
      let result = await response.json()
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
); 
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (fd, { dispatch }) => {
    try {

      await axiosRequest.post(
        `/Category/add-category`,
        fd
      );


      dispatch(getCategory());
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.delete(
        `/Category/delete-category?id=${id}`,
        
      );

      dispatch(getCategory());
    } catch (error) {
      console.log(error);
    }
  }
);
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, fd }, { dispatch }) => {
    try {
      await axiosRequest.put(
        `/Category/update-category`,
        fd,
        
      );

      dispatch(getCategory());
    } catch (error) {
      console.log(error);
    }
  }
);

