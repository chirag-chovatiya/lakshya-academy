"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import InputPassword from "../../components/inputPassword";
import LoginBtn from "./LoginBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const onSubmit = async (email, password) => {
    try {
      const result = await signIn("credentials", { email, password, redirect: true });

      if (result.error) {
        handleError(result.error); 
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    switch (error) {
      case "CredentialsSignin":
        toast.error("Invalid credentials!");
        break;
      default:
        toast.error("Something went wrong!");
        break;
    }
  };

  useEffect(() => {
    if (searchParams && searchParams.has("error"))
      handleError(searchParams.get("error"));
  }, [searchParams]);

  return (
    <>
      <ToastContainer />
      <form
        action={async (formData) => {
          try {
            await onSubmit(formData.get("email"), formData.get("password"));
          } catch (error) {
            handleError(error);
          }
        }}
      >
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
          <LoginBtn></LoginBtn>
        </div>
      </form>
    </>
  );
}
