import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../types/types";

interface InitialState {
  chats: Chat[];
}

const initialState: InitialState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = [...action.payload];
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      const newChats = [...state.chats, action.payload];
      state.chats = newChats;
    },
  },
});

export const { setChats, addChat } = chatsSlice.actions;

/* @ts-ignore */
export const selectChats = (state) => state.chats.chats;

export default chatsSlice.reducer;
