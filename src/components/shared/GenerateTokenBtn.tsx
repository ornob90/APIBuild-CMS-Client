"use client";
import { useAxios } from "@/hooks/useAxios";
import { ApiStatus } from "@/types/globals.types";
import { customRevalidateTag } from "@/utils/globals.utils";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

const GenerateTokenBtn = () => {
  // package or custom hooks
  const axiosInstance = useAxios();

  // states
  const [tokenCreationStatus, setTokenCreationStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  );

  const handleGenerateToken = async () => {
    try {
      setTokenCreationStatus(ApiStatus.PENDING);
      await axiosInstance.post("/tokens");

      toast.success("Token Created Successfully!");
      customRevalidateTag("tokens_by_user_page")
      setTokenCreationStatus(ApiStatus.FINISH);
    } catch {
      setTokenCreationStatus(ApiStatus.ERROR);
      toast.error("Failed to create token");
    }
  };

  return (
    <Button
      isLoading={tokenCreationStatus === ApiStatus.PENDING}
      onPress={handleGenerateToken}
      className=" bg-white text-black"
    >
      Generate Token
    </Button>
  );
};

export default GenerateTokenBtn;
