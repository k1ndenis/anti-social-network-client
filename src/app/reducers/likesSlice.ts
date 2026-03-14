import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikesState {
  [pictureId: string]: number
}

const initialState: LikesState = {}

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    like: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state[id] = !state[id] ? 1 : 0;
    }
  }
})

export const { like } = likesSlice.actions;
export default likesSlice.reducer;