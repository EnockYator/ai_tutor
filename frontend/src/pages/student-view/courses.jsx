/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data - replace with actual API calls
const coursesData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    course_title: 'Simulation & Modeling',
    course_code: 'MATH-401',
    course_tutor: 'Dr. P Bii',
    status: 'enrolled', // enrolled, not enrolled
    course_notes: {
      total: 15,
      last_updated: '2023-10-15',
      categories: ['Lectures', 'Assignments', 'Solutions']
    },
    created_at: '2023-09-01T10:00:00Z'
  },
  {
    id: '3f9a5f8c-2e44-4bb3-b38d-05b5a0a15a1d',
    course_title: 'Quantum Physics',
    course_code: 'PHYS-450',
    course_tutor: 'Prof. James Wilson',
    status: 'notEnrolled',
    course_notes: {
      total: 22,
      last_updated: '2023-10-18',
      categories: ['Experiments', 'Research Papers']
    },
    created_at: '2023-08-15T09:30:00Z'
  }
];

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, enrolled, notEnrolled

  const filteredCourses = coursesData.filter(courses => {
    const matchesSearch = 
      courses.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courses.course_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || courses.status === filter;
    
    return matchesSearch && matchesFilter;
  });


  return (
    <div className="p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Courses</h1>
        
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
            <option value="all">All Courses</option>
            <option value="enrolled">Enrolled</option>
            <option value="notEnrolled">Not Enrolled</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Try a different search term' : 'You are not enrolled in any courses yet'}
          </p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }) {
  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const statusColors = {
    notEnrolled: 'bg-red-100 text-yellow-900 tracking-wide',
    enrolled: 'bg-green-100 text-green-800 tracking-wide'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex justify-between items-start p-4 border-b text-white">
        <div>
          <h2 className="font-bold text-lg">{course.course_title}</h2>
          <p className="text-blue-100">{course.course_code}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[course.status]}`}>
          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </span>
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
            <p className="text-sm text-gray-500">Tutor</p>
            <p className="font-medium">{course.course_tutor}</p>
          </div>
        </div>

        {/* Notes Summary */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Course Materials</h4>
          <div className="flex flex-wrap gap-2">
            <div className="bg-gray-50 px-3 py-1 rounded-full text-sm">
              {course.course_notes.total} {course.course_notes.total === 1 ? 'Note' : 'Notes'}
            </div>
            {course.course_notes.categories.map((category, index) => (
              <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {category}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {new Date(course.course_notes.last_updated).toLocaleDateString()}
          </p>
        </div>

        {/* Footer with Action Buttons */}
      <div className="flex justify-between items-center p-4 border-t">
      <span className='text-sm text-gray-500'>Added: {formattedDate}</span>
        <div className="flex gap-2">
          {course.status === 'notEnrolled' ? 
          (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Enroll Now
            </button>
          ) :
          (
            <Link
            to={`/assessments/${course.id}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              Resume
            </Link>
          )}
        </div>
      </div>

      </div>
    </div>
  );
}

export default Courses;