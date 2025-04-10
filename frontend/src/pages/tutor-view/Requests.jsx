

function Requests() {
    const requests = [
        { id: 1, patient: 'John Doe', type: 'Sick Leave', status: 'Pending', date: '2024-12-28' },
        { id: 2, patient: 'Jane Smith', type: 'Insurance Claim', status: 'Approved', date: '2024-12-26' },
        { id: 3, patient: 'Sam Wilson', type: 'Workplace Injury', status: 'Rejected', date: '2024-12-25' },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Patient Requests</h2>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-100">
                    <td className="p-4">{request.patient}</td>
                    <td className="p-4">{request.type}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-white ${
                          request.status === 'Approved'
                            ? 'bg-green-500'
                            : request.status === 'Rejected'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4">{request.date}</td>
                    <td className="p-4">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                        Approve
                      </button>
                      <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default Requests;