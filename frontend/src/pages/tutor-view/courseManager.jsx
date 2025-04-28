import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useCourse } from '@/context/CourseContext'; // adjust the import if your path differs
import { Button } from '@/components/ui/button'; // assumed you're using a UI library

const CourseManager = () => {
  const { courses, course, isLoading, error, actions } = useCourse();

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', code: '', courseFile: null });

  // Memoized versions to prevent re-renders
  const fetchAllCourses = useCallback(() => {
    actions.getAllCourses();
  }, [actions]);

  const createNewCourse = useCallback(() => {
    if (!newCourse.title || !newCourse.code || !newCourse.courseFile) return;
    actions.createCourse(newCourse);
    setNewCourse({ title: '', code: '', courseFile: null }); // reset
  }, [actions, newCourse]);

  const enrollInCourse = useCallback((courseId) => {
    actions.enrollCourse(courseId);
  }, [actions]);

  const fetchCourseDetails = useCallback((courseId) => {
    setSelectedCourseId(courseId);
    actions.fetchCourseById(courseId);
  }, [actions]);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const renderedCourses = useMemo(() => {
    if (!courses || courses.length === 0) {
      return <p className="text-gray-500">No courses available.</p>;
    }

    return (
      <ul className="space-y-4">
        {courses.map((c) => (
          <li key={c.id} className="border p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{c.course_title}</h3>
            <p className="text-sm text-gray-600">Code: {c.course_code}</p>

            <div className="mt-2 flex gap-2">
              <Button onClick={() => enrollInCourse(c.id)} variant="outline">Enroll</Button>
              <Button onClick={() => fetchCourseDetails(c.id)} variant="default">Details</Button>
            </div>
          </li>
        ))}
      </ul>
    );
  }, [courses, enrollInCourse, fetchCourseDetails]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Course Manager</h1>

      {/* Course creation */}
      <div className="mb-8 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse.code}
            onChange={(e) => setNewCourse((prev) => ({ ...prev, code: e.target.value }))}
            className="input input-bordered w-full"
          />
          <input
            type="file"
            onChange={(e) => setNewCourse((prev) => ({ ...prev, courseFile: e.target.files[0] }))}
            className="file-input w-full"
          />

          <Button onClick={createNewCourse} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </div>

      {/* List of courses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        {renderedCourses}
      </div>

      {/* Selected course details */}
      {selectedCourseId && course && (
        <div className="mt-8 p-4 border rounded-lg shadow bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <p><strong>Title:</strong> {course.course_title}</p>
          <p><strong>Code:</strong> {course.course_code}</p>
          {/* You can add more course info here */}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default React.memo(CourseManager);
