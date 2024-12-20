"use client";
import jwt from "jsonwebtoken";
import InputPassword from "./inputPassword";
import LoginBtn from "./LoginBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@/service/auth-api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (email, password) => {
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.code === 200 || result.code === 201) {
        const token = result.data.token;
        if (token) {
          localStorage.setItem("t", token);
          document.cookie = `t=${token}; path=/`;
          const decoded = jwt.decode(token);
  
          if (decoded.user_type === "Student") {
            router.replace("/"); 
          } else if (decoded.user_type === "Admin" || decoded.user_type === "Teacher") {
            router.replace("/admin");
          }
        } else {
          router.replace("/login");
          toast.error("Authentication token missing!");
        }
      } else if (result.code === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }finally {
      setLoading(false);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await onSubmit(email, password);
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <div>
          <h3 className="font-semibold text-[30px] py-4">
            Welcome to <span className="text-custom-blue">Academy</span>
          </h3>
        </div>
        <label
          htmlFor="email"
          className="text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2 mb-3 rounded-md shadow-sm">
          <input
            type="text"
            name="email"
            id="email"
            required
            className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
            placeholder="john@doe.com"
          />
        </div>
        <InputPassword />
        <div className="my-5">
        <LoginBtn loading={loading} />
        </div>
      </form>
    </>
  );
}
