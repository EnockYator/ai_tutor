import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../../axios"; // axiosInstance which allows sending cookies to backend

const initialState = {
  allRequests: [], // To store the list of requests
  newRequest: null, // To store new request
  requesById: null,
  deletedRequest: null,
  isLoading: false,
  error: null,
};

// Create a new request (POST: /request-note)
export const requestNote = createAsyncThunk(
  'requests/request-note',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://doctorsnote-backend.onrender.com/api/requests/request-note',
        formData,
        { withCredentials: true }
      );
      return response.data; // Response will contain the new request at response.data.newRequest
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to request for note. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get all requests (GET: /get-request)
export const getAllRequests = createAsyncThunk(
  'requests/get-requests',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://doctorsnote-backend.onrender.com/api/requests/get-requests',
        { withCredentials: true }
      );
      return response.data; // Response will contain all requests at response.data.allRequests
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch requests. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get request by ID (GET: /:id)
export const getRequestById = createAsyncThunk(
  `requests/`,
  async (requestId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://doctorsnote-backend.onrender.com/api/requests/${requestId}`,
        { withCredentials: true }
      );
      return response.data; // Response will contain the requested note at response.data.requestById
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch the request. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Delete request by ID (DELETE: /:id)
export const deleteRequest = createAsyncThunk(
  'requests/deleteRequest',
  async (requestId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://doctorsnote-backend.onrender.com/api/requests/${requestId}`,
        { withCredentials: true }
      );
      return response.data; // The response will contain a success message
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the request. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Redux slice for note requests

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    // Reset request data state
    resetRequest(state) {
      state.allRequests = [];
      state.deletedRequest = null;
      state.requesById = null;
      state.newRequest = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle request note action
      .addCase(requestNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.newRequest = null; // Clear new request data when request note is pending
      })
      .addCase(requestNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.newRequest = action.payload;
      })
      .addCase(requestNote.rejected, (state, action) => {
        state.isLoading = false;
        state.newRequest = null;
        state.error = action.payload;
      })

      // Handle get all requests action
      .addCase(getAllRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload; // Store all requests in the state
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle get request by ID action
      .addCase(getRequestById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRequestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.request = action.payload; // Store the requested note by ID
      })
      .addCase(getRequestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle delete request action
      .addCase(deleteRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload._id // Remove the deleted request from the array
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequest} = requestSlice.actions;
export default requestSlice.reducer;
