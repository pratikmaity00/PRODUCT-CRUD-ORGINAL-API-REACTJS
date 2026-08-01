import type { SubmitHandler } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import type { Product } from "../../../utils/interfaces/send/product_interface";
import { createProduct } from "../../../redux/slice/productSlice";
import CreateForm from "../../../components/CreateForm";

const CreateProduct = () => {
    const navigate = useNavigate();
  // Redux
  let { loading } = useSelector((state: RootState) => state.auth);
  // console.log(loading);
  let dispatch = useDispatch<AppDispatch>();

  const submitHandling: SubmitHandler<Product> = (data) => {
    console.log("Form Data: ", data);
    let form_data = new FormData();
    form_data.append("title", data.title);
    form_data.append("description", data.description);
    form_data.append("image", data.image[0]);

    dispatch(createProduct(form_data))
    .unwrap()
    .then((res) => {
        if (res.status === 200) {
          toast.success(res.message);
          setTimeout(() => {
            navigate("/products");
          }, 1000);
        }else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Oops! Product Not Created.');
      });
  };
  return (
    <CreateForm mode="create" loading={loading} submitHandling={submitHandling} />
  );
};

export default CreateProduct;
