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

export default function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);

  const getMyReviews = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId !== null) {
      const response = await custom_axios.get(
        ApiConstants.REVIEW.MY_REVIEWS(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setMyReviews(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  useEffect(() => {
    if (myReviews.length === 0) getMyReviews();
  }, [myReviews.length]);

  return (
    <>
      <Topbar />
      <h1 className="text-center mt-10 font-bold text-4xl mb-10">My Reviews</h1>
      {myReviews.map((myReview) => {
        return (
          <div className="post">
            <Card>
              <div className="postInfo">
                <Link
                  to={`/blog/${myReview.id}`}
                  onClick={() =>
                    sessionStorage.setItem("scrollPosition", window.pageYOffset)
                  }
                >
                  <img
                    className="postImg"
                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}${myReview.Images[0]}`}
                    alt={myReview.title}
                  ></img>
                  <div className="postTitle font-semibold text-2xl px-5 py-2">
                    {myReview.Title}
                  </div>
                  <span className="postPlace bg-slate-200 w-auto px-5 mx-5 rounded-md text-lg">
                    {myReview.Place}
                  </span>
                  <div className="postDesc text-[#868383] px-5 py-5">
                    {myReview.Experience.length > MAX_LENGTH ? (
                      <div>
                        {`${myReview.Experience.substring(0, MAX_LENGTH)}...`}
                        <span>Read More</span>
                      </div>
                    ) : (
                      <p>{myReview.Experience}</p>
                    )}
                  </div>
                </Link>
                <div>
                  <Rating
                    value={myReview.Rating}
                    readOnly
                    className="px-5 py-3"
                  />
                </div>
                <div className="flex flex-wrap flex-row justify-between">
                  {/* <div className="postAuthor text-[#FFA902] px-5 py-3 text-lg justify-start">
                Review by {myReview.author}
              </div> */}
                  <div className="flex flex-row flex-wrap">
                    <ClockIcon className="w-9 h-9 pt-3 pl-3 fill-gray-400" />
                    <span className="postTime px-5 py-3 pl-2 text-end ">
                      {myReview.start_date}
                    </span>
                  </div>
                </div>
                <div className=" text-center">
                  <Link to={`/update-review/${myReview.id}`}>
                    <button className="text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={async () => {
                      await custom_axios.patch(
                        ApiConstants.REVIEW.MARK_FAVORITE(myReview.id),
                        {
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("token"),
                          },
                        }
                      );
                      toast.success("Review added to Favourites");
                    }}
                    className="m-10 mt-2 text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]"
                  >
                    To Favourite
                  </button>
                  <button
                    onClick={async () => {
                      await custom_axios.delete(
                        ApiConstants.REVIEW.DELETE(myReview.id),
                        {
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("token"),
                          },
                        }
                      );
                      toast.success("Review deleted");
                      window.location.reload(false);
                    }}
                    className="text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
      ;
    </>
  );
}
