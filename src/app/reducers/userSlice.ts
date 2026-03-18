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
      if (!state.user.likedPicturesIds) state.user.likedPicturesIds = [];
      const pictureId = action.payload;
      if (state.user.likedPicturesIds.includes(pictureId)) {
        state.user.likedPicturesIds = state.user.likedPicturesIds.filter(id => id !== pictureId);
      } else {
        state.user.likedPicturesIds = [pictureId, ...state.user.likedPicturesIds];
      }
    }
  }
});

export const { setUser, clearUser, setIsListening, updateLikedPictures } = userSlice.actions;
export default userSlice.reducer;