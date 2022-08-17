import React from "react";
import Footer from "../../components/footer/footer";
import NewReview from "../../components/NewReview/NewReview";
import Topbar from "../../components/topbar/Topbar";
import { useNavigate } from "react-router-dom";

export default function WriteReview() {
  // function addReviewHandler(reviewData) {

  // }
  return (
    <>
      <Topbar />
      <h1 className="text-4xl font-poppins font-normal mx-14 mt-5">
        Write your Review
      </h1>
      <NewReview />
      <Footer />
    </>
  );
}
