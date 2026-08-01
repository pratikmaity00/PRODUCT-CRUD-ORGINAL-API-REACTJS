
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../redux/slice/productSlice";
import { fetchProductsPic } from "../../../../api/api_urls";

const ProductDetailsPage = () => {
  let { id } = useParams();
  // console.log("prod id",id);
  let { loading, productDetail } = useSelector(
    (state: RootState) => state.product,
  );
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();

 
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !productDetail) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Back Button Skeleton */}
          <div className="mb-6 h-10 w-40 animate-pulse rounded-lg bg-slate-200" />

          {/* Product Details Skeleton */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Image Skeleton */}
              <div className="flex min-h-[350px] items-center justify-center bg-slate-100 p-6">
                <div className="h-[350px] w-full animate-pulse rounded-xl bg-slate-200" />
              </div>

              {/* Content Skeleton */}
              <div className="flex flex-col justify-center p-6 sm:p-10">
                {/* Status */}
                <div className="mb-5 h-7 w-24 animate-pulse rounded-full bg-slate-200" />

                {/* Title */}
                <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />

                {/* Description */}
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                </div>

                {/* Product Information */}
                <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
                  <div className="flex justify-between">
                    <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-12 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <Link
          to="/products"
          className="mb-6 inline-block rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to Products
        </Link>

        {/* Product Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <div className="flex min-h-[350px] items-center justify-center bg-slate-100 p-6">
              {productDetail.image ? (
                <img
                  src={fetchProductsPic(productDetail?.image)}
                  alt={productDetail.title}
                  className="h-full max-h-[400px] w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-xl bg-slate-200">
                  <p className="text-slate-500">No Image Available</p>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10">
              {/* Status */}
              <div className="mb-4">
                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    productDetail.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {productDetail.status === "Active" ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <p className="text-3xl font-bold text-slate-900">
                {productDetail.title}
              </p>

              {/* Description */}
              <p className="mt-4 text-base leading-7 text-slate-600">
                {productDetail.description}
              </p>

              {/* Product Information */}
              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                {/* Product ID */}
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <span className="font-medium text-slate-500">Product ID</span>

                  <span className="break-all text-sm text-slate-700 sm:text-right">
                    {productDetail._id}
                  </span>
                </div>

                {/* Status */}
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Status</span>

                  <span className={`font-semibold ${productDetail.status === 'Active' ? "text-green-600" : "text-red-500"}`}>
                    {productDetail.status === "Active" ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Created At */}
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Created At</span>

                  <span className="text-sm text-slate-700">
                    {new Date(productDetail.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Updated At */}
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">
                    Last Updated
                  </span>

                  <span className="text-sm text-slate-700">
                    {new Date(productDetail.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  to={`/products/updateProduct/${productDetail._id}`}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Update Product
                </Link>

                <Link
                  to="/products"
                  className="rounded-lg border-2 border-slate-900 px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
