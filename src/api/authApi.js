import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../utils/url";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    try {
      let { data } = await apiInstance.post(`/Account/register`, user);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  try {
    let { data } = await apiInstance.post(`/Account/login`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
});
