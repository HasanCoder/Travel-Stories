import React, { useRef } from "react";
import "./SignUp.css";

import { Link, useNavigate } from "react-router-dom";
import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../api/ApiConstants.ts";
import { toast } from "react-toastify";

export default function SignUp(props) {
  let navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const register = async () => {
    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      toast.info("Password does not match");
      return;
    }

    const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(response.data);
    toast.success("Account created successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
        <div className="font-Arima text-4xl mb-10">
          <span className="text-[#FFA902]">Travel</span>
          <span>&nbsp;Stories</span>
        </div>
        <form className="w-1/3">
          <div className="">
            <h3 className="font-poppins font-medium text-2xl text-center">
              Create an account
            </h3>
            <div className="text-center font-poppins font-normal text-sm">
              Already have an account?{" "}
              <Link to="/login">
                <span className="underline cursor-pointer">Log in</span>
              </Link>
            </div>
            <div className="mt-10">
              <label className="block font-poppins text-xs mb-1">
                What should we call you?
              </label>
              <input
                type="text"
                ref={usernameRef}
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902] placeholder:text-sm placeholder:pl-4"
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-10">
              <label className="block font-poppins text-xs mb-1">
                What's your email?
              </label>
              <input
                ref={emailRef}
                type="email"
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902] placeholder:text-sm placeholder:pl-4"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mt-10">
              <label className="block font-poppins text-xs mb-1">
                Create a password
              </label>
              <input
                ref={passwordRef}
                type="password"
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902] placeholder:text-sm placeholder:pl-4"
                placeholder="Enter your password"
              />
            </div>
            <div className="mt-10">
              <label className="block font-poppins text-xs mb-1">
                Confirm password
              </label>
              <input
                ref={confirmpasswordRef}
                type="password"
                className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-[#FFA902] placeholder:text-sm placeholder:pl-4"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mt-14">
              <button
                onClick={register}
                type="button"
                className="bg-[#FFA902] p-3 px-15 w-full self-center items-center rounded-full hover:bg-[#fac251]"
              >
                <p className="font-poppins font-medium text-md">
                  Create an account
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
