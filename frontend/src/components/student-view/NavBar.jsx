/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BellIcon, MenuIcon, SearchIcon, UserCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser, resetAuth, setAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function Navbar({ onClickMenuIcon, isDisplayingMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  const [loading, setIsLoading] = useState(false);
  const { user, actions } = useAuth();
  const [profileIconActive, setProfileIconActive] = useState(false);
  const [notificationIconActive, setNotificationIconActive] = useState(false);

  async function logout(event) {

    event.preventDefault();
  
    try {
      setIsLoading(true);
      const result = await dispatch(logoutUser()); 
      
      console.log("Logout Result:", result); // Check what you're getting back
      
      // Dispatch the setAuth action to update the Redux state
      dispatch(resetAuth({
        isAuthenticated: result.isAuthenticated,
        user: result.user,  // User data from the response (including role, etc.)
      }));

      console.log("User after resetAuth:", result.user); // Check if user is null

      toast({
        title: "Logged out successfully",
        description: result.message, // Message from backend logoutUser endpoint  
        className: "bg-toastSuccess text-white max-w-md h-16 z-50",
        duration: 3000,
      });

      // Redirect to home page
      if (result.user === null) {
        navigate("/");
      } 
    } catch (error) {
      toast({
        title: "Failed",
        description: error, // Display error message from backend
        className: "bg-toastError text-white max-w-md h-16 z-50 ",
        duration: 3000,
      });
    } finally {
      setIsLoading(false); // Set loading to false after request completion
    }
  }
  

  return (
    <div className="sticky top-0 z-10 bg-blue-800 md:bg-white shadow px-3 md:px-6 pb-3 pt-2 md:py-4 space-y-2">
      <div className="flex items-center justify-between">
        {/* For small screens */}
        <MenuIcon
          className="md:hidden w-6 h-6 cursor-pointer text-gray-100 md:text-blue-600"
          onClick={onClickMenuIcon}
        />
        {/* Welcome Text */}
        <h1 className="absolute md:relative left-12 md:left-0 text-sm md:text-lg font-semibold text-gray-100 md:text-blue-800 whitespace-nowrap">
          Hello {user.userName}
        </h1>
        {/* Search Bar */}
        <div className="hidden md:flex mx-auto items-center flex-grow max-w-md space-x-2 px-3 py-1 border rounded-2xl">
        <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search here"
            className="outline-none flex-grow w-full"
          />
        </div>
        {/* Icons Section */}
        <div className="flex items-center space-x-5 md:space-x-9">
          <BellIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-200 md:text-gray-600" 
          onClick={() => setNotificationIconActive(!notificationIconActive)}
          />

          {notificationIconActive && (
            <div 
            className="absolute right-0 top-0 h-screen w-screen bg-transparent"
            onClick={() => setNotificationIconActive(!notificationIconActive)}
            >
              <div className="absolute top-12 md:top-[66px] right-14 md:right-20 bg-white w-56 rounded-md shadow-md flex  flex-col justify-between items-center py-4 space-y-3 tracking-tight">
                <div className="flex flex-col space-y-1 justify-center items-center pb-2">
                  <h1 className="text-blue-600 font-bold border-b-2 border-blue-400">Notifications</h1>
                </div>
                <div className="flex flex-col space-y-3 px-3">
                  <Link to="./profile" className="border-b">Update your profile</Link>
                  <Link to="./settings" className="border-b">Your note request has been recieved succesfully</Link>
                </div>
                <div>
                  <h2 className="text-blue-600 font-semibold border-b border-blue-400"><Link to="notifications">View all</Link></h2>
                </div>
              </div>
            </div>
          )}
          
          <UserCircle2 
          className="w-8 h-8 bg-gray-700 rounded-full text-white" 
          onClick={() => setProfileIconActive(!profileIconActive)}
          />

          {profileIconActive && (
            <div 
            className="absolute right-0 top-0 h-screen w-screen bg-transparent"
            onClick={() => setProfileIconActive(!profileIconActive)}
            >
              <div className="absolute top-12 md:top-[66px] right-2 md:right-4 bg-white w-56 rounded-md shadow-md flex  flex-col justify-between items-center py-4 space-y-5 tracking-tight">
                <div className="flex flex-col space-y-1 justify-center items-center border-b-2 border-blue-400 pb-2">
                  <UserCircle2 className="w-8 h-8 bg-blue-700 rounded-full text-white"/>
                  <h1 className="text-blue-600 font-bold">{user.userName}</h1>
                  <h2 className="text-blue-600 font-bold">{user.email}</h2>
                </div>
                <div className="flex flex-col space-y-3 ">
                  <Link to="./profile">My Profile</Link>
                  <Link to="./settings">Settings</Link>
                </div>
                <div>
                  <Button 
                  className="h-fit bg-red-600 text-md font-bold hover:bg-red-500"
                  onClick={logout}
                  >Logout</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Search Bar for small screens */}
      <div className="flex md:hidden items-center flex-grow max-w-md space-x-2 px-3 py-1 border rounded-2xl mx-auto bg-gray-200">
      <SearchIcon className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search here"
          className="outline-none flex-grow w-full bg-gray-200"
        />
      </div>
    </div>
  );
};

export default Navbar;
