import { useForm, type SubmitHandler } from "react-hook-form";
import type { Product } from "../utils/interfaces/send/product_interface";
import type { ProductDetails } from "../utils/interfaces/response/productDetails_interface";
import { useEffect } from "react";
import { fetchProductsPic } from "../../api/api_urls";

interface FormProps {
  mode: string;
  loading: boolean;
  submitHandling: SubmitHandler<Product>;
  productDetail?: ProductDetails | null;
}
const CreateForm = ({
  mode,
  loading,
  submitHandling,
  productDetail,
}: FormProps) => {
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (mode === "update" && productDetail) {
      reset({
        title: productDetail.title,
        description: productDetail.description,
      });
    }
  }, [mode, productDetail, reset]);

  

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          {/* Title */}
          <div className="mb-8 text-center">
            <p className="text-3xl font-bold text-slate-900">
              {mode === "create" ? "Create Product" : "Update Product"}
            </p>

            <p className="mt-2 text-slate-500">
              {mode === "create"
                ? "Add a new product to BharatBazar"
                : "Update your product information"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandling)} className="space-y-6">
            {/* Product Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Product Title
              </label>

              <input
                id="title"
                type="text"
                // value={title}
                placeholder="Enter product title"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required.",
                  },
                })}
              />
              <p className="mt-2 text-red-500">{errors.title?.message}</p>
            </div>

            {/* Product Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Product Description
              </label>

              <textarea
                id="description"
                rows={5}
                // value={description}
                placeholder="Enter product description"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required.",
                  },
                })}
              />
              <p className="mt-2 text-red-500">{errors.description?.message}</p>
            </div>

            {mode === "update" && productDetail?.image && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Current Image
                </p>

                <img
                  src={fetchProductsPic(productDetail.image)}
                  alt={productDetail.title}
                  className="h-32 w-50 rounded-lg object-cover"
                />
              </div>
            )}

            {/* Product Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {mode === "create" ? "Product Image" : "Change Product Image"}
              </label>

              <input
                id="image"
                type="file"
                className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
                {...register("image", {
                  required:
                    mode === "create"
                      ? {
                          value: true,
                          message: "Image is required.",
                        }
                      : false,

                  validate: {
                    fileType: (files) => {
                      // No new image selected
                      if (!files || files.length === 0) {
                        return mode === "create" ? "Image is required." : true;
                      }

                      const imageReg = /^image\/(png|jpe?g)$/;

                      return (
                        imageReg.test(files[0].type) ||
                        "Only PNG and JPG images are allowed."
                      );
                    },
                  },
                })}
              />
              <p className="mt-2 text-red-500">{errors.image?.message}</p>
              {/* {image && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected: {image.name}
                </p>
              )} */}
            </div>

            {/* Submit */}
            <input
              type="submit"
              value={
                loading
                  ? mode === "create"
                    ? "Creating Product..."
                    : "Updating Product..."
                  : mode === "create"
                    ? "Create Product"
                    : "Update Product"
              }
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
