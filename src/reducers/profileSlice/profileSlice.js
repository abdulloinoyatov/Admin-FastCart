import { getUserById } from "@/api/useProfileApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export default profileSlice.reducer;
