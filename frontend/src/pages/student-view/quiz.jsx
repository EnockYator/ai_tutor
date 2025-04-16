import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data - replace with API calls
const quizzesData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Trigonometry Fundamentals',
    course: 'Mathematics',
    quiz_type: 'practice', // practice, graded, mock_exam
    difficulty: 'medium',
    questions_count: 15,
    time_limit: 30, // minutes
    last_attempted: '2023-10-15T14:30:00Z',
    best_score: 85,
    attempts_left: 3, // null for unlimited
    topics: ['Sine/Cosine', 'Identities', 'Equations']
  },
  {
    id: '3f9a5f8c-2e44-4bb3-b38d-05b5a0a15a1d',
    title: 'Quantum Mechanics Basics',
    course: 'Physics',
    quiz_type: 'graded',
    difficulty: 'hard',
    questions_count: 20,
    time_limit: 45,
    last_attempted: null,
    best_score: null,
    attempts_left: 1,
    topics: ['Wavefunctions', 'Operators', 'Schrödinger Eq.']
  }
];

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, practice, graded, mock_exam
  const [difficulty, setDifficulty] = useState('all'); // all, easy, medium, hard

  const filteredQuizzes = quizzesData.filter(quiz => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filter === 'all' || quiz.quiz_type === filter;
    
    const matchesDifficulty = 
      difficulty === 'all' || quiz.difficulty === difficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Practice Quizzes</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="practice">Practice</option>
              <option value="graded">Graded</option>
              <option value="mock_exam">Mock Exams</option>
            </select>
            
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <h3 className="text-lg font-medium text-gray-700">No quizzes found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm || filter !== 'all' || difficulty !== 'all'
              ? 'Try different search/filter criteria' 
              : 'No quizzes available yet'}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizCard({ quiz }) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const typeIcons = {
    practice: '🧠',
    graded: '📝',
    mock_exam: '🎯'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
      {/* Quiz Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.course}</p>
          </div>
          <span className="text-2xl">{typeIcons[quiz.quiz_type]}</span>
        </div>
        
        <div className="flex gap-2 mt-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[quiz.difficulty]}`}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
          {quiz.attempts_left !== null && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {quiz.attempts_left} {quiz.attempts_left === 1 ? 'Attempt' : 'Attempts'} Left
            </span>
          )}
        </div>
      </div>

      {/* Quiz Body */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Questions</h4>
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {quiz.questions_count}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Time Limit</h4>
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {quiz.time_limit} mins
            </p>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics Covered</h4>
          <div className="flex flex-wrap gap-2">
            {quiz.topics.map((topic, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Performance */}
        {quiz.last_attempted && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Your Performance</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${quiz.best_score}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium">{quiz.best_score}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Last attempted: {new Date(quiz.last_attempted).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <div className="p-4 border-t">
        <Link
          to={`/quizzes/${quiz.id}`}
          className={`w-full block text-center px-4 py-2 rounded-lg font-medium ${
            quiz.last_attempted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {quiz.last_attempted ? 'Retake Quiz' : 'Start Quiz'}
        </Link>
      </div>
    </div>
  );
}