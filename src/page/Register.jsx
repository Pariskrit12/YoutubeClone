import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../api/userApi";
const FormItem = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={type === "file" ? undefined : value}
      {...(type === "file" ? { accept: "image/*" } : {})}
    />
  </div>
);

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate=useNavigate();
const[registration,{isLoading}]=useRegistrationMutation()
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);
    try {
      registration(formData);
      navigate('/login');
    } catch (error) {
      console.log("Failed in registring user", error);
    }
  };
 
  return (
    <div className=" w-full mt-[3rem]">
      <form
        onSubmit={handleOnSubmit}
        className="w-[50rem] mx-auto flex justify-between  border-[1px] border-gray-400 h-[28rem] rounded-2xl py-[1rem] px-[1rem]"
      >
        <div className="flex flex-col items-center">
          <FormItem
            label="Full Name"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            type="text"
            placeholder="Your full name"
          />
          <FormItem
            label="User name"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            type="text"
            placeholder="Your username"
          />
          <FormItem
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="text"
            placeholder="name@gmail.com"
          />
          <FormItem
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Your Password"
          />
        </div>
        <div>
          <FormItem
            label="Avatar"
            id="password"
            onChange={(e) => setAvatar(e.target.files?.[0])}
            required
            type="file"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              {isLoading ?"Loading...":"Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
