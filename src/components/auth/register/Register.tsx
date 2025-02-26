import React from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="min-h-screen  w-full flex justify-center   py-5  gap-x-4">
      <section className=" rounded-2xl p-4 flex flex-col justify-center items-center gap-y-4    dark:bg-darkGray w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]  xl:w-[40%]  py-8">
        <h1 className="">API Builder</h1>
        <RegisterForm />
      </section>
    </section>
  );
};

export default Register;
