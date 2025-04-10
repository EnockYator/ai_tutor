/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BellIcon, MenuIcon, SearchIcon, UserCircle2 } from "lucide-react";

function Navbar({ onClickMenuIcon, isDisplayingMenu }) {
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
          Hi, Doctor!
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
          <BellIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-200 md:text-gray-600" />
          <UserCircle2 className="w-8 h-8 bg-gray-700 rounded-full text-white" />
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
