"use client";

import React, { useState } from "react";
import backgroundImg from "../assets/background2.webp";
import { useRouter } from "next/navigation";
import { imageSrc } from "@/lib/image";

function Login() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email !== "booklinda@linda-x.com" || password !== "linda-x1") {
      setShowPopup(true);
      return;
    }
    setShowPopup(false);
    router.push("/uploads");
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${imageSrc(backgroundImg)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-8 z-10 relative">
        <h2 className="text-[#D7FF00] text-3xl">Admin Login</h2>
      </div>
      {showPopup && (
        <button
          onClick={() => window.location.reload(true)}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded z-20 relative"
        >
          Invalid email or password.
        </button>
      )}
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white p-6 rounded shadow-md w-96 flex flex-col space-y-4 z-10 relative"
      >
        <div className="mb-5">
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            required
            className="bg-gray-100 w-full h-9"
            autoFocus
          />
        </div>
        <div className="mb-5">
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            required
            className="bg-gray-100 w-full h-9"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D7FF00] text-black font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
