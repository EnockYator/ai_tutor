/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorCourses, getAllCourses, enrollCourse, createCourse, fetchCourseById, fetchCourseByTitle, fetchCourseByCode, getStudentCourses } from '../store/course-slice';

// Create CourseContext
const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
    const dispatch = useDispatch();
    const courseState = useSelector((state) => state.course);
    const { courses, enrolledCourses, course, isLoading, error } = courseState;

    const actions = {
        createCourse: (courseData) => dispatch(createCourse(courseData)),
        enrollCourse: (courseId) => dispatch(enrollCourse(courseId)),
        getTutorCourses: (tutorId) => dispatch(getTutorCourses(tutorId)),
        getAllCourses: () => dispatch(getAllCourses()),
        getStudentCourses: () => dispatch(getStudentCourses()),
        fetchCourseById: (courseId) => dispatch(fetchCourseById(courseId)),
        fetchCourseByTitle: (title) => dispatch(fetchCourseByTitle(title)),
        fetchCourseByCode: (code) => dispatch(fetchCourseByCode(code)),
    };

    return (
        <CourseContext.Provider value={{ courses, enrolledCourses, course, isLoading, error, actions }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook to use course context
// eslint-disable-next-line react-refresh/only-export-components
export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
};
