

function Profile() {
    return (
        <div>
          <h2 className="text-xl font-bold mb-6">My Profile</h2>
          <form className="space-y-6">
            {[
              { label: 'Name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email', type: 'email', placeholder: 'Enter your email' },
              { label: 'Phone', type: 'tel', placeholder: 'Enter your phone number' },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            ))}
            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
              Update Profile
            </button>
          </form>
        </div>
    );
};

export default Profile;