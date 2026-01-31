import { axiosRequest } from "@/utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUserById = createAsyncThunk(
  "accountSlice/getUserById",
  async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `UserProfile/get-user-profile-by-id?id=${id}`,
      );
      return data.data;
    } catch (error) {
      console.error(error);
    }
  },
);

