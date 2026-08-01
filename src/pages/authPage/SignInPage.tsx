import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { SignInAuth } from "../../utils/interfaces/send/auth_interface";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { signinUser } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";

const SignInPage = () => {
  const navigate  = useNavigate();

  // Redux
  let { loading } = useSelector((state: RootState) => state.auth);
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();
  // Form Valiadtion
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInAuth>();

  const submitHandling: SubmitHandler<SignInAuth> = (data) => {
    console.log("Submitted Data: ", data);
    let from_data = new FormData();
    from_data.append('email', data.email);
    from_data.append('password', data.password); 

    dispatch(signinUser(from_data))
    .unwrap()
    .then(res => {
      if(res.status === 200) {
        toast.success(res.message);
        window.sessionStorage.setItem('JWT_TOKEN' , res.token);
        setTimeout(() => {
          navigate(`/profile`);
        },1000)
      }else {
        toast.error(res.message);
      }
    })
    .catch(err => {
      console.error(err)
      toast.error('Soory! SignIn Failed.')
    })
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
        {/* Sign In Card */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-3xl font-bold text-slate-900">Welcome Back</p>
            <p className="mt-2 text-slate-500">
              Sign in to continue to BharatBazar.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(submitHandling)} className="space-y-5">
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
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                })}
              />
              <p className="mt-2 text-red-500">{errors.email?.message}</p>
            </div>
            {/* Password */}
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
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required.",
                  },
                })}
              />
              <p className="mt-2 text-red-500">{errors.password?.message}</p>
            </div>
            {/* Submit Button */}
            <input
              type="submit"
              value={loading ? 'Wait...' : 'Sign In'}
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </form>
          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
