import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../../api/ApiConstants.ts";
import custom_axios from "../../axios/axiosSetup";
import { getLoginInfo } from "../../utils/LoginInfo.ts";
import Card from "../../components/ui/card";
import { Link } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/solid";
import { Rating } from "@mui/material";
import Topbar from "../../components/topbar/Topbar";

const MAX_LENGTH = 300;

export default function MyFavouriteReviews() {
  const [myFavouriteReviews, setMyFavouriteReviews] = useState([]);

  const getMyFavouriteReviews = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId !== null) {
      const response = await custom_axios.get(
        ApiConstants.REVIEW.MY_FAVORITE_REVIEWS(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setMyFavouriteReviews(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  useEffect(() => {
    if (myFavouriteReviews.length === 0) getMyFavouriteReviews();
  }, [myFavouriteReviews.length]);

  return (
    <>
      <Topbar />
      <h1 className="text-center mt-10 font-bold text-4xl mb-10">
        My Favourite Reviews
      </h1>
      {myFavouriteReviews.map((myFavouriteReview) => {
        return (
          <div className="post">
            <Card>
              <Link
                to={`/blog/${myFavouriteReview.id}`}
                onClick={() =>
                  sessionStorage.setItem("scrollPosition", window.pageYOffset)
                }
              >
                <img
                  className="postImg"
                  src={`${process.env.REACT_APP_IMAGE_BASE_URL}${myFavouriteReview.Images[0]}`}
                  alt={myFavouriteReview.title}
                ></img>
                <div className="postInfo">
                  <div className="postTitle font-semibold text-2xl px-5 py-2">
                    {myFavouriteReview.Title}
                  </div>
                  <span className="postPlace bg-slate-200 w-auto px-5 mx-5 rounded-md text-lg">
                    {myFavouriteReview.Place}
                  </span>
                  <div className="postDesc text-[#868383] px-5 py-5">
                    {myFavouriteReview.Experience.length > MAX_LENGTH ? (
                      <div>
                        {`${myFavouriteReview.Experience.substring(
                          0,
                          MAX_LENGTH
                        )}...`}
                        <span>Read More</span>
                      </div>
                    ) : (
                      <p>{myFavouriteReview.Experience}</p>
                    )}
                  </div>
                  <div>
                    <Rating
                      value={myFavouriteReview.Rating}
                      readOnly
                      className="px-5 py-3"
                    />
                  </div>
                  <div className="flex flex-wrap flex-row justify-between">
                    {/* <div className="postAuthor text-[#FFA902] px-5 py-3 text-lg justify-start">
                Review by {myFavouriteReview.author}
              </div> */}
                    <div className="flex flex-row flex-wrap">
                      <ClockIcon className="w-9 h-9 pt-3 pl-3 fill-gray-400" />
                      <span className="postTime px-5 py-3 pl-2 text-end ">
                        {myFavouriteReview.start_date}
                      </span>
                    </div>
                  </div>
                  {/* <div className=" text-center">
                    <button className="m-10 mt-2 text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]">
                      To Favourite
                    </button>
                  </div> */}
                </div>
              </Link>
              <div className="text-center">
                <button
                  onClick={async () => {
                    await custom_axios.patch(
                      ApiConstants.REVIEW.REMOVE_FAVORITE(myFavouriteReview.id),
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    // toast.success("Review removed from Favourites");
                    window.location.reload(false);
                  }}
                  className="m-10 mt-2 text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]"
                >
                  Remove From Favourites
                </button>
              </div>
            </Card>
          </div>
        );
      })}
      ;
    </>
  );
}
