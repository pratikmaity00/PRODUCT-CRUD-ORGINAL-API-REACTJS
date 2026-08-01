import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userProfile } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { fetchProfilePic } from "../../../api/api_urls";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    window.sessionStorage.removeItem('JWT_TOKEN');
    toast.success('User Logged Out.');
    navigate("/signin");
  };
  let { loading, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
          {/* Animated Icon */}
          <div className="relative">
            <ShoppingBag size={64} className="text-slate-900" />
          </div>

          {/* Loading Text */}
          <p className="mt-6 text-2xl font-bold text-slate-900">
            Fetching Profile
          </p>

          <p className="mt-2 text-center text-slate-500">
            Please wait while we securely load your account details...
          </p>

          {/* Animated Dots */}
          <div className="mt-6 flex gap-2">
            <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600"></span>
            <span
              className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0.15s" }}
            ></span>
            <span
              className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0.3s" }}
            ></span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Top Header */}
          <div className="bg-slate-900 px-6 py-8 text-center">
            <p className="text-2xl font-bold text-white"> My Profile </p>
            <p className="mt-2 text-slate-400">
              Manage your BharatBazar account
            </p>
          </div>
          {/* Profile Information */}
          <div className="px-6 py-8 sm:px-10">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={fetchProfilePic(user?.profile_pic ?? "")}
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-blue-100 bg-gray-200 object-cover shadow-md"
              />
            </div>
            {/* User Details */}
            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-slate-900">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="mt-2 text-slate-500"> {user?.email}</p>
              {/* Role Badge */}
              <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                {user?.role_data.roleDisplayName}
              </span>{" "}
            </div>
            {/* Action Buttons */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Create Product */}
              <Link
                to="/products/createProduct"
                className="rounded-lg bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
              >
                Create Product
              </Link>{" "}
              {/* View Products */}
              <Link
                to="/products"
                className="rounded-lg border-2 border-slate-900 px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                View Products
              </Link>{" "}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Sign Out
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
