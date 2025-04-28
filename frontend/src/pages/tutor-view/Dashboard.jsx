// Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import { useCat } from '@/contexts/CatContext';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { courses, isLoading, error, actions } = useCourse();
  
  // Memoized versions to prevent re-renders
  const tutorId = user?.id;

  const fetchCourses = useCallback(() => {
    if (tutorId) {
      actions.getTutorCourses(tutorId);
    }
  }, [actions, tutorId]);

  useEffect(() => {
    fetchCourses();
  }, []);


  const stats = {
    totalCourses: 2,
    activeStudents: 2,
    catsCreated: 2
  };

  

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.full_name}</h1>
        <p className="text-blue-600">Here&#39;s your overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Course Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/courses')}
        >
          <div className="text-4xl font-bold text-blue-600">{courses.length}</div>
          <div className="text-gray-500 mt-2">Created Courses</div>
        </div>

        {/* Student Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-4xl font-bold text-green-600">{stats.totalCourses}</div>
          <div className="text-gray-500 mt-2">Total Students</div>
        </div>

        {/* Assessment Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/assessments')}
        >
          <div className="text-4xl font-bold text-orange-600">{stats.catsCreated}</div>
          <div className="text-gray-500 mt-2">CATs Created</div>
        </div>


      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="text-2xl mr-4">📝</div>
            <div className="flex-1">
              <p className="text-gray-800">Created Simulation & Modeling</p>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-2xl mr-4">📚</div>
            <div className="flex-1">
              <p className="text-gray-800">Uploaded Simulation & Modeling notes</p>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
};

export default Dashboard;