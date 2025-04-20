import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../../../axios";

const initialState = {
    courses: [],
    enrolledCourses: [],
    isLoading: false,
    error: null,
};

// Create new course (tutor only)
export const createCourse = createAsyncThunk(
    'course/create',
    async (courseData, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('title', courseData.title);
            formData.append('code', courseData.code);
            formData.append('file', courseData.courseFile);
            
            const response = await axiosInstance.post('/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create course"
            );
        }
    }
);

// Enroll in course (student only)
export const enrollCourse = createAsyncThunk(
    'course/enroll',
    async (courseId, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/enroll`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to enroll in course"
            );
        }
    }
);

// Get courses for tutor
export const getTutorCourses = createAsyncThunk(
    'course/tutorCourses',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/courses/tutor');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch courses"
            );
        }
    }
);

// Get enrolled courses for student
export const getStudentCourses = createAsyncThunk(
    'course/studentCourses',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/courses/student');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch enrolled courses"
            );
        }
    }
);

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetCourseState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Create Course
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses.push(action.payload.course);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Enroll in Course
            .addCase(enrollCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(enrollCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.enrolledCourses.push(action.payload.course);
            })
            .addCase(enrollCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Tutor Courses
            .addCase(getTutorCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTutorCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.courses;
            })
            .addCase(getTutorCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Student Courses
            .addCase(getStudentCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getStudentCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.enrolledCourses = action.payload.courses;
            })
            .addCase(getStudentCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;