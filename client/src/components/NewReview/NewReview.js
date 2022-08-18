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
  const [uploadImage, setUploadImage] = useState(false);
  // const [imageUrls, setImageUrls] = useState([]);

  const titleInputRef = useRef();
  const placeInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const imageInputRef = useRef();
  const hotelNameInputRef = useRef();
  const hotelCostInputRef = useRef();
  const hotelRefInputRef = useRef();
  const transportNameInputRef = useRef();
  const transportCostInputRef = useRef();
  const transportRefInputRef = useRef();
  const formRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredPlace = placeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredImage = imageInputRef.current.files[0];
    const enteredhotelName = hotelNameInputRef.current.value;
    const enteredhotelCost = parseInt(hotelCostInputRef.current.value);
    const enteredhotelRef = hotelRefInputRef.current.value;
    const enteredTransportName = transportNameInputRef.current.value;
    const enteredTransportRef = transportRefInputRef.current.value;
    const enteredTransportCost = parseInt(transportCostInputRef.current.value);

    const ReviewData = {
      Title: enteredTitle,
      Place: enteredPlace,
      Rating: Ratingvalue,
      Experience: enteredDescription,
      start_date: enteredDate,
      Images: enteredImage,
      Hotel_name: enteredhotelName,
      Hotel_cost: enteredhotelCost,
      Hotel_refno: enteredhotelRef,
      Transport_name: enteredTransportName,
      Transport_refno: enteredTransportRef,
      Transport_cost: enteredTransportCost,
    };

    // console.log(imageUrls);
    // props.onAddReview(ReviewData);

    const userId = getLoginInfo()?.userId;
    if (userId !== null) {
      // console.log(`reviewData :: ${JSON.stringify(ReviewData, null, 4)}`);
      // console.log(formRef.current);
      const data = new FormData(formRef.current);
      // console.log(ReviewData);
      // for (const key in ReviewData) {
      //   const element = ReviewData[key];
      //   data.append(key, element);
      // }
      // data.append("Title", titleInputRef.current.value);
      // data.append("Place", placeInputRef.current.value);
      // data.append("Description", descriptionInputRef.current.value);
      // data.append("Date", dateInputRef.current.value);
      // data.append("Image", imageInputRef.current.files[0]);
      // data.append("hotelName", hotelNameInputRef.current.value);
      // data.append("hotelCost", parseInt(hotelCostInputRef.current.value));
      // data.append("hotelRef", hotelRefInputRef.current.value);
      // data.append("TransportName", transportNameInputRef.current.value);
      // data.append("TransportRef", transportRefInputRef.current.value);
      // data.append(
      //   "TransportCost",
      //   parseInt(transportCostInputRef.current.value)
      // );
      for (const [key, value] of data) {
        console.log(key, value);
      }
      // console.log(data.entries());
      try {
        await fetch(
          (process.env.baseURL || "http://localhost:3000") +
            "/api" +
            `${ApiConstants.REVIEW.ADD_REVIEW(userId)}`,
          {
            method: "post",
            body: data,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              // Authorization:
              //   "Bearer " +
              //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiaGFzYW4iLCJlbWFpbCI6Imhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJOT1JNQUxfVVNFUl9ST0xFIiwiaWF0IjoxNjYwNDA5OTU5LCJleHAiOjE2NjA0MTM1NTl9.4GxT3Qbs49qO71ZnOm0RWWJDpfNHIT6rMuGnKQBRjVs",
              // "Content-Type": "multipart/form-data; boundary=meri-boundary",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }

      // {
      //   Title: enteredTitle,
      //   Place: enteredPlace,
      //   Rating: Ratingvalue,
      //   Experience: enteredDescription,
      //   start_date: enteredDate,
      //   Images: enteredImage,
      //   Hotel_name: enteredhotelName,
      //   Hotel_cost: enteredhotelCost,
      //   Hotel_refno: enteredhotelRef,
      //   Transport_name: enteredTransportName,
      //   Transport_refno: enteredTransportRef,
      //   Transport_cost: enteredTransportCost,
      // },
      // {
      toast.success("Review Submitted Scuessfully");
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

  // const imagesListRef = ref(storage, "images/");
  // const fileUploadHandler = (event) => {
  //   if (imagefiles == null) return;
  //   const imageRef = ref(storage, `images/${imagefiles.name + v4()}`);
  //   uploadBytes(imageRef, imagefiles).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   listAll(imagesListRef).then((listResults) => {
  //     const promises = listResults.items.map((item) => {
  //       return item.delete();
  //     });
  //     Promise.all(promises);
  //   });
  // }, []);

  // const getRatingValue = (enteredRating) => {
  //   ReviewData = {
  //     ...ReviewData,
  //     rating: enteredRating,
  //   };
  //   console.log(ReviewData);
  // };
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
              ref={titleInputRef}
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
              ref={placeInputRef}
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
              ref={descriptionInputRef}
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
              ref={dateInputRef}
            />
          </div>
          <div className="m-5">
            <label htmlFor="upload" className="block mb-3 text-lg">
              Upload Images
            </label>
            <input
              type="file"
              // required
              multiple
              id="upload"
              name="Images"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
              ref={imageInputRef}
              // onChange={fileSelectHandler}
            />
            {/* <button
              type="button"
              onClick={fileUploadHandler}
              className="mt-3 bg-violet-50 text-violet-700 font-semibold text-md rounded-full py-2 px-4 hover:bg-violet-100"
            >
              Upload
            </button> */}
          </div>
          {/* {imageUrls.map((url) => {
            return <img src={url} className="w-1/5  m-10" />;
          })} */}
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
                ref={hotelNameInputRef}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="costofstay" className="block mb-3 text-lg">
                Cost of stay per night
              </label>
              <input
                type="text"
                id="costofstay"
                name="Hotel_cost"
                placeholder="Rs"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                ref={hotelCostInputRef}
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
                ref={hotelRefInputRef}
              />
            </div>
            {/* <button className="bg-[#FFA902] hover:bg-[#fac251] text-black p-5 rounded-lg text-lg font-semibold right-1">
              Add Hotel
            </button> */}
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
                ref={transportNameInputRef}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="reftransport" className="block mb-3 text-lg">
                Reference number of transportation service (if any)
              </label>
              <input
                type="number"
                id="reftransport"
                name="Transport_refno"
                placeholder="+92"
                className="w-[70%] border border-gray-400 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                ref={transportRefInputRef}
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
                ref={transportCostInputRef}
              />
            </div>
            {/* <button className=" bg-[#FFA902] hover:bg-[#fac251] text-black p-5 rounded-lg text-lg font-semibold mb-5">
              Add Transportation
            </button> */}
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
