import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Dashboard() {
  
    return (
      <div className="flex flex-col w-full">
        <h1 className="text-lg md:text-2xl text-center font-bold mb-4 text-blue-600">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="px-4 py-3 bg-white rounded shadow-md flex flex-col justify-between space-y-1">
            <h2 className="text-sm md:text-md">Total Notes Requested</h2>
            <p className="text-base md:text-xl font-semibold text-blue-600">12</p>
          </div>
          <div className="px-4 py-3 bg-white rounded shadow-md flex flex-col justify-between space-y-1">
            <h2 className="text-sm md:text-md">Pending Requests</h2>
            <p className="text-sm md:text-md font-semibold text-yellow-600">Sick Leave note</p>
          </div>
          <div className="px-4 py-3 bg-white rounded shadow-md flex flex-col justify-between space-y-1">
            <h2 className="text-sm md:text-md">Completed Notes</h2>
            <p className="text-base md:text-xl font-semibold text-green-600">9</p>
          </div>          
        </div>
        <div>
        <Link to="./../requests">
          <Button
          className="bg-blue-700 hover:bg-blue-900 w-full max-w-sm mt-8 mx-auto font-bold"
          
          >Request Note
          </Button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  