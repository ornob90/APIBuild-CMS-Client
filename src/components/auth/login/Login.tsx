import React from "react";
import LoginForm from "./LoginForm";
import { getToken } from "@/libs/auth.libs";
import { redirect } from "next/navigation";

const Login = async () => {
  const token = await getToken();

  console.log('token', token?.length)
  if (token) {
    redirect("/");
  }
  return (
    <section className="min-h-screen flex justify-center items-center  gap-x-4">
      <section className=" bg-red-500 rounded-2xl p-4 flex flex-col justify-center items-center gap-y-4    dark:bg-darkGray w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]  xl:w-[40%] max-w-[450px] min-h-[350px]">
        <h1 className="">API Builder</h1>
        <LoginForm />
      </section>
    </section>
  );
};

export default Login;
