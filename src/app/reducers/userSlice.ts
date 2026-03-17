import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/types/user";

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
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
    },
    setIsListening: (state, action: PayloadAction<string | null>) => {
      if (!state.user) return;
      state.user.listening = action.payload;
    },
    updateLikedPictures: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      if (!state.user.likedPictures) state.user.likedPictures = [];
      const pictureId = action.payload;
      if (state.user.likedPictures.includes(pictureId)) {
        state.user.likedPictures = state.user.likedPictures.filter(id => id !== pictureId);
      } else {
        state.user.likedPictures = [pictureId, ...state.user.likedPictures];
      }
    }
  }
});

export const { setUser, clearUser, setIsListening, updateLikedPictures } = userSlice.actions;
export default userSlice.reducer;