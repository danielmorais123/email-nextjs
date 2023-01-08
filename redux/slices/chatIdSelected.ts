import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selectId: number;
}

const initialState: InitialState = {
  selectId: 1,
};

export const chatSelectSlice = createSlice({
  name: "chatid",
  initialState,
  reducers: {
    selectChatId: (state, action: PayloadAction<number>) => {
      state.selectId = action.payload;
    },
  },
});

export const { selectChatId } = chatSelectSlice.actions;

/* @ts-ignore */
export const selectChatSelected = (state) => state.chatid.selectId;

export default chatSelectSlice.reducer;
