/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Dashboard() {
  // Sample data (replace with API calls)
  const stats = {
    totalCourses: 5,
    completedCATs: 3,
    pendingCATs: 2,
    totalQuizzes: 12,
  };

  const courses = [
    { id: 1, title: "Mathematics", code: "MAT 104", tutor: "Dr. P Bii", enrolledOn: "12/2/2024" },
    { id: 2, title: "Physics", code: "PHY 120", tutor: "Kiprono", enrolledOn: "1/3/2024" },
  ];

  const assessments = [
    { id: 1, title: "Mathematics", code: "MAT 104", status: "Completed", score: "82%" },
    { id: 2, title: "Physics", code: "PHY 210", status: "Pending", dueDate: "Mar 20" },
  ];

  const quizzes = [
    { id: 1, title: "Trigonometry Quiz", score: "85%", date: "2 days ago" },
    { id: 2, title: "Calculus Practice", score: "72%", date: "1 week ago" },
  ];

  return (
    
    <div className="p-6 space-y-6">
      {/* --- Stats Overview Card --- */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Overview</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Courses Enrolled" value={stats.totalCourses} icon="📚" />
        <StatBox label="CATs Completed" value={stats.completedCATs} icon="✅" />
        <StatBox label="Pending CATs" value={stats.pendingCATs} icon="⚠️" />
        <StatBox label="Quizzes Done" value={stats.totalQuizzes} icon="🧠" />
        </div>
      </div>

      {/* --- Course Card --- */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Courses</h2>
          <Link to="/student/courses" className="text-blue-600 hover:underline text-sm">
            See More →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              code={course.code}
              tutor={course.tutor}
              enrolledOn={course.enrolledOn}
            />
          ))}
        </div>
      </div>

      {/* --- Assessments Card --- */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assessments</h2>
          <Link to="/student/assessment" className="text-blue-600 hover:underline text-sm">
            See More →
          </Link>
        </div>
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              title={assessment.title}
              code={assessment.code}
              status={assessment.status}
              score={assessment.score}
              dueDate={assessment.dueDate}
            />
          ))}
        </div>
      </div>

      {/* --- Quizzes Card --- */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">AI Practice Quizzes</h2>
          <Link to="/student/quiz" className="text-blue-600 hover:underline text-sm">
            See More →
          </Link>
        </div>
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              score={quiz.score}
              date={quiz.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function StatBox({ label, value, icon }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function CourseCard({ title, code, tutor, enrolledOn }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <h3 className="font-medium flex justify-between">
        <div>{title}</div>
        <div className="pr-4 text-xs text-gray-700">{code}</div>

      </h3>
      <div className="mt-2">
        <p className="text-xs mt-2 text-gray-500"> Tutor: {tutor} </p>
        <p className="text-xs mt-2 text-gray-500"> Enrolled on: {enrolledOn} </p>
      </div>
    </div>
  );
}

function AssessmentCard({ title, code, status, score, dueDate }) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{code}</p>
      </div>
      {status === "Completed" ? (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {score}
        </span>
      ) : (
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          Due {dueDate}
        </span>
      )}
    </div>
  );
}

function QuizCard({ title, score, date }) {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        parseInt(score) >= 80 ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
      }`}>
        {score}
      </span>
    </div>
  );
}

export default Dashboard;