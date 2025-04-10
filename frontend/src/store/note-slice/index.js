import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

// Async thunk for requesting a note
export const requestNote = createAsyncThunk(
  "notes/requestNote",
  async (noteData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://doctorsnote-backend.onrender.com/api/notes/request",
        noteData
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to request note. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(requestNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;