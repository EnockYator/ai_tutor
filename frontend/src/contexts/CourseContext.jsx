/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useDispatch, useSelector } from 'react-redux';
import { create_course, fetch_course_by_code, fetch_course_by_title, setCourse } from '@/store/course-slice';
import { createContext, useContext } from 'react';



// Create the CourseContext
const CourseContext = createContext(null);

// CourseProvider to wrap app or specific components
export const CourseProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Get course state from Redux
    const courseState = useSelector((state) => state.course);
    
    // Extract specific values for convenience
    const course = courseState.course || null; 
    
     // console.log("course: " , course)

    // Define actions
    const actions = {
        create_course: (course_data) => dispatch(create_course(course_data)),
        fetch_course_by_code: (course_code) => dispatch(fetch_course_by_code(course_code)),
        fetch_course_by_title: (course_title) => dispatch(fetch_course_by_title(course_title)),
        setCourse: (data) => dispatch(setCourse(data)),
    };

    // Prevent premature loading
    if (!courseState.user) {
    return <div className="absolute top-4 left-3">Loading...</div>; 
}

    return (
        <CourseContext.Provider value={{ course, actions }}>
            {children}
        </CourseContext.Provider>
    );
};


// Custom hook for CourseContext
export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourse must be used within an CourseProvider');
    }
    return context;
};