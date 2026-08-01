import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect } from "react";
import {
  getProduct,
  removeProduct,
  setCurrentPage,
} from "../../redux/slice/productSlice";
import { fetchProductsPic } from "../../../api/api_urls";
import toast from "react-hot-toast";

const ProductsPage = () => {
  // Redux
  let { loading, currentPage, totalPages, product } = useSelector(
    (state: RootState) => state.product,
  );
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();

  let update_date = (date: string): string => {
    return new Date(date).toDateString();
  };

  const handleRemove = (id: string) => {
    // console.log("Remove product:", id);
    let removeId = { id };
    // console.log(removeId)
    dispatch(removeProduct(removeId))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        if (product.length === 1 && currentPage > 1) {
          dispatch(setCurrentPage(currentPage - 1));
        } else {
          // Otherwise refresh the same page
          dispatch(getProduct(currentPage));
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Oops! Product Not Removed.');
      })
  };

  useEffect(() => {
    dispatch(getProduct(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-3xl font-bold text-slate-900">My Products</p>

            <p className="mt-2 text-slate-500">
              Manage and explore all your products.
            </p>
          </div>

          <Link
            to="/products/createProduct"
            className="rounded-lg bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            Create Product
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
                >
                  {/* Image */}
                  <div className="h-52 w-full bg-slate-200" />

                  {/* Content */}
                  <div className="space-y-4 p-5">
                    {/* Title */}
                    <div className="h-6 w-3/4 rounded bg-slate-200" />

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-slate-200" />
                      <div className="h-4 w-5/6 rounded bg-slate-200" />
                    </div>

                    {/* Status */}
                    <div className="h-5 w-20 rounded-full bg-slate-200" />

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <div className="h-10 flex-1 rounded-lg bg-slate-200" />
                      <div className="h-10 flex-1 rounded-lg bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {product.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Image */}
                  <img
                    src={fetchProductsPic(product.image)}
                    alt={product.title}
                    className="h-56 w-full object-cover"
                  />

                  {/* Product Content */}
                  <div className="p-5">
                    {/* Title */}
                    <p className="text-xl font-bold text-slate-900">
                      {product.title}
                    </p>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {product.description}
                    </p>

                    {/* Status & Updated Time */}
                    <div className="mt-4 flex items-center justify-between">
                      {/* Stock Status */}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status === "Active"
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>

                      {/* Updated Time */}
                      <span className="text-xs text-slate-400">
                        Updated {update_date(product.updatedAt)}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* View More */}
                      <Link
                        to={`/products/productDetails/${product._id}`}
                        className="rounded-lg border border-slate-300 px-2 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        View More
                      </Link>

                      {/* Update */}
                      <Link
                        to={`/products/updateProduct/${product._id}`}
                        className="rounded-lg bg-blue-600 px-2 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Update
                      </Link>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="rounded-lg bg-red-600 px-2 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                className="rounded-l bg-slate-900 p-3 text-white disabled:opacity-50"
              >
                Prev
              </button>

              <p className="bg-slate-200 px-5 py-3">
                Page {currentPage} of {totalPages}
              </p>

              <button
                disabled={currentPage === totalPages}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                className="rounded-r bg-slate-900 p-3 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
