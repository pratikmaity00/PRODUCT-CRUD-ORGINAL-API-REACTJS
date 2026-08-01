import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import type { SubmitHandler } from "react-hook-form";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import type { Product } from "../../../utils/interfaces/send/product_interface";
import CreateForm from "../../../components/CreateForm";
import { useEffect } from "react";
import {
  getProductDetails,
  updateProduct,
} from "../../../redux/slice/productSlice";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  //  console.log(id)

  // Redux
  let { loading, productDetail } = useSelector(
    (state: RootState) => state.product,
  );
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();

  const submitHandling: SubmitHandler<Product> = (data) => {
    console.log("Form Data: ", data);
    let form_data = new FormData();
    if (id) form_data.append("id", id);
    form_data.append("title", data.title);
    form_data.append("description", data.description);
    if (data.image && data.image.length > 0)
      form_data.append("image", data.image[0]);

    dispatch(updateProduct(form_data))
      .unwrap()
      .then((res) => {
        if (res.status === "200") {
          toast.success(res.message);
          setTimeout(() => {
            navigate("/products");
          }, 1000);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Oops! Product Not Updated.");
      });
  };
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !productDetail) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="animate-pulse rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            {/* Header */}
            <div className="mb-8 space-y-3">
              <div className="mx-auto h-8 w-52 rounded bg-slate-200" />
              <div className="mx-auto h-4 w-72 rounded bg-slate-200" />
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-12 w-full rounded-lg bg-slate-200" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-slate-200" />
                <div className="h-32 w-full rounded-lg bg-slate-200" />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-12 w-full rounded-lg bg-slate-200" />

                {/* Existing image */}
                <div className="mt-3 h-32 w-32 rounded-lg bg-slate-200" />
              </div>

              {/* Button */}
              <div className="h-12 w-full rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CreateForm
      mode="update"
      loading={loading}
      submitHandling={submitHandling}
      productDetail={productDetail}
    />
  );
};

export default UpdateProduct;
