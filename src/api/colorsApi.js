import { apiInstance, axiosRequest } from "@/utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getColor = createAsyncThunk(
  "calor/getColor",
  async () => {
    try {
      let { data } = await apiInstance.get(`/Color/get-colors`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteColor = createAsyncThunk(
  "color/deleteUser",
  async (id,{dispatch}) => {
    try {
      await axiosRequest.delete(`/Color/delete-color?id=${id}`);
      dispatch(getColor())
    } catch (error) {
      console.log(error);
    }
  },
);
export const getByIdColor = createAsyncThunk(
  "color/getByIdColor",
  async (id) => {
    try {
     let {data}= await apiInstance.get(`/Color/get-color-by-id?id=${id}`);
     return data.data
    } catch (error) {
      console.log(error);
    }
  },
);
export const addColor = createAsyncThunk(
  "color/addColor",
  async (colorAdd,{dispatch}) => {
    try {
      await axiosRequest.post(`/Color/add-color?ColorName=${colorAdd}`);
      dispatch(getColor())
    } catch (error) {
      console.log(error);
    }
  },
);
export const editColor = createAsyncThunk(
  "color/editColor",
  async ({idx,colorEdit},{dispatch}) => {
    try {
      await axiosRequest.put(`/Color/update-color?Id=${idx}&ColorName=${colorEdit}`);
      dispatch(getColor())
    } catch (error) {
      console.log(error);
    }
  },
);