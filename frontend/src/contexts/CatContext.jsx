/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useDispatch, useSelector } from 'react-redux';
import { getStudentCats, getTutorCats, createCat, submitCat } from './../store/cat-slice';
import { createContext, useContext } from 'react';

// Create the CatContext
const CatContext = createContext(null);

// CatProvider to wrap app or specific components
export const CatProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Get cat state from Redux
    const catState = useSelector((state) => state.cat);
    
    // Extract specific values for convenience
    const cats = catState.cats || [];
    const isLoading = catState.isLoading;
    const error = catState.error;
    
    // Define actions
    const actions = {
        getStudentCats: () => dispatch(getStudentCats()),
        getTutorCats: () => dispatch(getTutorCats()),
        createCat: (catData) => dispatch(createCat(catData)),
        submitCat: (id, answers) => dispatch(submitCat(id, answers)),
    };

    // Prevent premature loading
    if (isLoading && !cats) {
        return <div className="absolute top-4 left-3">Loading cats/assessments...</div>;
    }

    return (
        <CatContext.Provider value={{ cats, isLoading, error, actions }}>
            {children}
        </CatContext.Provider>
    );
};

// Custom hook for CatContext
export const useCat = () => {
    const context = useContext(CatContext);
    if (!context) {
        throw new Error('useCat must be used within a CatProvider');
    }
    return context;
};