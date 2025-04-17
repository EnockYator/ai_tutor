
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../../../axios"; // axiosInstance which allow sending cookies to backend

const initialState = {
    course : null // To store course data
};


// create course by tutor
export const create_course = createAsyncThunk(
    'courses',
    async (course_data, thunkAPI) => {
      try {
        const response = await axiosInstance.post(
          '/courses',
          course_data
        );
        return response.data; // The message will be in response.data.message
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );


  // fetch course by title
  export const fetch_course_by_title = createAsyncThunk(
    'courses/by-title',
    async (course_title, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/courses/by-title',
                `course_title=${encodeURIComponent(course_title)}`
            );
            return {
              course: response.data.course
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail || "Failed to fetch course."
            );
        }
    }
);

  // fetch course by code
  export const fetch_course_by_code = createAsyncThunk(
    'courses/by-code',
    async (course_title, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/courses/by-code',
                `course_code=${encodeURIComponent(course_title)}`
            );
            return {
              course: response.data.course
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail || "Failed to fetch course."
            );
        }
    }
);

  // Enroll course



  // Redux slice for authentication 

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      // On successful course enrolment
      setCourse(state, action) {
        state.course = action.payload.course;
      }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(create_course.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(create_course.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload.course;
            })
            .addCase(create_course.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Store the error message
            })
            
            // fetch course by code
            .addCase(fetch_course_by_code.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(fetch_course_by_code.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload.course;
            })
            .addCase(fetch_course_by_code.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; 
            })

            // fetch course by title
            .addCase(fetch_course_by_title.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(fetch_course_by_title.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload.course;
            })
            .addCase(fetch_course_by_title.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; 
            })

    },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;



