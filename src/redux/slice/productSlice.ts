import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios_instance";
import {
  prodCreate_end,
  prodDetail_end,
  prodList_end,
  prodRemove_end,
  prodUpdate_end,
} from "../../../api/api_urls";
import {
  type ProdListRes,
  type ProdThunkRes,
  type Product,
  type ProductDetails,
} from "../../utils/interfaces/response/productDetails_interface";

interface ProductState {
  loading: boolean;
  product: Product[];
  productDetail: ProductDetails | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProductState = {
  loading: false,
  product: [],
  currentPage: 1,
  totalPages: 1,
  productDetail: null,
};

export const createProduct = createAsyncThunk<ProdThunkRes, FormData>(
  "product/createProduct",
  async (form_data: FormData) => {
    const response = await axiosInstance.post<ProdThunkRes>(prodCreate_end, form_data);
    // console.log("API Response :", response);
    return response?.data;
  },
);

export const getProduct = createAsyncThunk<ProdListRes, number>(
  "product/getProduct",
  async (page: number) => {
    const response = await axiosInstance.post<ProdListRes>(prodList_end, {
      page,
      perpage: 9,
    });
    // console.log("API Response :", response);
    return response?.data;
  },
);

export const removeProduct = createAsyncThunk<ProdThunkRes, Object>(
  "product/removeProduct",
  async (id: Object) => {
    const response = await axiosInstance.post<ProdThunkRes>(prodRemove_end, id);
    // console.log("API Response :", response);
    return response?.data;
  },
);

export const getProductDetails = createAsyncThunk<ProdThunkRes, string>(
  "product/getProductDetails",
  async (id: string) => {
    const response = await axiosInstance.get<ProdThunkRes>(`${prodDetail_end}${id}`);
    // console.log("API Response :", response);
    return response?.data;
  },
);

export const updateProduct = createAsyncThunk<ProdThunkRes, FormData>(
  "product/updateProduct",
  async (form_data: FormData) => {
    const response = await axiosInstance.post<ProdThunkRes>(prodUpdate_end, form_data);
    // console.log("API Response :", response);
    return response?.data;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // create
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      // console.log("fulfilled action : ", action);
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      // console.log("rejected action", action);
      state.loading = false;
    });

    // view
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      // console.log("fulfilled action : ", action);
      state.loading = false;
      state.product = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getProduct.rejected, (state) => {
      // console.log("rejected action", action);
      state.loading = false;
    });

    // remove
    builder.addCase(removeProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(removeProduct.rejected, (state) => {
      state.loading = false;
    });

    // product details
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetail = action.payload.data;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.loading = false;
    });

    // update
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      // console.log("fulfilled action : ", action);
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      // console.log("rejected action", action);
      state.loading = false;
    });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
