/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, lazy, Suspense, memo } from 'react';
import { useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Lazy load the modal
const CreateCourseModal = lazy(() => import('./CreateCourseModal'));

const CourseItem = memo(({ course }) => {
  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const { user } = useAuth();
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex justify-between items-start p-4 border-b text-white">
        <div>
          <h2 className="font-bold text-lg">{course.course_title}</h2>
          <p className="text-blue-100">{course.course_code}</p>
        </div>
      </div>

      {/* Course Body */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{user.full_name}</p>
          </div>
        </div>

      {/* Notes Summary */}
      <div className='mb-4 flex flex-col  pl-5'>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Course Summary</h4>
        <div className='flex flex-row gap-8'>
          <div className='flex flex-col'>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="bg-gray-50 py-1 rounded-full text-sm">{course.course_notes.length || 0} {course.course_notes.length === 1 ? 'Copy' : 'Copies'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cats</p>
            <p className="bg-gray-50 py-1 rounded-full text-sm">{course.course_file ? course.course_file.name : 'No CAT Created'}</p>
          </div>
        </div>
      </div>
      

      {/* Footer with Action Buttons */}
      <div className="flex justify-between items-center p-4 border-t">
        <span className='text-sm text-gray-500'>Created On: {formattedDate}</span>
      </div>
    </div>
  </div>
  );
});



const Courses = () => {
  const { courses, isLoading, error, actions, setError } = useCourse();
  const { toast } = useToast();
  const { user } = useAuth();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', code: '', courseFile: null });
  const [fileError, setFileError] = useState('');

  const tutorId = user?.id;
  console.log("tutorId: ", tutorId);

  const fetchCourses = useCallback(() => {
    if (tutorId) {
      actions.getTutorCourses(tutorId);
    }
  }, [actions, tutorId]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        toast({
          title: "Error",
          description: error,
          className: "bg-toastError text-white max-w-md h-16 z-50",
          duration: 3000,
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [error, toast]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    setFileError('');
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError('File size should be less than 10MB');
        return;
      }
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (validTypes.includes(file.type)) {
        setNewCourse(prev => ({ ...prev, courseFile: file }));
      } else {
        setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      }
    }
  }, []);

  const validateCourse = useCallback((course) => {
    if (!course.title || !course.code) return "Title and code are required!";
    if (!course.courseFile) return "Please upload course notes";
    return null;
  }, []);

  const handleCreateCourse = useCallback(async () => {
    const validationError = validateCourse(newCourse);
    if (validationError) {
      setFileError(validationError);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('code', newCourse.code);
      formData.append('file', newCourse.courseFile);

      await actions.createCourse(formData);

      if (response.status === 201) {
        // If course is created successfully, show toast
        toast({
          title: "Success",
          description: "Course created successfully",
          className: "bg-toastSuccess text-white max-w-md h-16 z-50",
          duration: 3000,
        });

      // Reset form and close modal
      setShowCreateModal(false);
      setNewCourse({ title: '', code: '', courseFile: null });
      setError('');
      fetchCourses(); // Refresh the course list
      }

      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    }
  }, [newCourse, actions, toast, validateCourse, fetchCourses]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading courses...</div>;
  }

  return (
    <div className="relative p-8 max-w-7xl mx-auto">
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <div className={`${showCreateModal ? 'pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            + Create New Course
          </button>
        </div>

        {/* Render courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xlg:grid-cols-3 gap-8">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No courses found.</div>
          )}
        </div>
      </div>

      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center z-50">Loading modal...</div>}>
        {showCreateModal && (
          <CreateCourseModal
            newCourse={newCourse}
            fileError={fileError}
            isLoading={isLoading}
            setNewCourse={setNewCourse}
            setShowCreateModal={setShowCreateModal}
            setFileError={setFileError}
            handleFileChange={handleFileChange}
            handleCreateCourse={handleCreateCourse}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Courses;
