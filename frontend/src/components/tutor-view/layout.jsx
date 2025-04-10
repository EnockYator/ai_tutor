import { Outlet } from "react-router-dom";
import TutorSideBar from "./SideBar";
import TutorNavBar from "./NavBar";
import CommonFooter from "../common/footer";
import { useState } from "react";

function TutorLayout() {
  const [isDisplayingMenu, setIsDisplayingMenu] = useState(false);

  const onClickMenuIcon = () => setIsDisplayingMenu(!isDisplayingMenu);
  const closeMenu = () => setIsDisplayingMenu(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Sidebar for small screens */}
      {isDisplayingMenu && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Sidebar */}
          <div className="relative w-fit bg-white shadow-lg h-full overflow-y-auto">
            <TutorSideBar closeMenu={closeMenu} />
          </div>
          {/* Overlay */}
          <div
            className="flex-1 bg-black opacity-90"
            onClick={closeMenu}
          ></div>
        </div>
      )}

      {/* Sticky Header */}
      <TutorNavBar
        onClickMenuIcon={onClickMenuIcon}
        isDisplayingMenu={isDisplayingMenu}
        className="sticky top-0 z-10 bg-white shadow px-3 py-3"
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for large screens */}
        <div className="hidden md:block">
          <TutorSideBar />
        </div>

        {/* Content and Footer */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>

          {/* Footer */}
          <CommonFooter />
        </div>
      </div>
    </div>
  );
}

export default TutorLayout;
