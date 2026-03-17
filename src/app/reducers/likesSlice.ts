import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Like {
  pictureId: string;
  id: string;
  userId: string;
  authorName: string
}

interface LikesState {
  [pictureId: string]: Like[]
}

interface SendLikePayload {
  pictureId: string;
  id: string;
  userId: string;
  authorName: string
}

const initialState: LikesState = {}

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchLikes = createAsyncThunk<LikesState>(
  "likes/fetchLikes",
  async () => {
    const res = await fetch(`${apiUrl}/api/likes`);
    if (!res.ok) throw new Error("Failed to fetch likes");
    const data = await res.json();
    return data;
  }
)

export const sendLikeToServer = createAsyncThunk<Like, SendLikePayload>(
  "likes/sendLikeToServer",
  async ({ pictureId, id, userId, authorName }: SendLikePayload) => {
    const response = await fetch(`${apiUrl}/api/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pictureId, id, userId, authorName })
    })
    if (!response.ok) {
      throw new Error("Failed to send like")
    }
    return (await response.json()) as Like;
  }
)

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLikes.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(sendLikeToServer.fulfilled, (state, action) => {
        const { pictureId, id, userId, authorName } = action.payload;
        if (!state[pictureId]) state[pictureId] = [];
        const index = state[pictureId].findIndex(like => like.userId === userId);
        if (index !== -1) {
          state[pictureId].splice(index, 1)
        } else {
          state[pictureId].push({ pictureId, id, userId, authorName });
        }
      })
  }
})

export default likesSlice.reducer;