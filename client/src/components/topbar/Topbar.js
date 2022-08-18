import React, { useState, useEffect, useRef } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { getLoginInfo } from "../../utils/LoginInfo.ts";
import { ChevronDownIcon } from "@heroicons/react/solid";

function Topbar(props) {
  const user = getLoginInfo();
  const role = user?.role;
  const username = user?.username;
  const [toggleMenu, setToggleMenu] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div
      className={`z-10 ${props.className ? "noBackgroundnavigation" : "nav"}`}
    >
      <div className="topLeft">
        <span className="yellotxt">Travel </span>
        <span>Stories</span>
      </div>
      <div className="topCenter">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/write-review">
            <li>Write your Review</li>
          </Link>

          <Link to="/my-reviews">
            <li>My Reviews</li>
          </Link>
          <Link to="/my-favourite">
            <li>My Favourite Reviews</li>
          </Link>
          <Link to="/users">
            <li style={{ display: role === "ADMIN" ? "" : "none" }}>Users</li>
          </Link>
        </ul>
      </div>
      <div className="topRight" ref={menuRef}>
        <div className="mt-2 mr-5" onClick={() => setToggleMenu(!toggleMenu)}>
          <h3 className="font-Arima text-white text-xl cursor-pointer">
            Welcome
            <span
              className="font-Arima text-white text-xl cursor-pointer"
              style={{ display: role === "ADMIN" ? "" : "none" }}
            >
              &nbsp;Admin
            </span>
            <span className="overflow-hidden cursor-pointer font-Arima text-[#FFA902] text-xl">
              ,&nbsp;{username}
              <ChevronDownIcon className="fill-white w-7 h-7 m-0 inline ml-1" />
            </span>
            <span></span>
          </h3>
        </div>
        <div className={`dropdown-menu ${toggleMenu ? "active" : "inactive"}`}>
          <ul>
            <li className="py-3 px-0 border-t-1 border-gray-400 flex my-2 mx-auto dropdownItem">
              <img
                src={require("../../images/logout.png")}
                alt=""
                className="hover:opacity-100 hover:cursor-pointer max-w-[20px] mr-2 opacity-50 transition-[500ms]"
              ></img>
              <Link
                to="/login"
                className="text-black hover:text-red-600 hover:cursor-pointer max-w-[100px] ml-2 transition-[500ms]"
                // className="bg-[#FFA902] ml-10 text-black text-lg rounded-md p-3 px-5 drop-shadow-xl font-semibold hover:bg-transparent hover:border-2 hover:border-[#FFA902] hover:text-white"
              >
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                  className="font-medium"
                >
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* <button className="bg-[#FFA902] ml-10 text-black text-lg rounded-md p-3 px-5 drop-shadow-xl font-semibold hover:bg-transparent hover:border-2 hover:border-[#FFA902] hover:text-white">
          Sign In
        </button> */}
        {/* <span className="text-[#FFA902] text-lg  p-3  font-poppins">
          {username}
        </span> */}

        {/* <button className="ml-2 text-white text-lg rounded-md p-3 px-5 drop-shadow-xl font-semibold border-2 border-[#FFA902] hover:bg-[#FFA902]  hover:text-black">
          Sign Up
        </button> */}
      </div>
    </div>
  );
}

export default Topbar;
