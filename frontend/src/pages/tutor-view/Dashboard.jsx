// Dashboard.jsx
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = {
    totalCourses: 5,
    activeStudents: 124,
    assessmentsCreated: 18,
    avgPerformance: 76.5
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Dr. Smith</h1>
        <p className="text-gray-500">Here&#39;s your teaching overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Course Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/courses')}
        >
          <div className="text-4xl font-bold text-gray-700">{stats.totalCourses}</div>
          <div className="text-gray-500 mt-2">Courses</div>
          <div className="text-sm text-green-500 mt-1">+2 this semester</div>
        </div>

        {/* Student Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-4xl font-bold text-gray-700">{stats.activeStudents}</div>
          <div className="text-gray-500 mt-2">Active Students</div>
          <div className="text-sm text-blue-500 mt-1">84% engagement</div>
        </div>

        {/* Assessment Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/assessments')}
        >
          <div className="text-4xl font-bold text-gray-700">{stats.assessmentsCreated}</div>
          <div className="text-gray-500 mt-2">CATs Created</div>
          <div className="text-sm text-purple-500 mt-1">3 scheduled</div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-4xl font-bold text-gray-700">{stats.avgPerformance}%</div>
          <div className="text-gray-500 mt-2">Avg. Performance</div>
          <div className="text-sm text-green-500 mt-1">↑ 2.4% from last term</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="text-2xl mr-4">📝</div>
            <div className="flex-1">
              <p className="text-gray-800">Created &quotMidterm Exam&quot for CS101</p>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-2xl mr-4">📚</div>
            <div className="flex-1">
              <p className="text-gray-800">Uploaded &quotAdvanced Algorithms&quot notes</p>
              <span className="text-sm text-gray-400">Yesterday</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-2xl mr-4">👥</div>
            <div className="flex-1">
              <p className="text-gray-800">32 students completed Week 5 Quiz</p>
              <span className="text-sm text-gray-400">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;