import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password }).unwrap();
      dispatch(login(response.data));
      if (email.trim() === "admin@gmail.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error in login", error);
    }
  };
  const goToRegisterPage = () => {
    navigate("/register");
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-[30rem] mx-auto flex flex-col p-[2rem] items-center  rounded-xl mt-[2rem] h-[24rem] border-[1px] border-gray-500"
    >
      <p className="text-2xl font-bold">Login</p>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-blue-700 underline"
          onClick={goToRegisterPage}
        >
          Do you have an account? Register
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
