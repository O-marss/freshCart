import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import SpecificCategory from "./Components/SpecificCategory/SpecificCategory.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import Favorites from "./Components/Favorites/Favorites.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CashPayment from "./Components/CashPayment/cashPayment.jsx";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import Overlay from "./Components/Overlay/Overlay.jsx";

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
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/specificbrand/:id",
        element: (
          <SpecificBrand />
        ),
      },
      {
        path: "/specificCategory/:id",
        element: (
          <SpecificCategory />
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cashpayment",
        element: (
          <ProtectedRoute>
            <CashPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
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
      <div className="App">
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
      </div>
    </>
  );
}

export default App;
