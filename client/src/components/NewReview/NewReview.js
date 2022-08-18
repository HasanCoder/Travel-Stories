import React, { useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { getLoginInfo } from "../../utils/LoginInfo.ts";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";
import { toast } from "react-toastify";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function NewReview(props) {
  const [Ratingvalue, setRatingValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [imagefiles, setImagefiles] = useState(null);

  const formRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    toast.success("Review Submitted Scuessfully");

    const userId = getLoginInfo()?.userId;
    if (userId !== null) {
      const data = new FormData(formRef.current);
      try {
        await fetch(
          (process.env.REACT_APP_BASE_URL
            ? process.env.REACT_APP_BASE_URL
            : "https://travel-stories-1.herokuapp.com") +
            "/api" +
            `${ApiConstants.REVIEW.ADD_REVIEW(userId)}`,
          {
            method: "post",
            body: data,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  const fileSelectHandler = (event) => {
    console.log(event.target.files[0].name);
    setImagefiles(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    console.log(imagefiles);
  };

  return (
    <>
      <form
        className="m-10 flex place-content-center"
        onSubmit={submitHandler}
        encType="multipart/form-data"
        ref={formRef}
      >
        <div className="w-1/2">
          <div className="m-5">
            <label htmlFor="title" className="block mb-3 text-lg">
              Give your review a title
            </label>
            <input
              type="text"
              required
              id="title"
              name="Title"
              placeholder="Enter title for your review"
              className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-md"
            />
          </div>
          <div className="m-5">
            <label htmlFor="place" className="block mb-3 text-lg">
              Where did you go?
            </label>
            <input
              type="text"
              required
              id="place"
              name="Place"
              placeholder="Enter the place you have travelled"
              className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="m-5">
            <label className="block mb-3 text-lg">
              <span>Rate Your Experience</span>
              <span>(required)</span>
            </label>
            <Box
              sx={{
                width: 400,
                height: 50,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Stack spacing={2}>
                <Rating
                  name="Rating"
                  value={Ratingvalue}
                  precision={1}
                  size="large"
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  icon={<StarIcon fontSize="large" />}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="large" />
                  }
                />
              </Stack>
              {Ratingvalue !== null && (
                <Box sx={{ ml: 2 }} className="text-lg">
                  {labels[hover !== -1 ? hover : Ratingvalue]}
                </Box>
              )}
            </Box>
          </div>
          <div className="m-5">
            <label htmlFor="description" className="block mb-3 text-lg">
              Describe how was your experience
            </label>
            <textarea
              required
              id="description"
              name="Experience"
              rows="10"
              placeholder="Please tell us about your experience of your journey: describe the place or activity, recommendations for travellers?"
              className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="m-5">
            <label htmlFor="date" className="block mb-3 text-lg">
              When did you start your journey?
            </label>
            <input
              type="date"
              required
              id="date"
              name="start_date"
              placeholder="Pick the date when you travelled"
              className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="m-5">
            <label htmlFor="upload" className="block mb-3 text-lg">
              Upload Images
            </label>
            <input
              type="file"
              required
              multiple
              id="upload"
              name="Images"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
            />
          </div>
        </div>

        <div className="w-1/2">
          <div className="m-5 border border-gray-400 p-10 rounded-lg">
            <h3 className="text-2xl font-bold mb-5">Hotels you have stayed</h3>
            <div className="mb-5">
              <label htmlFor="hotelname" className="block mb-3 text-lg">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotelname"
                name="Hotel_name"
                placeholder="Name of Hotel"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="costofstay" className="block mb-3 text-lg">
                Cost of stay per night
              </label>
              <input
                type="number"
                id="costofstay"
                name="Hotel_cost"
                placeholder="Rs"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="refhotel" className="block mb-3 text-lg">
                Reference number
              </label>
              <input
                type="text"
                id="refnum"
                name="Hotel_refno"
                placeholder="+92"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="m-5 border border-gray-400 p-10 rounded-lg ">
            <h3 className="text-2xl font-bold mb-5">
              Transportation Services you have availed
            </h3>
            <div className="mb-5">
              <label htmlFor="transport_name" className="block mb-3 text-lg">
                Name of Transportation Service
              </label>
              <input
                type="text"
                id="transport_name"
                name="Transport_name"
                placeholder="Enter name of the transportation service you availed"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="reftransport" className="block mb-3 text-lg">
                Reference number of transportation service (if any)
              </label>
              <input
                type="text"
                id="reftransport"
                name="Transport_refno"
                placeholder="+92"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="transport_cost" className="block mb-3 text-lg">
                Cost
              </label>
              <input
                type="number"
                id="transport_cost"
                name="Transport_cost"
                placeholder="Rs"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            type="Submit"
            className="float-right mr-5 bg-[#FFA902] hover:bg-[#fac251] text-black p-5 rounded-lg text-2xl font-semibold"
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </>
  );
}
