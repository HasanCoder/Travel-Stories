import React, { useRef } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";

export default function Login(props) {
  let navigate = useNavigate();
  let emailRef = useRef();
  let passwordRef = useRef();

  const LoginApp = async () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401)
        toast.warn(error.response.data.message);
    }
  };
  return (
    <>
      <div className="Auth-form-container">
        <div className="font-Arima text-4xl mb-10">
          <span className="text-[#FFA902]">Travel</span>
          <span>&nbsp;Stories</span>
        </div>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title font-poppins font-medium">
              Sign In
            </h3>
            {/* <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div> */}
            <div>
              <label className="block font-poppins text-xs mb-1">Email</label>
              <input
                ref={emailRef}
                type="text"
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902]"
              />
            </div>
            <div className="mt-4">
              <label className="block font-poppins text-xs mb-1">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902]"
              />
            </div>
            <div className="mt-5">
              <button
                onClick={LoginApp}
                type="button"
                className="bg-[#FFA902] p-3 px-15 w-full self-center items-center rounded-full hover:bg-[#fac251]"
              >
                <p className="font-poppins font-medium text-md">Log in</p>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8">
          <p>New to our community</p>
        </div>
        <div className="mt-8">
          <Link to="/signup">
            <button className="bg-white border-2 border-black hover:bg-black  w-full self-center items-center rounded-full ">
              <p className="font-poppins font-medium text-md px-24 p-3 hover:text-white">
                Create an account
              </p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
