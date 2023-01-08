import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "./slices/selected";
import authUserReducer from "./slices/authUser";
import chatsReducer from "./slices/chats";
import messagesReducer from "./slices/messages";

import usersReducer from "./slices/users";

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    authUser: authUserReducer,
    chats: chatsReducer,
    messages: messagesReducer,

    users: usersReducer,
  },
});
