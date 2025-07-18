"use client";
import { Button } from "@heroui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export interface SubmitBtnProps {
  text: string;
  loadingText: string;
  className?: string;
  size?: "sm" | "md" | "lg" | undefined;
  loading?: boolean;
}

const SubmitBtn = ({
  text,
  loadingText,
  className,
  loading,
  size = "md",
}: SubmitBtnProps) => {
  const { pending, data } = useFormStatus();
  console.log("FORM DATA: ", data);

  return (
    <Button
      size={size}
      isLoading={pending || loading}
      type="submit"
      className={`bg-white text-black ${className}`}
    >
      {pending ? loadingText : text}
    </Button>
  );
};

export default SubmitBtn;
