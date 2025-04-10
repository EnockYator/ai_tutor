
/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardCheckIcon,
  UserCircle2,
  BellIcon,
  CalendarIcon,
  HistoryIcon,
  ShieldCheck,
  ChartNoAxesCombined,
  MessageSquareIcon,
  MenuIcon,
  SettingsIcon,
  DollarSign,
  MessageCircle,
  CircleHelp,
  Headset,
  ContactRound,
  Palette,
  Files,
  Hospital,
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
      <nav className="flex-1 p-4 space-y-3 overflow-scroll pb-6">
        <NavItem
          to="/doctor/dashboard"
          icon={HomeIcon}
          label="Dashboard"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/profile"
          icon={UserCircle2}
          label="Profile"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/requests"
          icon={ClipboardCheckIcon}
          label="Note Requests"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/notifications"
          icon={BellIcon}
          label="Notifications"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/saved-notes"
          icon={Files}
          label="Saved Notes"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/appointments"
          icon={CalendarIcon}
          label="Appointments"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/history"
          icon={HistoryIcon}
          label="Patients History"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/certifications"
          icon={Hospital}
          label="Certifications"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/earnings"
          icon={DollarSign}
          label="My Earnings"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/analytics"
          icon={ChartNoAxesCombined}
          label="Analytics"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/chat"
          icon={MessageCircle}
          label="Chat with Patient"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/availability"
          icon={ContactRound}
          label="Set Availability"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        /><NavItem
          to="/doctor/help"
          icon={CircleHelp}
          label="Help and FAQs"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/support"
          icon={Headset}
          label="Support"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/security"
          icon={ShieldCheck}
          label="Security"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/customization"
          icon={Palette}
          label="Customization"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/feedback"
          icon={MessageSquareIcon}
          label="Feedback and Ratings"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
        <NavItem
          to="/doctor/settings"
          icon={SettingsIcon}
          label="Settings"
          isCollapsed={isCollapsed}
          closeMenu={closeMenu}
        />
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
          : "hover:bg-gray-100 text-gray-800"
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

