/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useDispatch, useSelector } from 'react-redux';
import { register, loginUser, setAuth, logoutUser } from './../store/auth-slice';
import { createContext, useContext } from 'react';



// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider to wrap app or specific components
export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Get authentication state from Redux
    const authState = useSelector((state) => state.auth);
    
    // Extract specific values for convenience
    const isAuthenticated = authState.isAuthenticated;
    const user = authState.user || null; 

    // console.log("user: " + user)
    // console.log("user Name: " + userName)
    // console.log("isAuthenticated: " + isAuthenticated)

    // Define actions
    const actions = {
        register: (userFormData) => dispatch(register(userFormData)),
        loginUser: (formData) => dispatch(loginUser(formData)),
        logout: () => dispatch(logoutUser()),
        setAuth: (data) => dispatch(setAuth(data)),
    };

    // Prevent premature loading
    if (authState.isAuthenticated && !authState.user) {
    return <div className="absolute top-4 left-3">Loading...</div>; 
}

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, actions }}>
            {children}
        </AuthContext.Provider>
    );
};


// Custom hook for AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UseAuth must be used within an AuthProvider');
    }
    return context;
};