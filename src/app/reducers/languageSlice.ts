import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = 'ru' | 'en'

const initialState = 'ru' as Language;

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (_, action: PayloadAction<Language>) => {
      return action.payload;
    }
  }
})

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;