import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/apiConfig";

interface IData {
  currentPage: number;
  numberPerPage: number;
}

// Fectch Data Users
export const fetchDataUser: any = createAsyncThunk(
  "users/fetchUsers",
  async (data: IData, thunkAPI) => {
    const res = await axios.get(
      `?page=${data?.currentPage}&results=${data?.numberPerPage}`
    );
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentPage: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDataUser.fulfilled, (state: any, action) => {
      // Add user to the state array
      state.users = action.payload;
    });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
