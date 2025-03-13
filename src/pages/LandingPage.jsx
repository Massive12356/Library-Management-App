import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Logo1 from "../assets/Logo1.png";
import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Handle redirection after login

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Basic login check (replace with backend authentication)
    if (username === "" && password === "") {
      navigate("/books"); // ✅ Redirect to BooksList
      toast.success("Login successful");
    } else {
      toast.error('invalid Login Credentials'); // ✅ Show error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600 ">
      <div className="flex flex-col p-5 md:p-0 md:flex-row  w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full rounded-lg md:rounded-none md:w-[50%] bg-gray-800 text-white flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4">
              <img src={Logo} alt="Logo" className="" />
            </div>
            <h1 className="text-3xl font-semibold">EDMOYCE</h1>
            <p className="text-sm mt-1">LIBRARY</p>
            <p className="mt-4 text-center">
              "Our premier digital library for managing book resources"
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-[400px] md:w-[50%] bg-white p-10 flex flex-col justify-center rounded-l-4xl">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img src={Logo1} alt="Logo" className="rounded-full " />
            </div>
            <h2 className="text-2xl text-gray-800 font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">
              Please enter your credentials to login
            </p>
          </div>

          {/* ✅ Login Form */}
          <form className="mt-6" onSubmit={handleLogin}>
            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // ✅ Handle input state
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // ✅ Handle input state
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="text-gray-800 text-sm mt-3 hover:text-blue-700 underline cursor-pointer"
              >
                Forgot Password ?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-black"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
