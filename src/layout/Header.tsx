import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type {  RootState } from "../redux/store/store";
import { fetchProfilePic } from "../../api/api_urls";
import toast from "react-hot-toast";

const Header = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    // console.log("User signed out");
    window.sessionStorage.removeItem("JWT_TOKEN");
    toast.success("Sign Out Successfully Done.");
    navigate("/signin");
  };

  let token = window.sessionStorage.getItem("JWT_TOKEN");
  let isAuthenticated = !!token;

  let { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          BharatBazar
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link to="/" className="transition hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="transition hover:text-blue-400">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/products" className="transition hover:text-blue-400">
              Products
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="relative">
              {/* Profile Button */}
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center gap-2 rounded-full focus:outline-none"
              >
                {/* Profile Image */}
                <img
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-blue-300 bg-gray-300 object-cover"
                  src={fetchProfilePic(user?.profile_pic ?? "")}
                  alt={user?.first_name}
                />

                {/* Arrow Icon */}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  {/* User Information */}
                  <div className="border-b border-gray-200 px-4 py-4">
                    <p className="text-sm text-gray-500">Welcome</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      Pratik Maity
                    </p>
                  </div>

                  {/* My Profile */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                      // setisSignIn(true);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </button>

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin" className="transition hover:text-blue-400">
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="rounded-lg bg-blue-600 px-5 py-2 transition hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="space-y-3 border-t border-slate-700 px-6 py-4 md:hidden">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-blue-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-blue-400"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-blue-400"
            >
              Products
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="block w-full py-2 text-left text-red-400"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-blue-400"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-blue-400"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
