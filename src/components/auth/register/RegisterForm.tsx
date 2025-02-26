"use client";

import PasswordInput from "@/components/shared/PasswordInput";
import { RegisterFormData } from "@/types/auth.types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data structure with TypeScript

const RegisterForm = () => {
  // Initialize useForm with TypeScript typing and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  // Define the submit handler
  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log("Registration submitted:", data);
    // Replace with your API call, e.g.:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] flex flex-col gap-y-4"
    >
      {/* Username Input */}
      <Input
        type="text"
        label="Username"
        variant="underlined"
        {...register("userName", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
        })}
        isInvalid={!!errors.userName}
        errorMessage={errors.userName?.message}
      />

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

      {/* First Name Input */}
      <Input
        type="text"
        label="First Name"
        variant="underlined"
        {...register("firstName", {
          required: "First Name is required",
          minLength: {
            value: 2,
            message: "First Name must be at least 2 characters",
          },
        })}
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />

      {/* Last Name Input */}
      <Input
        type="text"
        label="Last Name"
        variant="underlined"
        {...register("lastName", {
          required: "Last Name is required",
          minLength: {
            value: 2,
            message: "Last Name must be at least 2 characters",
          },
        })}
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName?.message}
      />

      {/* Submit Button */}
      <Button type="submit" className="bg-white text-black">
        Register
      </Button>

      {/* Login Link */}
      <p className="text-center">
        Already have an account?{" "}
        <Link
          className="hover:cursor-pointer underline duration-200"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;