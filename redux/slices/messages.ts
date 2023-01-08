import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/types";

interface InitialState {
  messages: Message[];
}

const initialState: InitialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...action.payload];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const newMessages = [...state.messages, action.payload];
      state.messages = newMessages;
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

/* @ts-ignore */
export const selectMessages = (state) => state.messages.messages;

export default messagesSlice.reducer;
