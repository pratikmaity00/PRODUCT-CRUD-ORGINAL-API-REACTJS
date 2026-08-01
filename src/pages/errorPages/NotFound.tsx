import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl sm:p-10">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <span className="text-4xl">🔍</span>
        </div>

        {/* Error Code */}
        <p className="mt-6 text-7xl font-bold text-slate-900">404</p>

        {/* Title */}
        <p className="mt-4 text-2xl font-bold text-slate-900">Page Not Found</p>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
          Sorry, the page you are looking for doesn't exist or may have been
          moved to another location.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Go Home */}
          <Link
            to="/"
            className="rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Home
          </Link>

          {/* View Products */}
          <Link
            to="/products"
            className="rounded-lg border-2 border-slate-900 px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
          >
            SignIn
          </Link>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-slate-400">
          © {new Date().getFullYear()} BharatBazar
        </p>
      </div>
    </div>
  );
};

export default NotFound;
