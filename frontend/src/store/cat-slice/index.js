import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../../../axios";

const initialState = {
    cats: [],          // For tutors to see all their CATs
    studentCats: [],   // For students to see available CATs
    currentCat: null,  // Currently viewed/taken CAT
    isLoading: false,
    error: null,
};

// Create new CAT (tutor only)
export const createCat = createAsyncThunk(
    'cat/create',
    async (catData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/cats', catData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create CAT"
            );
        }
    }
);

// Get CATs for tutor
export const getTutorCats = createAsyncThunk(
    'cat/tutorCats',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/cats/tutor');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch CATs"
            );
        }
    }
);

// Get available CATs for student
export const getStudentCats = createAsyncThunk(
    'cat/studentCats',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/cats/student');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch available CATs"
            );
        }
    }
);

// Submit CAT answers (student)
export const submitCat = createAsyncThunk(
    'cat/submit',
    async ({ catId, answers }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/cats/${catId}/submit`, { answers });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to submit CAT"
            );
        }
    }
);

const catSlice = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        resetCatState: () => initialState,
        setCurrentCat: (state, action) => {
            state.currentCat = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create CAT
            .addCase(createCat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cats.push(action.payload.cat);
            })
            .addCase(createCat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Tutor CATs
            .addCase(getTutorCats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTutorCats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cats = action.payload.cats;
            })
            .addCase(getTutorCats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Student CATs
            .addCase(getStudentCats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getStudentCats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.studentCats = action.payload.cats;
            })
            .addCase(getStudentCats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Submit CAT
            .addCase(submitCat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitCat.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update the CAT status in studentCats
                state.studentCats = state.studentCats.map(cat => 
                    cat.id === action.payload.catId ? 
                    { ...cat, isSubmitted: true, score: action.payload.score } : 
                    cat
                );
            })
            .addCase(submitCat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCatState, setCurrentCat } = catSlice.actions;
export default catSlice.reducer;