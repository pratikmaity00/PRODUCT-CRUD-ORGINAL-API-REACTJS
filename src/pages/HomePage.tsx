import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <p className="mb-4 font-semibold uppercase tracking-wider text-blue-600">
              Welcome to BharatBazar
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Manage Your Products,
              <span className="text-blue-600"> Grow Your Store.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              BharatBazar is a simple e-commerce platform where you can explore
              and manage products easily. Add new products, update existing
              products, and keep your store organized in one place.
            </p>
            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signin"
                className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Sign In
              </Link>{" "}
              <Link
                to="/signup"
                className="rounded-lg border-2 border-blue-600 px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Sign Up
              </Link>{" "}
            </div>
          </div>
          {/* Right Content */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-3xl">
                🛒
              </div>{" "}
              <h2 className="text-2xl font-bold text-slate-900">
                Your Simple E-Commerce Store
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Manage your products with an easy-to-use interface designed for
                a smooth and simple shopping experience.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </span>{" "}
                  <span className="text-slate-700">Add new products</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </span>{" "}
                  <span className="text-slate-700">
                    Update existing products
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </span>{" "}
                  <span className="text-slate-700">
                    Explore and manage your store
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Everything You Need to Manage Your Store
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            BharatBazar provides a simple platform to manage your products and
            explore your e-commerce store.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                ➕
              </div>{" "}
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Add Products
              </h3>
              <p className="mt-3 text-slate-600">
                Easily add new products and provide all the necessary
                information for your store.
              </p>
            </div>{" "}
            {/* Feature 2 */}
            <div className="rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                ✏️
              </div>{" "}
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Update Products
              </h3>
              <p className="mt-3 text-slate-600">
                Keep your product information updated whenever you need to make
                changes.
              </p>
            </div>{" "}
            {/* Feature 3 */}
            <div className="rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl">
                🛍️
              </div>{" "}
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Explore Products
              </h3>
              <p className="mt-3 text-slate-600">
                Explore available products and enjoy a simple e-commerce
                experience with BharatBazar.
              </p>
            </div>{" "}
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Explore BharatBazar?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Sign in to your account or create a new account to explore the
          products and manage your store.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/signin"
            className="rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Sign In
          </Link>{" "}
          <Link
            to="/signup"
            className="rounded-lg border border-white px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-600"
          >
            Sign Up
          </Link>{" "}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
