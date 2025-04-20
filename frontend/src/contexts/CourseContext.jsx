/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useDispatch, useSelector } from 'react-redux';
import { getStudentCourses, getTutorCourses, createCourse, enrollCourse } from './../store/course-slice';
import { createContext, useContext } from 'react';

// Create the CourseContext
const CourseContext = createContext(null);

// CourseProvider to wrap app or specific components
export const CourseProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Get course state from Redux
    const courseState = useSelector((state) => state.course);
    
    // Extract specific values for convenience
    const courses = courseState.courses || [];
    const isLoading = courseState.isLoading;
    const error = courseState.error;
    
    // Define actions
    const actions = {
        getStudentCourses: () => dispatch(getStudentCourses()),
        getTutorCourses: () => dispatch(getTutorCourses()),
        enrollCourse: (courseData) => dispatch(enrollCourse(courseData)),
        createCourse: (courseData) => dispatch(createCourse(courseData)),
        //updateCourse: (id, courseData) => dispatch(updateCourse(id, courseData)),
        //deleteCourse: (id) => dispatch(deleteCourse(id)),
    };

    // Prevent premature loading
    if (isLoading && !courses) {
        return <div className="absolute top-4 left-3">Loading courses...</div>;
    }

    return (
        <CourseContext.Provider value={{ courses, isLoading, error, actions }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook for CourseContext
export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
};