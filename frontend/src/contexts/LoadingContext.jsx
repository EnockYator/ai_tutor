/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext} from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    // const [loadedImages, setLoadedImages] = useState(0);
    // const totalImages = 2; // total number of images to track
    const fallbackTimeout = 5000 // Fallback after 5 seconds

    // const handleImageLoad = () => {
    //     setLoadedImages((prev) => prev + 1);
    // };

    // useEffect(() => {
    //     if (loadedImages === totalImages) {
    //         setLoading(false);            
    //     }
    // }, [loadedImages]);

    useEffect(() => {
        // Set fallback time
        const timer = setTimeout(() => setLoading(false), fallbackTimeout);
        return () => clearInterval(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ loading/*, handleImageLoad*/ }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);