import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios";

const initialState = {
    newCourse: { title: '', code: '', file: null },
    courses: [],
    enrolledCourses: [],
    course: null,
    isLoading: false,
    error: null,
};


// Create new course (tutor only)
export const createCourse = createAsyncThunk(
    'course/create',
    async (courseData, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('course_title', courseData.title);
            formData.append('course_code', courseData.code);
            formData.append('course_notes', courseData.courseFile);
            
            const response = await axiosInstance.post('/courses/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create course");
        }
    }
);

// Enroll in course (student only)
export const enrollCourse = createAsyncThunk(
    'course/enroll',
    async (courseId, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/courses/enroll', { course_id: courseId });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to enroll in course");
        }
    }
);

// Get tutor's courses
export const getTutorCourses = createAsyncThunk(
    'course/tutorCourses',
    async (tutorId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/courses/tutor/${tutorId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch tutor's courses");
        }
    }
);

// Get all available courses
export const getAllCourses = createAsyncThunk(
    'course/allCourses',
    async (studentId, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/courses/all', {student_id: studentId});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
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
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch enrolled courses");
        }
    }
);

// Fetch course by ID
export const fetchCourseById = createAsyncThunk(
    'course/fetchById',
    async (courseId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/courses/${courseId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch course");
        }
    }
);

// Fetch course by title
export const fetchCourseByTitle = createAsyncThunk(
    'course/fetchByTitle',
    async (courseTitle, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/courses/by-title/`, { params: { course_title: courseTitle } });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch course");
        }
    }
);

// Fetch course by code
export const fetchCourseByCode = createAsyncThunk(
    'course/fetchByCode',
    async (courseCode, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/courses/by-code/`, { params: { course_code: courseCode } });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch course");
        }
    }
);

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetCourseState: () => initialState,
        setNewCourse: (state, action) => {
            state.newCourse = { ...state.newCourse, ...action.payload };
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
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
                state.courses.push(action.payload);
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
                state.enrolledCourses.push(action.payload);
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
                // backend returns { courses: [...] }
                if (action.payload.courses) {
                    state.courses = action.payload.courses;
                } else if (Array.isArray(action.payload)) {
                    // fallback if it’s just an array
                    state.courses = action.payload;
                }
            })
            .addCase(getTutorCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get All Courses
            .addCase(getAllCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.courses;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Student's Courses
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
            })
            
            // Fetch Course by ID
            .addCase(fetchCourseById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Course by Title
            .addCase(fetchCourseByTitle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourseByTitle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseByTitle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Course by Code
            .addCase(fetchCourseByCode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourseByCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseByCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCourseState, setNewCourse, setError } = courseSlice.actions;
export default courseSlice.reducer;
