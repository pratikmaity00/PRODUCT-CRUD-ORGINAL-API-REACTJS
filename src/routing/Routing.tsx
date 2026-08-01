import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/authPage/SignInPage";
import SignUpPage from "../pages/authPage/SignUpPage";
import ProtecedRouting from "./ProtectedRouting";
import AccessDenied from "../pages/errorPages/AccessDenied";
import NotFound from "../pages/errorPages/NotFound";
// import ProfilePage from "../pages/profilePage/ProfilePage";
// import ProductsPage from "../pages/productPage/ProductsPage";
// import CreateProduct from "../pages/productPage/product-crud/CreateProduct";
// import UpdateProduct from "../pages/productPage/product-crud/UpdateProduct";
// import ProductDetailsPage from "../pages/productPage/product-details/ProductDetailsPage";
import { lazy, Suspense } from "react";
import LazyLoader from "../components/LazyLoader";

const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"))
const CreateProduct = lazy(() => import("../pages/productPage/product-crud/CreateProduct"))
const UpdateProduct = lazy(() => import("../pages/productPage/product-crud/UpdateProduct"))
const ProductsPage = lazy(() => import("../pages/productPage/ProductsPage"))
const ProductDetailsPage = lazy(() => import("../pages/productPage/product-details/ProductDetailsPage"))

const Routing = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<LazyLoader/>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route element={<ProtecedRouting />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products/createProduct" element={<CreateProduct />} />
            <Route
              path="/products/updateProduct/:id"
              element={<UpdateProduct />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/products/productDetails/:id"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path="/access_denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
};

export default Routing;
