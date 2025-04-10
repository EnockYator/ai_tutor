function NotesHistory() {
    return (
      <div className="w-full min-h-full flex flex-col"><div>
        <h1 className="text-lg font-bold text-center mb-4 tracking-tight text-blue-600">Your Medical Notes</h1>
      </div>
        <ul className="space-y-4">
          <li className="p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-semibold">Sick Leave Note</h2>
            <p className="text-sm text-gray-600">Issued on: 2024-12-01</p>
          </li>
        </ul>
      </div>
    );
  };
  
  export default NotesHistory;
  