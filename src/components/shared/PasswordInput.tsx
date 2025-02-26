"use client";
import { PasswordProps } from "@/types/htmls.types";
import { Input } from "@heroui/input";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  className,
  defaultValue,
  label,
  variant,
  registerOptions,
  isInvalid,
  errorMessage,
  register,
  onFocus,
  onBlur,
}: PasswordProps) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Input
      type={isPassword ? "password" : "text"}
      className={` ${className}`}
      label={label}
      variant={variant}
      defaultValue={defaultValue}
      {...register("password", registerOptions)} 
      onFocus={onFocus}
      onBlur={onBlur}
      endContent={
        isPassword ? (
          <FaRegEyeSlash onClick={() => setIsPassword(!isPassword)} />
        ) : (
          <FaRegEye onClick={() => setIsPassword(!isPassword)} />
        )
      }
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    />
  );
};

export default PasswordInput;
