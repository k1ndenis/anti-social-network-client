import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Picture {
  id: string;
  url: string;
}

interface PicturesState {
  pictures: Picture[];
}

interface SendPicturePayload {
  id: string;
  url: string;
}

const initialState: PicturesState = {
  pictures: []
}

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPictures = createAsyncThunk<Picture[]>(
  "pictures/fetchPictures",
  async () => {
    const res = await fetch(`${apiUrl}/api/pictures`);
    if (!res.ok) throw new Error("Failed to fetch pictures");
    const data: Picture[] = await res.json();
    return data;
  }
);

export const sendPictureToServer = createAsyncThunk<Picture, SendPicturePayload>(
  "pictures/sendPictureToServer",
  async ({ id, url }: SendPicturePayload) => {
    const response = await fetch(`${apiUrl}/api/pictures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url })
    });
    if (!response.ok) throw new Error("Failed to add picture");
    return (await response.json() as Picture);
  }
);

export const deletePictureFromServer = createAsyncThunk<string, string>(
  "pictures/deletePictureFromServer",
  async (id) => {
    const response = await fetch(`${apiUrl}/api/pictures/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
      throw new Error("Failed to delete picture");
    }
    return id;
  }
)

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {
    addPicture: (state, action: PayloadAction<Picture>) => {
      state.pictures.push(action.payload);
    },
    deletePicture: (state, action: PayloadAction<string>) => {
      state.pictures = state.pictures.filter(pic => pic.id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.pictures = action.payload;
      })
      .addCase(sendPictureToServer.fulfilled, (state, action) => {
        const { id, url } = action.payload;
        if (!state.pictures) state.pictures = [];
        state.pictures.unshift({ id, url });
      })
      .addCase(deletePictureFromServer.fulfilled, (state, action) => {
        const id = action.payload;
        state.pictures = state.pictures.filter(pic => pic.id !== id);
      })
  }
});

export default picturesSlice.reducer;