import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IgenreOrCategoryState {
  genreIdOrCategoryName: string | number;
  page: number;
  searchQuery: string;
}

const initialState: IgenreOrCategoryState = {
  genreIdOrCategoryName: "",
  page: 1,
  searchQuery: "",
};

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action: PayloadAction<string | number>) => {
      state.genreIdOrCategoryName = action.payload;
    },
    searchMovie: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie, changePage } =
  genreOrCategory.actions;

export default genreOrCategory.reducer;
