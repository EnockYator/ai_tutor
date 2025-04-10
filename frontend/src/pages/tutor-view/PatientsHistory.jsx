

function PatientsHistory() {
    const history = [
        {
          id: 1,
          patient: 'John Doe',
          type: 'Sick Leave',
          date: '2024-12-15',
          status: 'Approved',
        },
        {
          id: 2,
          patient: 'Jane Smith',
          type: 'Insurance Claim',
          date: '2024-12-12',
          status: 'Rejected',
        },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Patient History</h2>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-100">
                    <td className="p-4">{entry.patient}</td>
                    <td className="p-4">{entry.type}</td>
                    <td className="p-4">{entry.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-white ${
                          entry.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default PatientsHistory;