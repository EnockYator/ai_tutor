

function Feedback() {
    const feedbacks = [
        { id: 1, patient: 'John Doe', feedback: 'Great service!', date: '2024-12-28' },
        { id: 2, patient: 'Jane Smith', feedback: 'Quick and professional.', date: '2024-12-25' },
      ];
    
      return (
        <div>
          <h2 className="text-xl font-bold mb-6">Patient Feedback</h2>
          <div className="space-y-4">
            {feedbacks.map((item) => (
              <div key={item.id} className="bg-white shadow p-4 rounded-lg">
                <p className="text-sm font-medium">{item.feedback}</p>
                <p className="text-sm text-gray-500">- {item.patient}, {item.date}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

export default Feedback;