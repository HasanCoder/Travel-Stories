import React, { useCallback, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Rating } from "@mui/material";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";

// import { async } from "@firebase/util";

export default function Blog(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedReviews, setLoadedReviews] = useState([]);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  // const [image, setImage] = useState(null);
  // const [ImgRes, setImgRes] = useState();

  // async function getReviews() {
  //   const review = await fetch(
  //     "https://travel-stories-74648-default-rtdb.asia-southeast1.firebasedatabase.app/reviews.json",
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const data = await review.json();
  //   setIsLoading(false);
  //   console.log(data);
  // }

  // useEffect(() => {
  //   fetch(
  //     `https://travel-stories-74648-default-rtdb.asia-southeast1.firebasedatabase.app/reviews.json`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const reviews = [];
  //       for (const key in data) {
  //         const review = {
  //           id: key,
  //           ...data[key],
  //         };
  //         reviews.push(review);
  //         console.log(review.id);
  //       }
  //       setIsLoading(false);
  //       setLoadedReviews(reviews);
  //       console.log(loadedReviews[0].id);
  //       console.log(id);
  //       let blog = loadedReviews.find((review) => review.id === id);
  //       if (blog) {
  //         setBlog(blog);
  //         console.log(blog);
  //       }
  //     });
  // }, []);

  const getReviewById = useCallback(async () => {
    const response = await custom_axios.get(
      ApiConstants.REVIEW.GET_SINGLE_REVIEW(parseInt(id)),
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setBlog(response.data);
  }, [id]);

  // const getImageByReviewId = async () => {
  //   let response = await fetch("http://localhost:3000/review/image/27", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       Accept: "*/*",
  //     },
  //   });

  //   let data = await response.text();
  //   console.log(data);
  //   // const resultImg = URL.createObjectURL(response.blob());
  //   // setImage(resultImg);

  //   // const response = await custom_axios.get(
  //   //   ApiConstants.REVIEW.GET_IMAGE(parseInt(id)),
  //   //   { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  //   // );
  //   // console.log("id :: ", +id);
  //   // // let data = await response.text();
  //   // const resultImg = URL.createObjectURL(response.data);
  //   // console.log("This is response ", +resultImg);
  //   // setImage(response.data);
  // };

  useEffect(() => {
    // getImageByReviewId();
    getReviewById();
  }, [getReviewById]);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }
  // if (!isLoading) {
  //   MatchId();
  // }

  // const EmptyList = () => {
  //   return (
  //     <>
  //       <h1>Empty List</h1>
  //     </>
  //   );
  // };

  return (
    <>
      <Topbar />
      <Link to="/" className="m-10 my-10">
        <div className="flex flex-row">
          <ArrowNarrowLeftIcon className="w-5 h-5 mx-2 pt-1" />
          <span>Go Back</span>
        </div>
      </Link>
      {blog ? (
        <div className="m-20">
          <div>
            <span className="font-poppins font-medium text-black text-3xl">
              {blog.Title},{" "}
            </span>
            <span className="font-poppins font-medium text-[#FFA902] text-3xl">
              {blog.Place}
            </span>
          </div>
          <div className="my-10 mb-5">
            {/* <div className="text-[#8D8D8D]">{blog.author}</div> */}
            <div className="text-[#8D8D8D]">{blog.start_date}</div>
            <Rating value={blog.Rating} readOnly />
          </div>
          <img
            className=" w-full h-2/3"
            src={`https://storage.googleapis.com/travel-stories-74648.appspot.com/images/${blog.Images[0]}`}
            alt={blog.title}
            loading="lazy"
          ></img>
          <div className="postInfo">
            <div className="postDesc my-5 ">{blog.Experience}</div>
          </div>
          <div className="my-5">
            <h1 className="underline text-2xl mb-2">Staying Hotel</h1>
            <p>Hotel Name: {blog.Hotel_name}</p>
            <p>Cost per night: {blog.Hotel_cost}</p>
            <p>Hotel Reference number: {blog.Hotel_refno}</p>
          </div>
          <div className="my-5">
            <h1 className="underline text-2xl mb-2">
              Transportation Service availed
            </h1>
            <p>Name of Transportation Service: {blog.Transport_name}</p>
            <p>Cost: {blog.Transport_cost}</p>
            <p>
              Reference number of Transportation Service: {blog.Transport_refno}
            </p>
          </div>
          <div className="flex flex-wrap justify-between">
            {blog.Images?.map((image, index) =>
              index !== 0 ? (
                <img
                  src={`https://storage.googleapis.com/travel-stories-74648.appspot.com/images/${image}`}
                  className="m-5"
                  alt="not uploaded"
                />
              ) : (
                <></>
              )
            )}
          </div>
          {/* <div className="flex flex-wrap justify-between">
            <img
              src={require("../../images/image 3.png")}
              className="m-5"
              alt=""
            />
            <img
              src={require("../../images/image 4.png")}
              className="m-5"
              alt=""
            />
            <img
              src={require("../../images/image 5.png")}
              className="m-5"
              alt=""
            />
            <img
              src={require("../../images/image 6.png")}
              className="m-5"
              alt=""
            />
          </div> */}
          {/* <div className="m-5">
            <span className="text-black font-semibold">Author - </span>
            <span className="text-[#FFA902] font-semibold">{blog.author}</span>
          </div> */}
        </div>
      ) : null}
    </>
  );
}
