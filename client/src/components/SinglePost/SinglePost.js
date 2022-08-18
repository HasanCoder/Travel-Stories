import React, { useEffect } from "react";
import Card from "../ui/card";
import "./SinglePost.css";
import { Link } from "react-router-dom";

import { ClockIcon } from "@heroicons/react/solid";
import { Rating } from "@mui/material";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";
import { toast } from "react-toastify";

const MAX_LENGTH = 300;
export default function SinglePost(props) {
  // const [image, setImage] = useState(null);

  // const getImageByReviewId = async () => {
  //   const response = await custom_axios.get(
  //     ApiConstants.REVIEW.GET_IMAGE(parseInt(props.id)),
  //     { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  //   );
  //   console.log("id :: ", +props.id);
  //   console.log("This is response ", +response.text());
  //   // const resultImg = URL.createObjectURL(response.blob());
  //   setImage(response.data);
  // };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
    // getImageByReviewId();
  }, []);
  return (
    <div className="post">
      <Card>
        <Link
          to={`/blog/${props.id}`}
          onClick={() =>
            sessionStorage.setItem("scrollPosition", window.pageYOffset)
          }
        >
          <img
            className="postImg"
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${props.images[0]}`}
            alt={props.title}
          ></img>
          <div className="postTitle font-semibold text-2xl px-5 py-2">
            {props.title}
          </div>
          <span className="postPlace bg-slate-200 w-auto px-5 mx-5 rounded-md text-lg">
            {props.place}
          </span>
          <div className="postDesc text-[#868383] px-5 py-5 h-[150px]">
            {props.description.length > MAX_LENGTH ? (
              <div>
                {`${props.description.substring(0, MAX_LENGTH)}...`}
                <span>Read More</span>
              </div>
            ) : (
              <p>{props.description}</p>
            )}
          </div>
        </Link>
        <div>
          <Rating value={props.rating} readOnly className="px-5 py-3" />
        </div>
        <div className="flex flex-wrap flex-row justify-between">
          {/* <div className="postAuthor text-[#FFA902] px-5 py-3 text-lg justify-start">
                Review by {props.author}
              </div> */}
          <div className="flex flex-row flex-wrap">
            <ClockIcon className="w-9 h-9 pt-3 pl-3 fill-gray-400" />
            <span className="postTime px-5 py-3 pl-2 text-end ">
              {props.date}
            </span>
          </div>
        </div>
        <div className=" text-center">
          <button
            onClick={async () => {
              await custom_axios.patch(
                ApiConstants.REVIEW.MARK_FAVORITE(props.id),
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              toast.success("Review added to Favourites");
            }}
            className="m-10 mt-2 text-[#ff3358] text-lg rounded-md p-2 px-7 drop-shadow-xl font-semibold  border-2 border-[#ff3358] hover:text-white hover:bg-[#ff3358]"
          >
            To Favourite
          </button>
        </div>
      </Card>
    </div>
  );
}
