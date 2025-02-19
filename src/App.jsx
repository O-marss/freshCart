import { lazy, Suspense } from "react";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout/Layout.jsx";
import Loading from "./Components/Loading/Loading.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Home from "./Components/Home/Home.jsx";
const Cart = lazy(() => import(`./Components/Cart/Cart.jsx`))
const SpecificCategory = lazy(() => import(`./Components/SpecificCategory/SpecificCategory.jsx`))
const Brands = lazy(() => import(`./Components/Brands/Brands.jsx`))
const Products = lazy(() => import(`./Components/Products/Products.jsx`))
const Favorites = lazy(() => import(`./Components/Favorites/Favorites.jsx`))
const ProductDetails = lazy(() => import(`./Components/ProductDetails/ProductDetails.jsx`))
const Checkout = lazy(() => import(`./Components/Checkout/Checkout.jsx`))
const AllOrders = lazy(() => import(`./Components/AllOrders/AllOrders.jsx`))
const CashPayment = lazy(() => import(`./Components/CashPayment/cashPayment.jsx`))
const ForgotPassword = lazy(() => import(`./Components/ForgotPassword/ForgotPassword.jsx`))
const ResetPassword = lazy(() => import(`./Components/ResetPassword/ResetPassword.jsx`))
const SpecificBrand = lazy(() => import(`./Components/SpecificBrand/SpecificBrand.jsx`))

let routers = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "signin", element: <Signin /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { index: true, element: <Home /> },
      {
        path: "brands",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/specificbrand/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <SpecificBrand />
          </Suspense>
        ),
      },
      {
        path: "/specificCategory/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <SpecificCategory />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          </Suspense>

        ),
      },
      {
        path: "brands",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/productdetails/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "cashpayment",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <CashPayment />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "allorders",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ReactQueryDevtools />
          <Toaster
            position="bottom-right"
            toastOptions={{
              removeDelay: 2000,
              style: {
                color: "#222",
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
