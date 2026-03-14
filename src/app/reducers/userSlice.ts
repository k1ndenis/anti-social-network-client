import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/types/user";

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;