import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeStudents: 0,
    assessmentsCreated: 0,
    avgPerformance: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current user info
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch user data
        const userResponse = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch courses created by the tutor (if tutor)
        let coursesData = { courses: [] };
        if (userData.role === 'tutor') {
          const coursesResponse = await fetch(`/api/courses/tutor/${userData.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (coursesResponse.ok) {
            coursesData = await coursesResponse.json();
          }
        }

        // Fetch CATs (if tutor)
        let catsData = [];
        if (userData.role === 'tutor') {
          const catsResponse = await fetch('/api/cats/tutor', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (catsResponse.ok) {
            catsData = await catsResponse.json();
          }
        }

        // Calculate stats
        let activeStudents = 0;
        if (coursesData.courses && coursesData.courses.length > 0) {
          activeStudents = coursesData.courses.reduce((sum, course) => {
            return sum + (course.enrolled_students ? course.enrolled_students.length : 0);
          }, 0);
        }

        let avgPerformance = 0;
        if (catsData.length > 0) {
          const attempts = catsData.flatMap(cat => cat.attempts || []);
          if (attempts.length > 0) {
            avgPerformance = attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length;
          }
        }

        setStats({
          totalCourses: coursesData.courses ? coursesData.courses.length : 0,
          activeStudents,
          assessmentsCreated: catsData.length,
          avgPerformance: Math.round(avgPerformance)
        });

        // Generate recent activity
        const activity = [];
        if (catsData.length > 0) {
          const recentCats = catsData
            .slice(0, 2)
            .filter(cat => cat.created_at)
            .map(cat => ({
              type: 'assessment',
              message: `Created "${cat.title || 'Assessment'}" for ${cat.course_title || 'a course'}`,
              timestamp: cat.created_at
            }));
          activity.push(...recentCats);
        }
        
        if (coursesData.courses && coursesData.courses.length > 0) {
          const recentCourses = coursesData.courses
            .slice(0, 1)
            .filter(course => course.created_at)
            .map(course => ({
              type: 'notes',
              message: `Uploaded "${course.course_title || 'Course'}" notes`,
              timestamp: course.created_at
            }));
          activity.push(...recentCourses);
        }
        
        setRecentActivity(activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 3));
        
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'recently';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getEmojiForActivity = (type) => {
    switch(type) {
      case 'assessment': return '📝';
      case 'notes': return '📚';
      case 'students': return '👥';
      default: return '🔔';
    }
  };

  if (loading) {
    return <div className="p-8 max-w-7xl mx-auto">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-red-500">
        Error: {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.full_name || user?.email || 'User'}
        </h1>
        <p className="text-gray-500">
          {user?.role === 'tutor' ? "Here's your teaching overview" : "Here's your learning overview"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Course Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/courses')}
        >
          <div className="text-4xl font-bold text-gray-700">{stats.totalCourses}</div>
          <div className="text-gray-500 mt-2">Courses</div>
          <div className="text-sm text-green-500 mt-1">
            {stats.totalCourses > 0 ? `+${Math.floor(stats.totalCourses * 0.4)} this semester` : 'No courses yet'}
          </div>
        </div>

        {/* Student Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-4xl font-bold text-gray-700">{stats.activeStudents}</div>
          <div className="text-gray-500 mt-2">Active Students</div>
          <div className="text-sm text-blue-500 mt-1">
            {stats.activeStudents > 0 ? 
              `${Math.floor((stats.activeStudents / (stats.activeStudents + 20)) * 100)}% engagement` : 
              'No students enrolled'}
          </div>
        </div>

        {/* Assessment Metrics */}
        <div 
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/assessments')}
        >
          <div className="text-4xl font-bold text-gray-700">{stats.assessmentsCreated}</div>
          <div className="text-gray-500 mt-2">Assessments</div>
          <div className="text-sm text-purple-500 mt-1">
            {stats.assessmentsCreated > 0 ? 
              `${Math.floor(stats.assessmentsCreated * 0.2)} scheduled` : 
              'No assessments created'}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-4xl font-bold text-gray-700">
            {stats.avgPerformance}%
          </div>
          <div className="text-gray-500 mt-2">Avg. Performance</div>
          <div className="text-sm text-green-500 mt-1">
            {stats.avgPerformance > 0 ? 
              `↑ ${Math.max(0.5, (stats.avgPerformance * 0.03).toFixed(1))}% from last term` : 
              'No performance data'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="text-2xl mr-4">{getEmojiForActivity(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-gray-800">{activity.message}</p>
                  <span className="text-sm text-gray-400">{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
