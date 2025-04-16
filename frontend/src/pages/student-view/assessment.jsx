import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data - replace with API calls
const assessmentsData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Midterm Examination',
    course: 'Advanced Calculus',
    due_date: '2023-11-15T14:00:00Z',
    duration: '2 hours',
    status: 'upcoming', // upcoming, completed, missed
    total_questions: 25,
    average_score: 72, // null if not completed
    instructions: 'Bring calculator and formula sheet'
  },
  {
    id: '3f9a5f8c-2e44-4bb3-b38d-05b5a0a15a1d',
    title: 'Chapter 3 CAT',
    course: 'Quantum Physics',
    due_date: '2023-10-25T10:30:00Z',
    duration: '45 minutes',
    status: 'completed',
    total_questions: 15,
    average_score: 85,
    instructions: 'Closed book assessment'
  }
];

export default function Assessment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, missed

  const filteredAssessments = assessmentsData.filter(assessment => {
    const matchesSearch = 
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || assessment.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Assessments & CATs</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search assessments..."
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
          
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Assessments</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
          </select>
        </div>
      </div>

      {/* Assessments Grid */}
      {filteredAssessments.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <h3 className="text-lg font-medium text-gray-700">No assessments found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm || filter !== 'all' 
              ? 'Try different search/filter criteria' 
              : 'No assessments scheduled yet'}
          </p>
        </div>
      )}
    </div>
  );
}

function AssessmentCard({ assessment }) {
  const dueDate = new Date(assessment.due_date);
  const formattedDate = dueDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = dueDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    missed: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
      {/* Assessment Header */}
      <div className="flex justify-between items-start p-4 border-b">
        <div>
          <h2 className="font-bold text-lg">{assessment.title}</h2>
          <p className="text-gray-600">{assessment.course}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[assessment.status]}`}>
          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
        </span>
      </div>

      {/* Assessment Body */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date/Time Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Date & Time</h4>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>
              {formattedDate}<br />
              <span className="text-sm text-gray-500">{formattedTime}</span>
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Details</h4>
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration: {assessment.duration}
            </p>
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Questions: {assessment.total_questions}
            </p>
            {assessment.average_score && (
              <p className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Average Score: {assessment.average_score}%
              </p>
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Instructions</h4>
          <p className="text-gray-600">{assessment.instructions}</p>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div className="flex justify-between items-center p-4 border-t">
        <span className="text-sm text-gray-500">
          {assessment.status === 'upcoming' 
            ? `Due in ${Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24))} days` 
            : assessment.status === 'completed' 
              ? 'Completed' 
              : 'Missed'}
        </span>
        <div className="flex gap-2">
          {assessment.status === 'upcoming' && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Prepare Now
            </button>
          )}
          <Link
            to={`/assessments/${assessment.id}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}