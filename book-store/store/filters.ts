// store/filters.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
}

const initialState: FiltersState = {
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    // Другие действия для работы с фильтрами
  },
});

export const { setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
