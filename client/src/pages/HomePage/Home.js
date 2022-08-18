import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Posts from "../../components/posts/Posts";
import "./Home.css";

import Topbar from "../../components/topbar/Topbar";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";

export default function Home() {
  const [reviews, setReviews] = useState([]);

  const getAllReviews = async () => {
    try {
      const response = await custom_axios.get(
        ApiConstants.REVIEW.GET_ALL_REVIEWS,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setReviews(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div className="home">
      <div className="background">
        <Topbar className="noBackground" />
        <Header setSearch={setSearch} />
      </div>
      <h1 className="text-center mt-10 font-bold text-4xl mb-10">
        All Reviews
      </h1>
      <Posts
        reviews={reviews.filter((review) =>
          review.Place.toLowerCase().includes(search)
        )}
      />
      <Footer />
    </div>
  );
}
