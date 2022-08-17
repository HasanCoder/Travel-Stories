import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WriteReview from "./pages/WriteReviewPage/WriteReview";
import MyReviews from "./pages/MyReviewsPage/MyReviews";
import MyFavouriteReviews from "./pages/MyFavouriteReviewsPage/MyFavouriteReviews";
import App from "./App";
import SinglePostPage from "./pages/Blog/Blog";
// import Login from "./components/Login/Login";
import Login from "./pages/Auth/Login";
import "./index.css";
import SignUp from "./pages/Auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "./pages/UsersPageforAdmin/UsersPage";
import UpdateReview from "./pages/UpdateReviewPage/UpdateReviewPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer
      autoClose={3000}
      position="top-center"
      hideProgressBar={true}
    />
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="write-review"
        element={
          <ProtectedRoute>
            <WriteReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="my-reviews"
        element={
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="my-favourite"
        element={
          <ProtectedRoute>
            <MyFavouriteReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="blog/:id"
        element={
          <ProtectedRoute>
            <SinglePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="signup"
        element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="update-review/:id"
        element={
          <ProtectedRoute>
            <UpdateReview />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
