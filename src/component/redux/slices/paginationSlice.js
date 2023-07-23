import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  pageSelect: 5,
  searchText: "",
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSelect: (state, action) => {
      state.pageSelect = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setCurrentPage, setPageSelect, setSearchText } =
  paginationSlice.actions;
export default paginationSlice.reducer;
