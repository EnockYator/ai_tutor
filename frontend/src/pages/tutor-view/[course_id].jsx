/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Lazy load heavy components if needed
const EditCourseModal = lazy(() => import('./EditCourseModal'));

const CourseDetails = () => {
const { id } = useParams();
const { user } = useAuth();
const { actions, selectedCourse, setSelectedCourse } = useCourse();
const { toast } = useToast();

const [showEditModal, setShowEditModal] = useState(false);

const fetchCourseDetails = useCallback(async () => {
try {
    const course = await actions.getSingleCourse(id);
    setSelectedCourse(course);
} catch (error) {
    toast({
    title: "Error",
    description: error.message || "Failed to load course details",
    className: "bg-toastError text-white max-w-md h-16 z-50",
    duration: 3000,
    });
}
}, [id, actions, toast, setSelectedCourse]);

useEffect(() => {
if (id) {
    fetchCourseDetails();
}
}, [id, fetchCourseDetails]);

if (!selectedCourse) {
return (
    <div className="flex justify-center items-center h-screen text-gray-500">
    Loading course details...
    </div>
);
}

const formattedDate = new Date(selectedCourse.created_at).toLocaleDateString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric'
});

return (
<div className="p-8 max-w-6xl mx-auto relative">
    {/* Blur background when modal open */}
    {showEditModal && <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40" />}

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
    <div>
        <h1 className="text-3xl font-bold text-gray-800">{selectedCourse.course_title}</h1>
        <p className="text-gray-500">{selectedCourse.course_code}</p>
    </div>
    <button
        onClick={() => setShowEditModal(true)}
        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
    >
        Edit Course
    </button>
    </div>

    {/* Course Info Card */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <h2 className="text-2xl font-bold">{selectedCourse.course_title}</h2>
        <p className="text-blue-100">{selectedCourse.course_code}</p>
    </div>

    <div className="p-6 space-y-6">
        {/* Author Info */}
        <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <div>
            <p className="text-gray-500 text-sm">Created by</p>
            <p className="font-medium">{user?.full_name || 'Unknown User'}</p>
        </div>
        </div>

        {/* Course Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes</h4>
            <p className="bg-gray-50 py-2 px-4 rounded-full text-gray-700">
            {selectedCourse.course_notes.length || 0} {selectedCourse.course_notes.length === 1 ? 'Copy' : 'Copies'}
            </p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">CATS</h4>
            <p className="bg-gray-50 py-2 px-4 rounded-full text-gray-700">
            {selectedCourse.course_file?.name || 'No CAT Uploaded'}
            </p>
        </div>
        </div>

        {/* Created Date */}
        <div className="text-sm text-gray-500">
        Created On: {formattedDate}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
        <Link
            to={`/courses/${selectedCourse.id}/notes`}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
            View Notes
        </Link>
        <Link
            to={`/assessments/${selectedCourse.id}`}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
        >
            View Assessments
        </Link>
        </div>
    </div>
    </div>

    {/* Lazy loaded Edit Modal */}
    <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center z-50">Loading...</div>}>
    {showEditModal && (
        <EditCourseModal
        course={selectedCourse}
        onClose={() => setShowEditModal(false)}
        refreshCourse={fetchCourseDetails}
        />
    )}
    </Suspense>
</div>
);
};

export default CourseDetails;
