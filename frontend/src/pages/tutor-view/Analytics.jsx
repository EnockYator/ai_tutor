

function Analytics() {
    const stats = [
        { title: 'Notes Issued This Month', value: 50 },
        { title: 'Average Approval Time', value: '2h 45m' },
        { title: 'Pending Requests', value: 10 },
        { title: 'Rejected Requests', value: 5 },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white shadow rounded-lg text-center border"
              >
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold text-blue-500">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

export default Analytics;