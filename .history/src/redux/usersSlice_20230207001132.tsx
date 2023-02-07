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
    isLoadind: false,
    currentPage: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataUser.pending, (state: any) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDataUser.fulfilled, (state: any, action) => {
      // Add user to the state array
      console.log(
        "action",
        action.payload?.results?.sort(
          (a: any, b: any) =>
            b.login.username.toLowerCase() - a.login.username.toLowerCase()
        )
      );
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchDataUser.rejected, (state: any, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
    });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
