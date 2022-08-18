import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Navigating!!");
      navigate("/login");
    } else {
      console.log("Not Navigating!!");
    }
  }, []);
  return props.children;
}
