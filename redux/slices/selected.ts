import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selected: number;
}

const initialState: InitialState = {
  selected: 1,
};

export const selectSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    select: (state, action) => {
      state.selected = action.payload;
    },
   
  },
});

export const { select } = selectSlice.actions;

/* @ts-ignore */
export const selectSelected = (state) => state.selected.selected;

export default selectSlice.reducer;
