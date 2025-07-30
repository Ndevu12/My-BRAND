"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dummy user data (replace with real data from context/store)
  const user = {
    username: "Admin User",
    role: "Super Admin",
    avatar: "/images/mypic.png",
  };

  return (
    <header className="bg-secondary border-b border-gray-700 shadow-lg sticky top-0 z-20 w-full md:header-continuous">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Welcome message */}
        <div className="flex-1 ml-4 md:ml-0">
          <div className="flex items-center"></div>
          <p className="text-sm text-gray-400">Welcome back, {user.username}</p>
        </div>

        {/* Search bar (desktop only) */}
        <div className="hidden md:flex items-center bg-primary/50 rounded-lg px-3 py-2 w-1/3 border border-gray-700">
          <i className="fas fa-search text-gray-400 mr-3"></i>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full focus:outline-none text-gray-300"
            aria-label="Search"
          />
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Messages */}
          <div ref={notifRef} className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Messages"
              onClick={() => setNotifOpen((open) => !open)}
            >
              <i className="fas fa-envelope text-lg text-gray-400"></i>
              {/* Notification badge */}
              <span className="absolute top-1 right-1 bg-yellow-500 text-gray-900 text-xs rounded-full px-1.5 py-0.5">
                2
              </span>
            </button>
            {/* Dropdown (example) */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-secondary border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 text-sm text-gray-300">
                  No new messages.
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <i className="fas fa-bell text-lg text-gray-400"></i>
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                5
              </span>
            </button>
          </div>

          {/* Profile dropdown */}
          <div ref={profileRef} className="relative">
            <button
              className="h-8 w-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Profile"
              onClick={() => setProfileOpen((open) => !open)}
            >
              {/* Use Next.js Image for avatar if available */}
              <Image
                src={user.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-secondary border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                    <Image
                      src={user.avatar}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{user.username}</h3>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      <i className="fas fa-cog mr-2"></i> Settings
                    </a>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors flex items-center">
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
