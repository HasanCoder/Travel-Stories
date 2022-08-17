import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    return <Navigate to="/login" />;
  }
  return props.children;
}
