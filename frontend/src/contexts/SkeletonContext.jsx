/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";

const SkeletonContext = createContext();

export const SkeletonProvider = ({ children }) => {
    const [loadingSections, setLoadingSections] = useState({}); // Tracks all loading sections
    console.log(`Initial loading sections: ${loadingSections}`);

    const loadSection = useCallback((section, isLoading) => {
        console.log(`Updating ${section} section's loading state to: "${isLoading}`);
        setLoadingSections((prev) => {
            console.log('Previous loading sections:', prev); 
            // Update loadingSections
            const newLoadingSections = { ...prev, [section]: isLoading };
            console.log('New loading sections:', newLoadingSections); 
            return newLoadingSections;
        });
    }, []);

    return (
        <SkeletonContext.Provider value={{ loadingSections, loadSection }}>
            {children}
        </SkeletonContext.Provider>
    )
};

export const useSkeleton = () => {
    const context = useContext(SkeletonContext);
    if (!context) {
        console.error('useSkeleton must be used within a SkeletonProvider');
    }
    return context;
};
