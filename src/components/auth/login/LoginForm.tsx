"use client";

import PasswordInput from "@/components/shared/PasswordInput";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data structure with TypeScript
type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Login submitted:", data);
    // Replace with your API call
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] flex flex-col gap-y-4"
    >
      {/* Email Input */}
      <Input
        type="email"
        label="Email"
        variant="underlined"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid email address",
          },
        })}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />

      {/* Password Input */}
      <PasswordInput
        label="Password"
        variant="underlined"
        registerOptions={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        register={register}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />

      {/* Submit Button */}
      <Button type="submit" className="bg-white text-black">
        Submit
      </Button>

      {/* Register Link */}
      <p className="text-center">
        New Here? {" "}
        <Link className="hover:cursor-pointer underline duration-200" href="/register">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
