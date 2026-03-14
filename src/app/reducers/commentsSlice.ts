import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Comment {
  pictureId: string;
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

interface CommentsState {
  [pictureId: string]: Comment[];
}

interface SendCommentPayload {
  pictureId: string;
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

const initialState: CommentsState = {};

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchComments = createAsyncThunk<CommentsState>(
  "comments/fetchComments",
  async () => {
    const res = await fetch(`${apiUrl}/api/comments`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data = await res.json();
    return data as CommentsState
  }
)

export const sendCommentToServer = createAsyncThunk<Comment, SendCommentPayload>(
  "comments/sendCommentToServer",
    async ({ pictureId, text, createdAt, id, authorId, authorName }:  SendCommentPayload) => {
    const response = await fetch(`${apiUrl}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pictureId, text, createdAt, id, authorId, authorName })
    })
    if (!response.ok) {
      throw new Error("Failed to send comment")
    }
    return (await response.json()) as Comment
  }
)

export const deleteCommentFromServer = createAsyncThunk<string, string>(
  "comments/deleteCommentFromServer",
  async (id) => {
    const response = await fetch(`${apiUrl}/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
    return id;
  }
)

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // addCommentLocal: (state, action: PayloadAction<{ pictureId: string; text: string, createdAt: string, id: string }>) => {
    //   const { pictureId, text, createdAt, id } = action.payload;
    //   if (!state[pictureId]) state[pictureId] = [];
    //   state[pictureId].push({ pictureId, text, createdAt, id });
    // },
    // deleteComment: (state, action: PayloadAction<{ pictureId: string, commentId: string}>) => {
    //   const { pictureId, commentId } = action.payload;
    //   if (!state[pictureId]) return;
    //   state[pictureId] = state[pictureId]?.filter(comment => comment.id !== commentId);
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(sendCommentToServer.fulfilled, (state, action) => {
        const { pictureId, text, createdAt, id, authorId, authorName } = action.payload;
        if (!state[pictureId]) state[pictureId] = [];
        state[pictureId].push({ pictureId, text, createdAt, id, authorId, authorName });
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        const id = action.payload;
        for (const picId in state) {
          if (Array.isArray(state[picId])) {
            state[picId] = state[picId].filter(comment => comment.id !== id);
          }
        }
      });
  }
})

// export const { addCommentLocal, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;