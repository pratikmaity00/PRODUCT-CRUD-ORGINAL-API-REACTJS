import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="text-2xl font-bold">BharatBazar</p>

          <p className="mt-3 max-w-sm leading-7 text-slate-400">
            BharatBazar is a simple e-commerce platform where you can explore,
            add, and manage products with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-lg font-semibold">Quick Links</p>

          <ul className="mt-4 space-y-3 text-slate-400">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="transition hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link to="/signin" className="transition hover:text-white">
                Sign In
              </Link>
            </li>

            <li>
              <Link to="/signup" className="transition hover:text-white">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <p className="text-lg font-semibold">About BharatBazar</p>

          <p className="mt-4 leading-7 text-slate-400">
            Manage your products, keep your store organized, and explore a
            simple e-commerce experience.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-700 pt-6 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()}{" "}
          <Link className="hover:text-gray-200 transition" to={`/`}>
            BharatBazar.
          </Link>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
