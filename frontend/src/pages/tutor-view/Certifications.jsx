

function Certifications() {
    return (
        <div>
          <h2 className="text-xl font-bold mb-6">Certifications</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Upload Certificate</label>
              <input
                type="file"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
              Submit
            </button>
          </form>
        </div>
    );
};

export default Certifications;