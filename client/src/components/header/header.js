import React from "react";
import "./header.css";
import { SearchIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="">
      <hr className="hr" />
      <div className="m-10 mx-[35%]  h-12 flex flex-wrap bg-white justify-self-center content-center  rounded-full ">
        <SearchIcon className="w-5 h-5 mx-5 " />
        <input
          placeholder="Search your destination"
          type="text"
          className="w-70 px-2 pr-20 border-0 border-white focus:outline-none"
          onChange={(e) => props.setSearch(e.target.value)}
        ></input>
      </div>

      <div className="text-center pt-20 justify-center items-center">
        <p className="text-white text-7xl font-bold font-poppins py-10 pt-10">
          Where will you go next?
        </p>
        <p className="font-poppins text-white text-base mx-[25%]  text-center justify-center self-center items-center pt-10">
          Welcome to Travel Stories. Travel Stories help you discover new
          destinations and share your travel experiences. Here you can tell
          others your travel story, browse travel guides and more. This platform
          help people to plan their trips and tours. Travel Stories helps you to
          decide where to go, where to stay, what to do at the places you
          choose, how much expense you need, etc,.
        </p>
        <Link to="/write-review">
          <p className="text-[#FFA902] font-poppins font-bold text-3xl mt-[70px] pb-[249px] pt-10">
            Let's Go.....
          </p>
        </Link>
      </div>
    </div>
  );
}
