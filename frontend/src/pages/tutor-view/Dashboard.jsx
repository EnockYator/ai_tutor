
function DoctorDashboard() {
    const metrics = [
        { title: 'Total Notes Issued', value: 150, color: 'bg-green-500' },
        { title: 'Pending Requests', value: 12, color: 'bg-yellow-500' },
        { title: 'Rejected Requests', value: 5, color: 'bg-red-500' },
        { title: 'Average Response Time', value: '2h 30m', color: 'bg-blue-500' },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`p-6 text-white rounded-lg shadow-lg ${metric.color}`}
              >
                <h3 className="text-sm font-medium">{metric.title}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

export default DoctorDashboard;