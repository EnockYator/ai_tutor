/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, lazy, Suspense, memo } from 'react';
import { useCourse } from '@/contexts/CourseContext';
import { useToast } from '@/hooks/use-toast';
import { FixedSizeList as List } from 'react-window';

// Lazy load the modal component
const CreateCourseModal = lazy(() => import('./CreateCourseModal'));

const CourseItem = memo(({ data, index, style }) => {
  const course = data[index];
  return (
    <div style={style}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
        <div className="p-6 h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{course.code}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {course.enrolledStudents?.length || 0} students
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
          <div className="flex gap-6 mb-6">
            <div>
              <span className="block text-2xl font-bold text-gray-700">{course.materials?.length || 0}</span>
              <span className="text-gray-500">Materials</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-gray-700">{course.assessments?.length || 0}</span>
              <span className="text-gray-500">CATs</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-400">
              Last updated: {new Date(course.updatedAt).toLocaleDateString()}
            </span>
            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CourseItem.displayName = "CourseItem";

const Courses = () => {
  const { courses, isLoading, error, actions } = useCourse();
  const { toast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    courseFile: null
  });
  const [fileError, setFileError] = useState('');

  const itemSize = 320;

  const fetchCourses = useCallback(() => {
    actions.getTutorCourses();
  }, [actions]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        toast({
          title: "Error",
          description: error,
          className: "bg-toastError text-white max-w-md h-16 z-50",
          duration: 3000,
        });
      }, 100);
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
    if (!course.title || !course.code) {
      return "Title and code are required!";
    }
    if (!course.courseFile) {
      return "Please upload course notes";
    }
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
  
      // Clear the file from memory immediately after creating FormData
      setNewCourse(prev => ({ ...prev, courseFile: null }));
  
      await actions.createCourse(formData);
      
      toast({
        title: "Success",
        description: "Course created successfully",
        className: "bg-toastSuccess text-white max-w-md h-16 z-50",
        duration: 3000,
      });
  
      setShowCreateModal(false);
      setNewCourse({ title: '', code: '', courseFile: null });
      setFileError('');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    } finally {
      // Ensure loading state is always reset
    }
  }, [newCourse, actions, toast, validateCourse]);

  if (isLoading && !courses) {
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

        <div className="course-list-container">
          <List
            height={600}
            itemCount={courses.length}
            itemSize={itemSize}
            width={'100%'}
            itemData={courses}
          >
            {(props) => <CourseItem {...props} />}
          </List>
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
