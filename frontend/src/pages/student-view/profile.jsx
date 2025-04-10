import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function Profile() {

  // Custom hook for using AuthContext
  const { isAuthenticated, user } = useAuth();
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    phoneNumber: 0,
    country: "",
    city: "",
  });
  
  const [displayForm, setDisplayForm] = useState(false);
  const editProfile = () => setDisplayForm(!displayForm);
  if (!user.userName) {
    return <p>Loading your profile...</p>; // Handle null user gracefully
}
  
  const handleInputChange = (event) => {
    console.log(`Updating ${event.target.name} : ${event.target.value}`);
    setProfileData((prevData) => ({
      ...prevData, [event.target.name] : event.target.value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to backend for processing
     console.log(profileData);
  };

  // console.log("isAuthenticated: " + isAuthenticated);
    return (
      <div className="flex flex-col w-full max-w-5xl space-y-4">
        <div className="flex flex-col justify-center items-center space-y-3 py-2 md:py-3 bg-gray-300 rounded shadow-sm">
          <User className="w-20 md:w-24 h-20 md:h-24 mt-1 bg-white rounded-full text-gray-400 p-2"/>
          {isAuthenticated ? (
            <h1 className="font-bold text-blue-700 tracking-tighter">{user.userName}</h1>
          ) : (
            <h1 className="font-bold text-blue-700 tracking-tighter">User</h1>
          )}
          
        </div>
        
        <div className="w-full flex-col  bg-gray-300 rounded-md shadow-sm md:px-5 py-4">
          <div className="w-full maw-4xl flex flex-col space-y-1 justify-center items-center">
              <h1 className="text-blue-800 text-base font-bold">Account Overview</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-col-3 gap-x-6 gap-y-5 py-3 px-2 md:px-10">
            <div className="w-full h-fit max-w-md flex flex-col space-y-3 py-4 px-6 rounded-lg shadow-lg bg-white tracking-tight">
              <h1 className="font-bold text-center md:text-base tracking-tighter">Account Details</h1>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">Name:</h1>
                <h2 className="font-bold text-blue-600">{user.userName}</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">Email Address:</h1>
                <h2 className="font-bold text-blue-600">{user.email}</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">Account Type:</h1>
                <h2 className="font-bold text-blue-600">{user.role}</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">User Id:</h1>
                <h2 className="font-bold overflow-scroll text-blue-600">{user._id}</h2>
              </div>
            </div>

            <div className="w-full  h-fit max-w-md flex flex-col space-y-3 py-4 px-6 rounded-lg shadow-lg bg-white tracking-tight">
              <h1 className="font-bold text-center md:text-base tracking-tighter">Personal Details</h1>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">Name:</h1>
                <h2 className="font-bold text-blue-600">{user.userName}</h2>
              </div>
              <div className="flex flex-col">
                <h1 className="text-gray-700">Phone Number:</h1>
                <h2 className="font-bold text-blue-600">{user.phoneNumber}</h2>
                {!user.phoneNumber && <h2 className="font-bold text-red-500">Not updated</h2>}
                {(!user.city || !user.country) && (
                  <Button
                    className="max-w-fit py-4 p6-10 my-4 bg-red-500 hover:bg-red-600"
                    onClick={() => setProfileData({...profileData, city: "" })}
                    >Update Personal Details
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full  h-fit max-w-md flex flex-col space-y-3 py-4 px-6 rounded-lg shadow-lg bg-white tracking-tight">
              <h1 className="font-bold text-center  md:text-base tracking-tighter">Location Details</h1>
              <div className="flex flex-col space-y-1">
                <h1 className="text-gray-700">Country</h1>
                {!user.country && <h2 className="font-bold text-red-500">Not updated</h2>}
                <h2 className="font-bold text-blue-600">{user.country}</h2>
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-700">City</h1>
              {!user.city && <h2 className="font-bold text-red-500">Not updated</h2>}
              <h2 className="font-bold text-blue-600">{ user.city } </h2>
              {(!user.city || !user.country) && (
                <Button
                  className="max-w-fit py-4 my-4 bg-red-500 hover:bg-red-600"
                  onClick={() => setProfileData({...profileData, city: "" })}
                  >Update Location Details
                </Button>
              )}
            </div>
          </div>
          </div>

        </div>

        <div className="w-full flex justify-center">
          <Button
            className="w-1/2 max-w-fit mt-5 md:mt-10"
            onClick={editProfile}
            >Edit Profile
          </Button>
        </div>

        {displayForm && (
          <div className="flex justify-center items-center bg-gray-300 rounded shadow-sm py-4 px-2">
            <form className="w-full max-w-xl flex flex-col justify-between items-center space-y-3">
              <div className="w-full flex flex-col space-y-1">
                <label htmlFor="userName" className="block text-gray-800 font-medium pl-2">Name</label>
                <input 
                type="text" 
                name="userName"
                value={profileData.userName || user.userName || ""} 
                id="userName"
                placeholder="Enter your name"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-sm" />
              </div>
              <div className="w-full flex flex-col space-y-1">
                <label htmlFor="email" className="block text-gray-800 font-medium pl-2">Email Address</label>
                <input 
                type="email" 
                name="email"
                value={profileData.email || user.email || ""} 
                id="email"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-sm" />
              </div>
              <div className="w-full flex flex-col space-y-1">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-medium pl-2">Phone Number</label>
                <input 
                type="text" 
                name="phoneNumber"
                value={profileData.phoneNumber || user.phoneNumber || 0} 
                id="phoneNumber"
                placeholder="Enter your phone number"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-sm" />
              </div>
              <div className="w-full flex flex-col space-y-1">
                <label htmlFor="country" className="block text-gray-800 font-medium pl-2">Country</label>
                <input 
                type="text" 
                name="country"
                value={profileData.country || user.country || ""} 
                id="country"
                placeholder="Enter country"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-sm" />
              </div>
              <div className="w-full flex flex-col space-y-1">
                <label htmlFor="city" className="block text-gray-800 font-medium pl-2">City</label>
                <input 
                type="text" 
                name="city"
                value={profileData.city || user.city || ""} 
                id="city"
                placeholder="Enter city"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-sm" />
              </div>
              <div className="w-full">
                <Button
                  className="w-1/2 max-w-fit m-8 md:mt-10 bg-blue-700 hover:bg-blue-900"
                  onClick={handleSubmit}
                  >Save Changes
                </Button>
              </div>
            </form>
          </div>
          
          
        )}
      </div>
    );
  };
  
  export default Profile;
  