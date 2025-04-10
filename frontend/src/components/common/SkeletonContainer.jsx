/* eslint-disable react/prop-types */

import { useSkeleton } from "@/contexts/SkeletonContext";

const SkeletonContainer = ({ section, children, className }) => {
    const {loadingSections} = useSkeleton();
    console.log(`Loading state for "${section}" section :`, loadingSections[section] || false);
    const isLoading = loadingSections[section] || false;

    console.log(`Loading state for "${section}" section :`, isLoading);

    return (
        <div className={className}>
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">Loading...</div>
            ) : (
                children
            )}
        </div>
    )
};

export default SkeletonContainer;