import React from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="min-h-screen  w-full flex justify-center items-center   py-5  gap-x-4">
      <section className=" rounded-2xl h-fit p-4 flex flex-col justify-center items-center gap-y-4    dark:bg-lightGray w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]  xl:w-[40%]  py-12">
        <h1 className="">API Builder</h1>
        <RegisterForm />
      </section>
    </section>
  );
};

export default Register;
