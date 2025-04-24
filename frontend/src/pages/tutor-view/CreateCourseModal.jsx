/* eslint-disable react/prop-types */

const CreateCourseModal = ({
    newCourse,
    fileError,
    isLoading,
    setNewCourse,
    setShowCreateModal,
    setFileError,
    handleFileChange,
    handleCreateCourse
    }) => {
    const handleTitleChange = (e) => {
        setNewCourse(prev => ({...prev, title: e.target.value}));
    };

    const handleCodeChange = (e) => {
        setNewCourse(prev => ({...prev, code: e.target.value}));
    };

    const handleCancel = () => {
        setShowCreateModal(false);
        setFileError('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>
            
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={newCourse.title}
                onChange={handleTitleChange}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={newCourse.code}
                onChange={handleCodeChange}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Notes (PDF/DOC)</label>
                <input
                type="file"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                />
                {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
            </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
            <button
                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={handleCancel}
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                onClick={async (e) => {
                    e.preventDefault();
                    await handleCreateCourse();
                }}
                disabled={isLoading}
                >
                {isLoading ? 'Creating...' : 'Create Course'}
            </button>
            </div>
        </div>
        </div>
    );
};

export default CreateCourseModal;