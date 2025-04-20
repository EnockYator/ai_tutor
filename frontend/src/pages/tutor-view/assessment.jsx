// AssessmentsPage.jsx
import React, { useState } from 'react';

const Assessment = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: '',
    course: '',
    description: '',
    deadline: '',
    duration: 60,
    isPublished: false
  });

  const assessments = [
    {
      id: 1,
      title: 'Midterm Exam',
      course: 'CS101 - Intro to CS',
      status: 'Scheduled',
      dateCreated: '2023-10-10',
      deadline: '2023-11-15',
      submissions: 42,
      avgScore: 78.5
    },
    {
      id: 2,
      title: 'Week 5 Quiz',
      course: 'CS201 - Data Structures',
      status: 'Completed',
      dateCreated: '2023-09-28',
      deadline: '2023-10-05',
      submissions: 38,
      avgScore: 85.2
    }
  ];

  const courses = [
    { id: 1, code: 'CS101', title: 'Introduction to Computer Science' },
    { id: 2, code: 'CS201', title: 'Data Structures and Algorithms' }
  ];

  const handleCreateAssessment = () => {
    // API call to create assessment
    console.log('Creating assessment:', newAssessment);
    setShowCreateModal(false);
    setNewAssessment({
      title: '',
      course: '',
      description: '',
      deadline: '',
      duration: 60,
      isPublished: false
    });
  };

  return (
    <div className="relative p-8 max-w-7xl mx-auto">
      {/* Blur overlay - only visible when modal is open */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      <div className={`${showCreateModal ? 'pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Course Assessments (CATs)</h1>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            + Create New CAT
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Course</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Deadline</div>
            <div className="col-span-1">Submissions</div>
            <div className="col-span-2">Avg. Score</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          {assessments.map(assessment => (
            <div key={assessment.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-3 font-medium text-gray-800">{assessment.title}</div>
              <div className="col-span-2 text-gray-600">{assessment.course}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  assessment.status === 'Scheduled' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {assessment.status}
                </span>
              </div>
              <div className="col-span-2 text-gray-600">{assessment.deadline}</div>
              <div className="col-span-1 text-gray-600">{assessment.submissions}</div>
              <div className="col-span-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${assessment.avgScore}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{assessment.avgScore}%</span>
              </div>
              <div className="col-span-1">
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create CAT Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative z-50">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New CAT</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={newAssessment.title}
                      onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
                      placeholder="e.g. Midterm Exam"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={newAssessment.course}
                      onChange={(e) => setNewAssessment({...newAssessment, course: e.target.value})}
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={newAssessment.description}
                    onChange={(e) => setNewAssessment({...newAssessment, description: e.target.value})}
                    placeholder="Assessment description..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={newAssessment.deadline}
                      onChange={(e) => setNewAssessment({...newAssessment, deadline: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={newAssessment.duration}
                      onChange={(e) => setNewAssessment({...newAssessment, duration: e.target.value})}
                      min="10"
                      max="180"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="publish-checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={newAssessment.isPublished}
                    onChange={(e) => setNewAssessment({...newAssessment, isPublished: e.target.checked})}
                  />
                  <label htmlFor="publish-checkbox" className="ml-2 text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleCreateAssessment}
                >
                  Create CAT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;