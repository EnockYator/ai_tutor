/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useDispatch, useSelector } from 'react-redux';
import { generateQuiz, getQuizHistory, submitQuiz } from './../store/quiz-slice';
import { createContext, useContext } from 'react';

// Create the QuizContext
const QuizContext = createContext(null);

// QuizProvider to wrap app or specific components
export const QuizProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Get quiz state from Redux
    const quizState = useSelector((state) => state.quiz);
    
    // Extract specific values for convenience
    const quizzes = quizState.quizzes || [];
    const isLoading = quizState.isLoading;
    const error = quizState.error;
    
    // Define actions
    const actions = {
        getQuizHistory: () => dispatch(getQuizHistory()),
        generateQuiz: (quizData) => dispatch(generateQuiz(quizData)),
        submitQuiz: (quizData) => dispatch(submitQuiz(quizData)),
        //updateQuiz: (id, quizData) => dispatch(updateQuiz(id, quizData)),
        //deleteQuiz: (id) => dispatch(deleteQuiz(id)),
    };

    // Prevent premature loading
    if (isLoading && !quizzes) {
        return <div className="absolute top-4 left-3">Loading quizzes...</div>;
    }

    return (
        <QuizContext.Provider value={{ quizzes, isLoading, error, actions }}>
            {children}
        </QuizContext.Provider>
    );
};

// Custom hook for QuizContext
export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};