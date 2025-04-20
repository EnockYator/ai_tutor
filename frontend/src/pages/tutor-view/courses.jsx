import { useState, useEffect } from 'react';
import { useCourse } from '@/contexts/CourseContext';
import { useToast } from '@/hooks/use-toast';

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

  useEffect(() => {
    // Fetch courses when component mounts
    actions.fetchCourses();
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    }
  }, [error]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (validTypes.includes(file.type)) {
        setNewCourse({...newCourse, courseFile: file});
      } else {
        setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      }
    }
  };

  const validateCourse = (course) => {
    if (!course.title || !course.code) {
      return "Title and code are required!";
    }
    if (!course.courseFile) {
      return "Please upload course notes";
    }
    return null;
  };

  const handleCreateCourse = async () => {
    const validationError = validateCourse(newCourse);
    
    if (validationError) {
      setFileError(validationError);
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('code', newCourse.code);
      formData.append('file', newCourse.courseFile);

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
        description: "Failed to create course",
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    }
  };

  if (isLoading && !courses) {
    return <div className="flex justify-center items-center h-screen">Loading courses...</div>;
  }

  return (
    <div className="relative p-8 max-w-7xl mx-auto">
      {/* Blur overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      {/* Main content */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">{course.code}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {course.students || 0} students
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
                
                <div className="flex gap-6 mb-6">
                  <div>
                    <span className="block text-2xl font-bold text-gray-700">{course.materials || 0}</span>
                    <span className="text-gray-500">Materials</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-gray-700">{course.assessments || 0}</span>
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
          ))}
        </div>
      </div>

      {/* Create Course Modal - remains the same as in your original code */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* ... modal content remains unchanged ... */}
        </div>
      )}
    </div>
  );
};

export default Courses;