

function Appointments() {
    const appointments = [
        { id: 1, patient: 'John Doe', date: '2024-12-30', time: '10:00 AM', status: 'Scheduled' },
        { id: 2, patient: 'Jane Smith', date: '2024-12-31', time: '1:00 PM', status: 'Completed' },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Appointments</h2>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="p-4">{appointment.patient}</td>
                    <td className="p-4">{appointment.date}</td>
                    <td className="p-4">{appointment.time}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-white ${
                          appointment.status === 'Scheduled' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default Appointments;