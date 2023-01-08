import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      
      state.user = action.payload;
     
    },
  },
});

export const { setUser } = authUserSlice.actions;


export const selectUser = (state: any) => state?.authUser.user;

export default authUserSlice.reducer;
