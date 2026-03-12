import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: string;
  text: string;
}

interface commentsState {
  [pictureId: string]: Comment[];
}

const initialState: commentsState = {}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ pictureId: string; text: string}>) => {
      const { pictureId, text } = action.payload;
      if (!state[pictureId]) state[pictureId] = [];
      state[pictureId].push({ id: Date.now().toString(), text })
    }
  }
})

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;