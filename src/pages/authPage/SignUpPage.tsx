import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/schema/yup_valiadtion_schema";
import type { SignUpAuth } from "../../utils/interfaces/send/auth_interface";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { signupUser } from "../../redux/slice/authSlice";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  // Redux
  let { loading } = useSelector((state: RootState) => state.auth);
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();

  // Form Valiadtion
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpAuth>({ resolver: yupResolver(schema) });

  const submitHandling: SubmitHandler<SignUpAuth> = (data) => {
    // console.log(data); // submitted data
    let form_data = new FormData();
    form_data.append("first_name", data.first_name);
    form_data.append("last_name", data.last_name);
    form_data.append("email", data.email);
    form_data.append("password", data.password);
    form_data.append("profile_pic", data.profile_pic[0]);

    dispatch(signupUser(form_data))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.message);
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Oops! Signup Failed.');
      });
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Signup Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-3xl font-bold text-slate-900">
              Create Your Account
            </p>
            <p className="mt-2 text-slate-500">
              Join BharatBazar and start managing your products.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(submitHandling)} className="space-y-5">
            {/* First Name & Last Name */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  {...register("first_name")}
                />
                <p className="mt-2 text-red-500">
                  {errors.first_name?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  {...register("last_name")}
                />
                <p className="mt-2 text-red-500">{errors.last_name?.message}</p>
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                {...register("email")}
              />
              <p className="mt-2 text-red-500">{errors.email?.message}</p>
            </div>
            {/* Password & Confirm Password */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  {...register("password")}
                />
                <p className="mt-2 text-red-500">{errors.password?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  {...register("confirm_password")}
                />
                <p className="mt-2 text-red-500">
                  {errors.confirm_password?.message}
                </p>
              </div>
            </div>
            {/* Profile Picture */}
            <div>
              <label
                htmlFor="profilePic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Profile Picture
              </label>
              <input
                id="profilePic"
                type="file"
                className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
                {...register("profile_pic")}
              />
              <p className="mt-2 text-red-500">{errors.profile_pic?.message}</p>
            </div>
            {/* Submit Button */}
            <input
              type="submit"
              value={loading ? "Creating Account..." : "Create Account"}
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </form>
          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?
            <Link
              to="/signin"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
