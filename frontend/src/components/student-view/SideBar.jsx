/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardCheckIcon,
  UserCircle2,
  HistoryIcon,
  MenuIcon,
  // Headset,
  // SettingsIcon,
  // MessageCircle,
  // DollarSign,
  // Files,
  // ChartNoAxesCombined,
  // CircleHelp,
  // Palette,
  // ShieldCheck,
} from 'lucide-react';

const Sidebar = ({ closeMenu }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white shadow-lg flex flex-col h-full transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-[18px] text-xl font-bold bg-blue-800 text-white border-b">
        {!isCollapsed && <div>DoctorsNote</div>}
        <MenuIcon
          className="w-6 h-6 cursor-pointer text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 md:p-4 space-y-3 overflow-scroll pb-6">
        <NavItem
          to="dashboard"
          icon={HomeIcon}
          label="Dashboard"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="profile"
          icon={UserCircle2}
          label="Profile"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="requests"
          icon={ClipboardCheckIcon}
          label="Request Note"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="history"
          icon={HistoryIcon}
          label="Notes History"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        {/* <NavItem
          to="transaction"
          icon={DollarSign}
          label="Transaction History"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="documents"
          icon={Files}
          label="Saved Documents"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="analytics"
          icon={ChartNoAxesCombined}
          label="Analytics and Insights"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="chat"
          icon={MessageCircle}
          label="Chat"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="security"
          icon={ShieldCheck}
          label="Security"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="customization"
          icon={Palette}
          label="Customization"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="help"
          icon={CircleHelp}
          label="Help and FAQs"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="support"
          icon={Headset}
          label="Support and Feedback"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="settings"
          icon={SettingsIcon}
          label="Settings"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        /> */}
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label, isCollapsed, closeMenu }) => (
  <NavLink
    to={to}
    onClick={closeMenu} // Close the menu on link click
    className={({ isActive }) =>
      `flex items-center p-3 rounded-lg transition ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "hover:bg-gray-300 text-gray-900"
      }`
    }
  >
    <Icon className="w-6 h-6" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
    {isCollapsed && (
      <span className="sr-only">
        {label} {/* For screen readers */}
      </span>
    )}
  </NavLink>
);

export default Sidebar;
