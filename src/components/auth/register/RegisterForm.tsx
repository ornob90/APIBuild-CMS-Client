"use client";

import PasswordInput from "@/components/shared/PasswordInput";
import { useAxios } from "@/hooks/useAxios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ApiStatus } from "@/types/globals.types";
import { useRouter } from "next/navigation";

// Define the form data structure matching the backend DTO
interface RegisterFormData {
  userName: string;
  displayName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  // custom or package hooks
  const axiosInstance = useAxios({
    isPrivate: false,
  });
  
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      userName: "",
      displayName: "",
      email: "",
      password: "",
    },
  });

  // states
  const [registerStatus, setRegisterStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  );

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setRegisterStatus(ApiStatus.PENDING);
    try {
      const response = await axiosInstance.post("/auth/register", data);
      console.log("Registration successful:", response.data);
      setRegisterStatus(ApiStatus.FINISH);
      router.push("/login");
      // Optionally redirect or show a success message
    } catch (error) {
      console.error("Registration failed:", error);
      setRegisterStatus(ApiStatus.ERROR);
      // Handle error (e.g., show error message to user)
    }
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
          required: "User Name is required",
          validate: (value) =>
            typeof value === "string" || "User Name needs to be a string",
        })}
        isInvalid={!!errors.userName}
        errorMessage={errors.userName?.message}
      />

      {/* Display Name Input */}
      <Input
        type="text"
        label="Display Name"
        variant="underlined"
        {...register("displayName", {
          required: "Display Name is required",
          validate: (value) =>
            typeof value === "string" || "Display Name needs to be a string",
        })}
        isInvalid={!!errors.displayName}
        errorMessage={errors.displayName?.message}
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
        register={register}
        registerOptions={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password needs to be at least 6 characters long",
          },
        }}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-white text-black"
        isLoading={registerStatus === ApiStatus.PENDING}
        isDisabled={registerStatus === ApiStatus.PENDING}
      >
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
