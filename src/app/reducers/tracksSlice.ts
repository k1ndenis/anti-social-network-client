import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Track {
  id: string,
  author: string,
  title: string,
  url: string
}

interface TracksState {
  tracks: Track[]
}

interface SendTrackPayload {
  id: string,
  author: string,
  title: string,
  url: string
}

const initialState: TracksState = {
  tracks: []
}

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTracks = createAsyncThunk<Track[]>(
  "tracks/fetchTracks",
  async () => {
    const res = await fetch(`${apiUrl}/api/music`);
    if (!res.ok) throw new Error("Failed to fetch tracks");
    const data: Track[] = await res.json();
    return data;
  }
);

export const sendTrackToServer = createAsyncThunk<Track, SendTrackPayload>(
  "tracks/sendTrackToServer",
  async ({ id, author, title, url }) => {
    const response = await fetch(`${apiUrl}/api/music`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, author, title, url })
    });
    if (!response.ok) throw new Error("Failed to add track");
    return (await response.json() as Track);
  }
)

export const deleteTrackFromServer = createAsyncThunk<string, string>(
  "tracks/deleteTrackFromServer",
  async (id) => {
    const response = await await fetch(`${apiUrl}/api/music`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Failed to delete track");
    return id;
  }
)
  
const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
      })
      .addCase(sendTrackToServer.fulfilled, (state, action) => {
        const { id, author, title, url } = action.payload;
        if (!state.tracks) state.tracks = [];
        state.tracks.unshift({ id, author, title, url });
      })
      .addCase(deleteTrackFromServer.fulfilled, (state, action) => {
        const id = action.payload;
        state.tracks = state.tracks.filter(track => track.id !== id);
      })
  }
})

export default tracksSlice.reducer;