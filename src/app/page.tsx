"use client";

import React, { useState } from "react";
import { LucideEyeOff, LucideEye } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex bg-black h-dvh relative">
      <div className="hidden md:flex md:w-full items-center justify-center">
        <Image
          src="/assets/images/bg.jpeg"
          alt="background"
          width={1920}
          height={1080}
          className="md:w-7/12 md:absolute md:left-0 h-full object-cover lg:object-left"
        />
      </div>
      <div className="w-full h-full md:w-6/12 md:absolute md:right-0 flex shadow-md items-center justify-center">
        <form className="bg-white p-8 md:rounded-l-3xl shadow-md w-full h-full flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Image
              src="/assets/images/rejected.png"
              alt="Secure Contact Logo"
              width={40}
              height={40}
            />
            <h2 className="text-3xl font-bold">Secure Contact</h2>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="E-mail"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center max-w-10 max-h-10"
              >
                {showPassword ? (
                  <LucideEyeOff className="size-5 text-gray-400" />
                ) : (
                  <LucideEye className="size-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer w-full"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
